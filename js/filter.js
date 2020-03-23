'use strict';

(function () {

  var mapType = document.getElementById('housing-type');
  var mapPrice = document.getElementById('housing-price');
  var mapRooms = document.getElementById('housing-rooms');
  var mapGuests = document.getElementById('housing-guests');
  var mapFeatureForm = document.querySelector('.map__features');

  var typeHouse = 'any';
  var typePrice = 'any';
  var typeRooms = 'any';
  var typeGuest = 'any';
  var dataFilterTipes = [];

  dataFilterTipes = {type: 'any',
    price: 'any',
    room: 'any',
    guest: 'any',
    features: []};

  var removePins = function () {
    var mapPin = document.querySelector('.map__pins');
    var mapPins = mapPin.querySelectorAll('.map__pin');
    var mapPinMain = document.querySelector('.map__pin--main');
    for (var n = 0; n < mapPins.length; n++) {
      mapPin.removeChild(mapPins[n]);
    }
    mapPin.appendChild(mapPinMain);
  };

  var updatePins = function (notices) {
    window.form.closeCard();

    removePins();
    var sameTypeHouses = notices.filter(function (it) {
      typeHouse = dataFilterTipes.type === 'any' ? typeHouse = it.offer.type : dataFilterTipes.type;
      return it.offer.type === typeHouse;
    });

    var samePriceHouses = sameTypeHouses.filter(function (it) {
      switch (dataFilterTipes.price) {
        case 'any':
          typePrice = it.offer.price;
          break;
        case 'middle':
          return it.offer.price > 10000 && it.offer.price < 50000;
        case 'low':
          return it.offer.price < 10000;
        case 'high':
          return it.offer.price > 50000;
      }
      return it.offer.price === typePrice;
    });

    var sameRoomsHouses = samePriceHouses.filter(function (it) {
      typeRooms = dataFilterTipes.room === 'any' ? typeRooms = it.offer.rooms : typeRooms = dataFilterTipes.room;
      return it.offer.rooms === +typeRooms;
    });

    var sameGuestHouses = sameRoomsHouses.filter(function (it) {
      typeRooms = dataFilterTipes.guest === 'any' ? typeGuest = it.offer.guests : typeGuest = dataFilterTipes.guest;
      return it.offer.guests === +typeGuest;
    });

    var sameFilterHouses = sameGuestHouses.filter(function (it) {
      var countСoincidence = 0;
      var countFeature = 0;

      dataFilterTipes.features.forEach(function (el) {
        if ((el !== '') && (el !== undefined)) {
          countFeature += 1;
          it.offer.features.forEach(function (elem) {
            if (el === elem) {
              countСoincidence += 1;
            }
          });
        }
      });

      if (countFeature === countСoincidence) {
        return true;
      }
      return false;
    });
    window.pin.viewPin(sameFilterHouses);
  };

  mapType.addEventListener('change', function () {
    dataFilterTipes.type = mapType.value;
    window.pin.filterMap();
  });
  mapPrice.addEventListener('change', function () {
    switch (mapPrice.value) {
      case 'any':
        dataFilterTipes.price = 'any';
        break;
      case 'middle':
        dataFilterTipes.price = 'middle';
        break;
      case 'low':
        dataFilterTipes.price = 'low';
        break;
      case 'high':
        dataFilterTipes.price = 'high';
        break;
    }
    window.pin.filterMap();
  });
  mapRooms.addEventListener('change', function () {
    dataFilterTipes.room = mapRooms.value;
    window.pin.filterMap();
  });
  mapGuests.addEventListener('change', function () {
    dataFilterTipes.guest = mapGuests.value;
    window.pin.filterMap();
  });

  mapFeatureForm.addEventListener('click', function (evt) {
    if (evt.target.matches('label')) {
      var selectCheckBox = document.getElementById(evt.target.getAttribute('for'));
      var nameCheckBox = selectCheckBox.getAttribute('value');
      if (selectCheckBox.checked === false) {
        switch (nameCheckBox) {
          case 'wifi':
            dataFilterTipes.features[0] = nameCheckBox;
            break;
          case 'dishwasher':
            dataFilterTipes.features[1] = (nameCheckBox);
            break;
          case 'parking':
            dataFilterTipes.features[2] = (nameCheckBox);
            break;
          case 'washer':
            dataFilterTipes.features[3] = (nameCheckBox);
            break;
          case 'elevator':
            dataFilterTipes.features[4] = (nameCheckBox);
            break;
          case 'conditioner':
            dataFilterTipes.features[5] = (nameCheckBox);
            break;
          default:
            break;
        }
      }
      if (selectCheckBox.checked === true) {
        switch (nameCheckBox) {
          case 'wifi':
            dataFilterTipes.features[0] = '';
            break;
          case 'dishwasher':
            dataFilterTipes.features[1] = '';
            break;
          case 'parking':
            dataFilterTipes.features[2] = '';
            break;
          case 'washer':
            dataFilterTipes.features[3] = '';
            break;
          case 'elevator':
            dataFilterTipes.features[4] = '';
            break;
          case 'conditioner':
            dataFilterTipes.features[5] = '';
            break;
          default:
            break;
        }
      }
      window.pin.filterMap();
    }
  });


  window.filter = {
    updatePins: updatePins,
    removePins: removePins,
  };
})();

