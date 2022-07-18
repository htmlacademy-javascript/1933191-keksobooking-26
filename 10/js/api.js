import { commonMarker } from './map.js';
import { showMessage } from './util.js';
const ADDITIONAL_HOTELS_COUNT= 10;

const getData=(onSuccess)=>{
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((hotels) => {
      onSuccess(hotels.slice(0, ADDITIONAL_HOTELS_COUNT));
    }).catch(()=>{
      document.querySelector('.map').classList.add('map--error');
      document.querySelector('.notice').insertBefore(document.querySelector('#error__download').content.querySelector('.error__download'),document.querySelector('.notice__title'));
    });
};
const sendData = (onSuccess,onFail,body)=>{
  fetch(
    'https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        showMessage('success');
      }
    })
    .catch(() => {
      showMessage('error');
    });
};

export {getData,sendData};
