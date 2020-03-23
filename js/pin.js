'use strict';
// модуль pin.js

(function () {
  var MAX_PIN_MAP = 5;
  var HALF_PIN_WIDTH = 25;
  var PIN_HEIGHT = 70;
  var index = 0;
  // Находим блок куда будем вставлять пины
  var similarListElement = document.querySelector('.map__pins');
  // Находим блок куда будем вставлять блок с информацией
  var similarCardListElement = document.querySelector('.map');
  var similarNoticeTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  // Загрузка данных
  var notices = [];
  window.backend.load(function (data) {
    notices = data;
    notices.forEach(function (element) {
      element.id = index;
      index++;
    });
  }, window.backend.errorHandler);

  // Фунция отрисовки одного объявления
  var renderNotice = function (notice) {
    var noticeElement = similarNoticeTemplate.cloneNode(true);
    noticeElement.style = 'left:' + (notice.location.x - HALF_PIN_WIDTH) + 'px; ' + 'top:' + (notice.location.y - PIN_HEIGHT) + 'px;';
    noticeElement.setAttribute('id', notice.id);
    var imgNotice = noticeElement.firstChild;
    imgNotice.src = notice.author.avatar;
    imgNotice.alt = notice.offer.title;
    noticeElement.setAttribute('tabindex', 0);
    return noticeElement;
  };

  // отрисовка пинов
  var viewPin = function (noticeArrays) {
    var fragment = document.createDocumentFragment();
    noticeArrays = noticeArrays === undefined ?
      notices.filter(function (it) {
        return it.offer;
      }) :
      noticeArrays.filter(function (it) {
        return it.offer;
      });

    for (var n = 0; n < noticeArrays.length && n < MAX_PIN_MAP; n++) {
      fragment.appendChild(renderNotice(noticeArrays[n]));
    }
    similarListElement.appendChild(fragment);
  };

  // Отрисовка карточек
  window.viewCard = function (id) {
    var fragmentCard = document.createDocumentFragment();
    fragmentCard.appendChild(window.card.renderСard(notices[id]));
    var filtersContainer = similarCardListElement.querySelector('.map__filters-container');
    filtersContainer.before(fragmentCard);
  };

  var filterMap = function () {
    window.debounce(window.filter.updatePins(notices));
  };

  window.pin = {
    viewPin: viewPin,
    filterMap: function () {
      return window.debounce(filterMap);
    },
  };

})();
