const adForm = document.querySelector('.ad-form');
const adFormHeader = document.querySelector('.ad-form-header');
const adFormElement = document.querySelector('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFeatures = document.querySelector('.map__features');

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

export {makeInactiveForm,makeActiveForm};
