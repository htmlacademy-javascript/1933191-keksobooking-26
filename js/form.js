const adForm = document.querySelector('.ad-form');
const adFormHeader = document.querySelector('.ad-form-header');
const adFormElement = document.querySelector('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFeatures = document.querySelector('.map__features');
const roomsField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');


const makeInactiveForm = () =>{
  adForm.classList.add('ad-form--disabled');
  adFormHeader.setAttribute('disabled', 'disabled');
  adFormElement.setAttribute('disabled', 'disabled');
  mapFilters.classList.add('map__filters--disabled');
  mapFeatures.setAttribute('disabled', 'disabled');
};

const makeActiveForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.removeAttribute('disabled', 'disabled');
  adFormElement.removeAttribute('disabled', 'disabled');
  mapFilters.classList.remove('map__filters--disabled');
  mapFeatures.removeAttribute('disabled', 'disabled');
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
},false);

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}
function getTitleErrorMessage() {
  return 'Заголовок должен быть от 30 до 100 символов';
}


function validatePrice (value) {
  switch(adForm.querySelector('#type').value){
    case 'bungalow':
      return value.length >= 0 && value.length <= 100000;
    case 'flat':
      return value.length >= 1000 && value.length <= 100000;
    case 'hotel':
      return value.length >= 3000 && value.length <= 100000;
    case 'house':
      return value.length >= 5000 && value.length <= 100000;
    case 'palace':
      return value.length >= 10000 && value.length <= 100000;
  }

}
function getPriceErrorMessage() {
  switch(adForm.querySelector('#type').value){
    case 'bungalow':
      return 'Минимальная цена за ночь 0 руб, максимальная 100000 руб';
    case 'flat':
      return 'Минимальная цена за ночь 1000 руб, максимальная 100000 руб';
    case 'hotel':
      return 'Минимальная цена за ночь 3000 руб, максимальная 100000 руб';
    case 'house':
      return 'Минимальная цена за ночь 5000 руб, максимальная 100000 руб';
    case 'palace':
      return 'Минимальная цена за ночь 10000 руб, максимальная 100000 руб';
  }
}

pristine.addValidator(adForm.querySelector('#title'),validateTitle,getTitleErrorMessage);
pristine.addValidator(adForm.querySelector('#price'),validatePrice,getPriceErrorMessage);

function validateSettlement () {
  const settlementOption =[ [1,2,3],[2,3],[3],[100]];
  const rooms =roomsField.querySelector('option:checked');
  const optionRooms= roomsField.children;
  const capacity =capacityField.querySelector('option:checked');
  if (rooms.value<=capacity.value) {
    roomsField.querySelectorAll('option').forEach((item) => item.parentNode.removeChild(item));
    for(let i=0;i<settlementOption[capacity.value-1].length;i++){
      const newOption = new Option(`${settlementOption[capacity.value-1][i]} комнаты`, `${settlementOption[capacity.value-1][i]}`);
      roomsField.appendChild(newOption);
    }
    return optionRooms;
  }
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
