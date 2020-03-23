'use strict';
// Модуль backend.js
(function () {
  var TIMEOUT = 10000;
  var CODE_SUCCESS = 200;
  var ERROR_MESSAGE_LEFT = 0;
  var ERROR_MESSAGE_TOP = 0;

  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT; // 10s
    xhr.open('GET', URL);
    xhr.send();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = ERROR_MESSAGE_LEFT;
    node.style.right = ERROR_MESSAGE_TOP;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var save = function (data, onload) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onload(xhr.response);
      if (xhr.status === CODE_SUCCESS) {
        window.error.viewSucces();
      } else {
        window.error.viewError();
      }
    });
    data.set('images', window.filesQueue);
    xhr.open('POST', URL);
    xhr.send(data);
  };


  window.backend = {
    load: load,
    save: save,
    errorHandler: errorHandler
  };
})();


