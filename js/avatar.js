'use strict';
// main.js
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarInput = document.getElementById('avatar');
  var imageInput = document.getElementById('images');

  var headerPreview = document.querySelector('.ad-form-header__preview');
  var avatar = headerPreview.getElementsByTagName('img');

  var imagePreview = document.querySelector('.ad-form__photo-container');
  var imageBlock = imagePreview.querySelector('.ad-form__photo');

  avatarInput.addEventListener('change', function () {
    var file = avatarInput.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatar[0].src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  window.filesQueue = [];
  imageInput.addEventListener('change', function () {
    var file = imageInput.files[0];

    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var readerHouse = new FileReader();
      readerHouse.addEventListener('load', function () {
        window.filesQueue.push(readerHouse.result);
        var newImg = document.createElement('img');
        newImg.setAttribute('src', readerHouse.result);
        newImg.setAttribute('width', '100%');
        newImg.setAttribute('height', '100%');
        imageBlock.appendChild(newImg);
      });
      readerHouse.readAsDataURL(file);
    }
  });

  var imageReset = function () {
    var removeBlock = imageBlock.getElementsByTagName('img');
    avatar[0].setAttribute('src', 'img/muffin-grey.svg');
    var countBlock = removeBlock.length;
    for (var i = 0; i < countBlock; i++) {
      removeBlock[0].remove();
    }
  };

  window.avatar = {
    imageReset: imageReset
  };

})();


