import { sendData } from './api.js';
import { showMessage,validateValueRoom } from './util.js';

const adForm = document.querySelector('.ad-form');
const adFormHeader = document.querySelector('.ad-form-header');
const adFormElement = document.querySelector('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFeatures = document.querySelector('.map__features');
const roomsField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');
const titleField = adForm.querySelector('#title');
const addressField = adForm.querySelector('#addressField');
const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');
const sliderField= adForm.querySelector('.ad-form__slider');
const submitButton= adForm.querySelector('.ad-form__submit');
const resetButton= adForm.querySelector('.ad-form__reset');
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
      return value >= 0 && value <= 100000;
    case HouseTypes.Flat:
      return value >= 1000 && value <= 100000;
    case HouseTypes.Hotel:
      return value >= 3000 && value <= 100000;
    case HouseTypes.House:
      return value >= 5000 && value <= 100000;
    case HouseTypes.Palace:
      return value >= 10000 && value <= 100000;
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

pristine.addValidator(titleField,validateTitle,getTitleErrorMessage);
pristine.addValidator(priceField,validatePrice,getPriceErrorMessage);

validateValueRoom();
roomsField.addEventListener('change',()=>{
  validateValueRoom();
});

function validateSettlement () {
  if(roomsField.value<capacityField.value){
    return false;
  }
  return true;
}

function getRoomsErrorMessage(){
  return 'Для каждого гостя должна быть комната';
}
pristine.addValidator(capacityField,validateSettlement,getRoomsErrorMessage);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

const setUserFormSubmit=()=>{
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
        },
        () => {
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};
const setUserFormReset=()=>{
  resetButton.addEventListener('click', () => {
    titleField.value='';
    typeField.value='flat';
    priceField.placeholder='1000';
    priceField.value='';
    timeInField.value= '12:00';
    timeOutField.value= '12:00';
    roomsField.value = '1';
    capacityField.value='3';
  });
};
export {makeInactiveForm,makeActiveForm,setUserFormSubmit,setUserFormReset};
