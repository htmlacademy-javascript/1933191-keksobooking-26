const adForm = document.querySelector('.ad-form');
const adFormHeader = document.querySelector('.ad-form-header');
const adFormElement = document.querySelector('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFeatures = document.querySelector('.map__features');
const roomsField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');
const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');
const sliderField= adForm.querySelector('.ad-form__slider');
const HouseTypes = {
  Bungalow: 'bungalow',
  Flat: 'flat',
  Hotel: 'hotel',
  House: 'house',
  Palace: 'palace'
};

const makeInactiveForm = () =>{
  adForm.classList.add('ad-form--disabled');
  adFormHeader.setAttribute('disabled');
  adFormElement.setAttribute('disabled');
  mapFilters.classList.add('map__filters--disabled');
  mapFeatures.setAttribute('disabled');
  sliderField.setAttribute('disabled', true);
};

const makeActiveForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.removeAttribute('disabled');
  adFormElement.removeAttribute('disabled');
  mapFilters.classList.remove('map__filters--disabled');
  mapFeatures.removeAttribute('disabled');
  sliderField.removeAttribute('disabled');
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}
function getTitleErrorMessage() {
  return 'Заголовок должен быть от 30 до 100 символов';
}


function validatePrice (value) {
  switch(typeField.value){
    case HouseTypes.Bungalow:
      return value.length >= 0 && value.length <= 100000;
    case HouseTypes.Flat:
      return value.length >= 1000 && value.length <= 100000;
    case HouseTypes.Hotel:
      return value.length >= 3000 && value.length <= 100000;
    case HouseTypes.House:
      return value.length >= 5000 && value.length <= 100000;
    case HouseTypes.Palace:
      return value.length >= 10000 && value.length <= 100000;
  }

}
function getPriceErrorMessage() {
  switch(typeField.value){
    case HouseTypes.Bungalow:
      return 'Минимальная цена за ночь 0 руб, максимальная 100000 руб';
    case HouseTypes.Flat:
      return 'Минимальная цена за ночь 1000 руб, максимальная 100000 руб';
    case HouseTypes.Hotel:
      return 'Минимальная цена за ночь 3000 руб, максимальная 100000 руб';
    case HouseTypes.House:
      return 'Минимальная цена за ночь 5000 руб, максимальная 100000 руб';
    case HouseTypes.Palace:
      return 'Минимальная цена за ночь 10000 руб, максимальная 100000 руб';
  }
}

typeField.addEventListener('change', () => {
  switch (typeField.value) {
    case HouseTypes.Bungalow:
      priceField.placeholder = 0;
      return;
    case HouseTypes.Flat:
      priceField.placeholder = 1000;
      return;
    case HouseTypes.Hotel:
      priceField.placeholder = 3000;
      return;
    case HouseTypes.House:
      priceField.placeholder = 5000;
      return;
    case HouseTypes.Palace:
      priceField.placeholder = 10000;
  }
});

timeInField.addEventListener('click', () => {
  timeOutField.value = timeInField.value;
});

timeOutField.addEventListener('click', () => {
  timeInField.value=timeOutField.value;
});

pristine.addValidator(adForm.querySelector('#title'),validateTitle,getTitleErrorMessage);
pristine.addValidator(adForm.querySelector('#price'),validatePrice,getPriceErrorMessage);

function validateSettlement () {
  const settlementOption =[ [1,2,3],[2,3],[3],[100]];
  const rooms =roomsField.querySelector('option:checked');
  const capacity =capacityField.querySelector('option:checked');
  if (rooms.value<capacity.value) {
    roomsField.querySelectorAll('option').forEach((item) => item.parentNode.removeChild(item));
    for(let i=0;i<settlementOption[capacity.value-1].length;i++){
      const newOption = new Option(`${settlementOption[capacity.value-1][i]} комнаты`, `${settlementOption[capacity.value-1][i]}`);
      roomsField.appendChild(newOption);
    }
    return false;
  }
  return true;
}

function getRoomsErrorMessage(){
  return 'Для каждого гостя должна быть комната';
}

pristine.addValidator(roomsField,validateSettlement,getRoomsErrorMessage);
pristine.addValidator(capacityField,validateSettlement,getRoomsErrorMessage);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


export {makeInactiveForm,makeActiveForm};
