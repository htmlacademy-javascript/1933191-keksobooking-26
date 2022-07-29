import { sendData,getData } from './api.js';
import { validateValueRoom } from './util.js';
import { markerGroup,filteringArray,mainMarker,createMarkers } from './map.js';


const adForm = document.querySelector('.ad-form');
const adFormHeader = document.querySelector('.ad-form-header');
const adFormField = document.querySelector('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFeatures = document.querySelector('.map__features');
const roomsField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');
const titleField = adForm.querySelector('#title');
const addressField = adForm.querySelector('#address');
const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');
const sliderField= adForm.querySelector('.ad-form__slider');
const submitButton= adForm.querySelector('.ad-form__submit');
const HouseTypes = {
  Bungalow: 'bungalow',
  Flat: 'flat',
  Hotel: 'hotel',
  House: 'house',
  Palace: 'palace'
};
const VALIDATE_PRICE = {
  Bungalow:{low:0,max:100000},
  Flat:{low:1000,max:100000},
  Hotel:{low:3000,max:100000},
  House:{low:5000,max:100000},
  Palace:{low:10000,max:100000}
};
const VALIDATE_TITLE={
  value:{min:30,max:100}
};
const START_LAT = 35.6780754;
const START_LNG = 139.7242175;

const makeActiveForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.removeAttribute('disabled');
  adFormField.removeAttribute('disabled');
  mapFilters.classList.remove('map__filters--disabled');
  mapFeatures.removeAttribute('disabled');
  sliderField.removeAttribute('disabled');
};

const makeInactiveForm = () =>{
  adForm.classList.add('ad-form--disabled');
  adFormHeader.setAttribute('disabled');
  adFormField.setAttribute('disabled');
  mapFilters.classList.add('map__filters--disabled');
  mapFeatures.setAttribute('disabled');
  sliderField.setAttribute('disabled', true);
};


const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

const validateTitle = (value)=> (
  value.length >= VALIDATE_TITLE.value.min && value.length <= VALIDATE_TITLE.value.max
);
const getTitleErrorMessage=()=> (
  'Заголовок должен быть от 30 до 100 символов'
);


const validatePrice= (value)=> {
  switch(typeField.value){
    case HouseTypes.Bungalow:
      return value >= VALIDATE_PRICE.Bungalow.low && value <= VALIDATE_PRICE.Bungalow.max;
    case HouseTypes.Flat:
      return value >= VALIDATE_PRICE.Flat.low && value <= VALIDATE_PRICE.Flat.max;
    case HouseTypes.Hotel:
      return value >= VALIDATE_PRICE.Hotel.low && value <= VALIDATE_PRICE.Hotel.max;
    case HouseTypes.House:
      return value >= VALIDATE_PRICE.House.low && value <= VALIDATE_PRICE.House.max;
    case HouseTypes.Palace:
      return value >= VALIDATE_PRICE.Palace.low && value <= VALIDATE_PRICE.Palace.max;
  }

};
const getPriceErrorMessage=()=> {
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
};

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

const validateSettlement= ()=> (
  roomsField.value>=capacityField.value

);

const getRoomsErrorMessage=()=>(
  'Для каждого гостя должна быть комната'
);
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
  const adFormHeaderPreviewImage = document.querySelector('.ad-form-header__preview-image');
  adFormHeaderPreviewImage.src='img/muffin-grey.svg';
  const adFormPhotoContainer = document.querySelector('.ad-form__photo-container');
  const adFormPhoto = document.querySelectorAll('.ad-form__photo');
  const descriptionField = document.querySelector('#description');
  const featuresCheckbox = document.querySelectorAll('.features__checkbox:checked');
  titleField.value='';
  typeField.value='flat';
  addressField.value = [START_LAT,START_LNG];
  priceField.placeholder='1000';
  priceField.value='';
  timeInField.value= '12:00';
  timeOutField.value= '12:00';
  roomsField.value = '1';
  descriptionField.value= '';
  adFormHeaderPreviewImage.src='img/muffin-grey.svg';

  for(let i= 0;i<featuresCheckbox.length;i++ ){
    featuresCheckbox[i].checked = false;
  }
  for(let i= 0;i<adFormPhoto.length;i++ ){
    adFormPhoto[i].parentNode.removeChild(adFormPhoto[i]);
  }
  const createAdFormPhoto = document.createElement('div');
  createAdFormPhoto.classList.add('ad-form__photo');
  adFormPhotoContainer.append(createAdFormPhoto);
};
const setFilterMapReset=()=>{
  const mapFilter=document.querySelector('.map__filters');
  mapFilter.reset();
};
const reloadMap =()=>{
  markerGroup.clearLayers();
  mainMarker.setLatLng([START_LAT,START_LNG]);
  getData((array)=>{
    createMarkers(filteringArray(array));
  });
};

adForm.addEventListener('reset', (evt) => {
  evt.preventDefault();
  adForm.reset();
  pristine.reset();
  setUserFormReset();
  reloadMap();
  setFilterMapReset();
  addressField.value = [START_LAT,START_LNG];
});


export {makeInactiveForm,makeActiveForm,setUserFormSubmit,setUserFormReset};
