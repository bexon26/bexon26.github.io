'use strict';

(function () {
  // form.js
  var HALF_PIN_WIDTH = 32;
  var HALF_PIN_HEIGHT = 32;
  var adForm = document.querySelector('.ad-form');
  var fieldInputs = document.querySelectorAll('fieldset');
  var adFormReset = document.querySelector('.ad-form__reset');
  var mapFilters = document.querySelectorAll('.map__filter');
  var mapFeatureForm = document.querySelector('.map__features');
  var mapFeatures = mapFeatureForm.querySelectorAll('.map__checkbox');
  var mapPinMain = document.querySelector('.map__pin--main');
  var priceInput = document.getElementById('price');
  var topMain = Number(mapPinMain.style.top.slice(0, -2));
  var leftMain = Number(mapPinMain.style.left.slice(0, -2));
  var mainPinStartPosition = (leftMain + HALF_PIN_WIDTH) + ', ' + (topMain + HALF_PIN_HEIGHT);
  adForm.querySelector('input[name="address"]').value = mainPinStartPosition;

  var fieldPageSwitchOff = function () {
    fieldInputs.forEach(function (element) {
      element.setAttribute('disabled', false);
    });
    mapFilters.forEach(function (element) {
      element.setAttribute('disabled', false);
    });

  };
  fieldPageSwitchOff();

  var removeFormDisabled = function () {
    document.querySelector('.map').classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    adForm.querySelector('input[name="address"]').value = mainPinStartPosition;
    fieldInputs.forEach(function (element) {
      element.removeAttribute('disabled');
    });
    mapFilters.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (adForm.getAttribute('class') === 'ad-form ad-form--disabled') {
      if (evt.button === 0) {
        removeFormDisabled();
        window.pin.viewPin();
      }
    }


  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (adForm.getAttribute('class') === 'ad-form ad-form--disabled') {
      if (evt.key === 'Enter') {
        removeFormDisabled();
      }
    }

  });

  // Функция добавления слушателя на новый элемент
  function addModEvent() {
    var map = document.querySelector('.map');
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        closeCard();
      }
    });
    var closePopup = map.querySelector('.popup__close');
    closePopup.addEventListener('click', closeCard);
  }

  // Функция закрытия окна карточки
  var closeCard = function () {
    var pinListener = document.querySelector('.map__card');
    if (pinListener) {
      document.querySelector('.map').removeChild(pinListener);
    }
  };


  var filterChangeHandler = function (id) {
    // удалалени окна карточки
    closeCard();
    // показ новой карточки
    window.viewCard(id);
    addModEvent();
  };


  var mapPin = document.querySelector('.map__pins');

  var removeActionPin = function () {
    var mapPins = mapPin.querySelectorAll('.map__pin--active');
    mapPins.forEach(function (element) {
      element.classList.remove('map__pin--active');
    });
  };

  var mapPinActive = function (evt) {
    if (evt.target.matches('img')) {
      removeActionPin();
      evt.target.parentElement.classList.add('map__pin--active');
      if (evt.target.parentElement.getAttribute('id')) {
        filterChangeHandler(evt.target.parentElement.getAttribute('id'));
      }
    }
    if (evt.target.matches('button')) {
      removeActionPin();
      evt.target.classList.add('map__pin--active');
      if (evt.target.id) {
        filterChangeHandler(evt.target.id);
      }
    }
  };

  // Слушатель события на пине
  mapPin.addEventListener('click', function (evt) {
    mapPinActive(evt);
  });

  var defaultReset = function (evt) {
    evt.preventDefault();
    document.querySelector('.map').classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    fieldPageSwitchOff();
    adForm.reset();
    window.avatar.imageReset();
    window.filter.removePins();
    mapFeatures.forEach(function (element) {
      element.checked = false;
    });
    mapPinMain.setAttribute('style', 'left: 570px; top: 375px;');
    adForm.querySelector('input[name="address"]').value = mainPinStartPosition;
    closeCard();
    priceInput.setAttribute('placeholder', '5000');
  };


  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), function () {
    });
    defaultReset(evt);
  });

  adFormReset.addEventListener('click', function (evt) {
    defaultReset(evt);
  });

  window.form = {
    adForm: adForm,
    removeFormDisabled: removeFormDisabled,
    closeCard: closeCard
  };
})();
