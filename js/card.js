'use strict';
// Модуль card.js
(function () {
  var similarCardTemplate = document.querySelector('#card')
    .content;
  // Фунция отрисовки одной карточки
  var renderСard = function (card) {

    var cardElement = similarCardTemplate.cloneNode(true);
    var title = cardElement.querySelector('.popup__title');
    if (card.offer.title) {
      title.textContent = card.offer.title;
    } else {
      title.classList.add('visually-hidden');
    }

    var address = cardElement.querySelector('.popup__text--address');
    if (card.offer.address) {
      address.textContent = card.offer.address;
    } else {
      address.classList.add('visually-hidden');
    }

    var price = cardElement.querySelector('.popup__text--price');
    if (card.offer.price) {
      price.textContent = card.offer.price + '₽/ночь';
    } else {
      price.classList.add('visually-hidden');
    }

    var type = cardElement.querySelector('.popup__type');
    if (card.offer.type) {
      type.textContent = defineType(card.offer.type);
    } else {
      type.classList.add('visually-hidden');
    }

    var colRoom = cardElement.querySelector('.popup__text--capacity');
    if (card.offer.rooms && card.offer.guests) {
      colRoom.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    } else {
      colRoom.classList.add('visually-hidden');
    }

    var time = cardElement.querySelector('.popup__text--time');
    if (card.offer.checkin && card.offer.checkout) {
      time.textContent = ' Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    } else {
      time.classList.add('visually-hidden');
    }

    // Отображение доступрых фичей
    var features = cardElement.querySelectorAll('.popup__feature');
    if (features.length) {
      features.forEach(function (el) {
        el.classList.add('visually-hidden');
      });

      card.offer.features.forEach(function (el) {
        var feature = cardElement.querySelector('.popup__feature--' + el);
        feature.classList.remove('visually-hidden');
      });
    } else {
      features.classList.add('visually-hidden');
    }

    var description = cardElement.querySelector('.popup__description');
    if (card.offer.description) {
      description.textContent = card.offer.description;
    } else {
      description.classList.add('visually-hidden');
    }

    // Отображение фото
    var photos = cardElement.querySelector('.popup__photos');
    if (card.offer.photos.length) {
      card.offer.photos.forEach(function (el) {
        var photo = photos.children[0].cloneNode(true);
        photo.src = el;
        photos.appendChild(photo);
      });
      photos.children[0].remove();
    } else {
      photos.classList.add('visually-hidden');
    }

    var avatar = cardElement.querySelector('.popup__avatar');
    avatar.setAttribute('src', card.author.avatar);
    return cardElement;
  };

  // Функция определения типа арендуемого помещения
  var defineType = function (key) {
    var curentType;
    switch (key) {
      case 'flat':
        curentType = 'Квартира';
        break;

      case 'bungalo':
        curentType = 'Бунгало';
        break;

      case 'house':
        curentType = 'Дом';
        break;

      case 'palace':
        curentType = 'Дворец';
        break;

      default:
        break;
    }
    return curentType;
  };

  window.card = {
    renderСard: renderСard
  };

})();
