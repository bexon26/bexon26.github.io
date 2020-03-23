'use strict';
// validation.js
(function () {

  // Валидация
  var formRoom = document.getElementById('room_number');
  var formGuest = document.getElementById('capacity');
  var formTitle = document.getElementById('title');
  var formType = document.getElementById('type');
  var formPrice = document.getElementById('price');
  var formAddress = document.getElementById('address');
  var formTimeIn = document.getElementById('timein');
  var formTimeOut = document.getElementById('timeout');

  formAddress.setAttribute('readonly', 'readonly');
  formTitle.setAttribute('min', 2);
  formTitle.setAttribute('max', 10);

  // Валидация комнат
  var validateRoom = function () {
    if (formRoom.value === '100' && formGuest.value === '0') {
      formRoom.style.border = 'none';
      formGuest.style.border = 'none';
      formRoom.setCustomValidity('');
    } else if ((formRoom.value >= formGuest.value) && formGuest.value !== '0' && formRoom.value !== '100') {
      formRoom.style.border = 'none';
      formGuest.style.border = 'none';
      formRoom.setCustomValidity('');
    } else {
      formRoom.style.border = '2px solid red';
      formGuest.style.border = '2px solid red';
      formRoom.setCustomValidity('Выберите правильное количество комнат');
    }
  };

  formRoom.addEventListener('change', validateRoom);
  formGuest.addEventListener('change', validateRoom);

  // Валидация адреса, цены
  window.form.adForm.addEventListener('click', function () {
    if (formAddress.value === '') {
      formAddress.setCustomValidity('Заполните поле');
    } else {
      formAddress.setCustomValidity('');
    }
    if (formTitle.value.length < 30 || formTitle.value.length > 100) {
      formTitle.setCustomValidity('Заполните поле в диапазоне от 30 до 100 символов');
    } else {
      formTitle.setCustomValidity('');
    }
    if (formPrice.value === '') {
      formPrice.setCustomValidity('Заполните поле в диапазоне от 0 до 1000000 символов');
    }
    validateRoom();
  });

  // Валидация типа и цены
  var validateType = function () {
    if (parseInt(formPrice.value, 10) > 1000000) {
      formPrice.setCustomValidity('Максимальная цена выше 1 000 000');
    } else if (formPrice.value === '') {
      formPrice.setCustomValidity('Заполните поле');
    }

    switch (formType.value) {
      case 'bungalo':
        if (parseInt(formPrice.value, 10) < 0) {
          formPrice.setCustomValidity('Введите значение больше либо равное 0');
          formPrice.setAttribute('placeholder', formPrice.value);
        } else {
          formPrice.setCustomValidity('');
          formPrice.setAttribute('placeholder', formPrice.value);
        }
        break;
      case 'flat':
        if (parseInt(formPrice.value, 10) < 1000) {
          formPrice.setCustomValidity('Введите значение больше либо равное 1000');
          formPrice.setAttribute('placeholder', formPrice.value);
        } else {
          formPrice.setCustomValidity('');
          formPrice.setAttribute('placeholder', formPrice.value);
        }
        break;
      case 'house':
        if (parseInt(formPrice.value, 10) < 5000) {
          formPrice.setCustomValidity('Введите значение больше либо равное 5000');
          formPrice.setAttribute('placeholder', formPrice.value);
        } else {
          formPrice.setCustomValidity('');
          formPrice.setAttribute('placeholder', formPrice.value);
        }
        break;
      case 'palace':
        if (parseInt(formPrice.value, 10) < 10000) {
          formPrice.setCustomValidity('Введите значение больше либо равное 10000');
          formPrice.setAttribute('placeholder', formPrice.value);
        } else {
          formPrice.setCustomValidity('');
          formPrice.setAttribute('placeholder', formPrice.value);
        }
        break;
    }
  };

  formType.addEventListener('change', validateType);
  formPrice.addEventListener('change', validateType);

  var validateTimeIn = function () {
    switch (formTimeIn.value) {
      case '12:00': formTimeOut.value = '12:00';
        break;
      case '13:00': formTimeOut.value = '13:00';
        break;
      case '14:00': formTimeOut.value = '14:00';
        break;
    }
  };
  var validateTimeOut = function () {
    switch (formTimeOut.value) {
      case '12:00': formTimeIn.value = '12:00';
        break;
      case '13:00': formTimeIn.value = '13:00';
        break;
      case '14:00': formTimeIn.value = '14:00';
        break;
    }
  };

  formTimeIn.addEventListener('change', validateTimeIn);
  formTimeOut.addEventListener('change', validateTimeOut);


  window.form.adForm.setAttribute('action', 'https://js.dump.academy/keksobooking');
})();
