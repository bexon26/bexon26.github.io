'use strict';
// move.js
(function () {
  var DOWN = 630;
  var TOP = 130;
  var HALF_PIN_WIDTH = 32;
  var PIN_HEIGHT = 82;

  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var formAddress = document.getElementById('address');
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,

        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinLeftAsolute;

      if ((pinMain.offsetTop - shift.y + PIN_HEIGHT) > DOWN) {
        pinMain.style.top = DOWN - PIN_HEIGHT + 'px';
      } else {
        pinMain.style.top = (pinMain.offsetTop - shift.y + PIN_HEIGHT) < TOP ? TOP - PIN_HEIGHT + 'px' : (pinMain.offsetTop - shift.y) + 'px';
      }

      if ((pinMain.offsetLeft + HALF_PIN_WIDTH - shift.x) >= map.offsetWidth) {
        pinLeftAsolute = (map.offsetWidth - HALF_PIN_WIDTH);
        pinMain.style.left = pinLeftAsolute + 'px';

      } else if ((pinMain.offsetLeft - shift.x) < -HALF_PIN_WIDTH) {
        pinMain.style.left = -HALF_PIN_WIDTH + 'px';
        pinLeftAsolute = -HALF_PIN_WIDTH;
      } else {
        pinLeftAsolute = pinMain.offsetLeft - shift.x;
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }
      formAddress.value = (pinLeftAsolute + HALF_PIN_WIDTH) + ', ' + (pinMain.offsetTop - shift.y + PIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pinMain.removeEventListener('click', onClickPreventDefault);
        };
        pinMain.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


})();


