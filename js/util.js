const ALERT_SHOW_TIME = 2000;
const VALUE_GUESTS = {
  threeGuests: '3',
  twoGuests: '2',
  oneGuest: '1',
  noGuests: '100'
};
const TIME_RERENDER = 500;


function getRandomPositiveFloat (min,max, maxDigits = 0) {
  if (min > max || min < 0 || max <= 0) {
    return ('Задан неверный диапазон! Укажите другие числа.');
  }
  const digitsDegree = 10 ** maxDigits;
  return ~~((Math.random() * (max - min) + min) * digitsDegree) / digitsDegree;
}


function getRandomPositiveInteger (a, b) {

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
const getNewRandomArray = function (arrayNumber,arrayName)  {
  const newArray = [];
  const copyArray = arrayName.slice();
  shuffle(copyArray);
  for (let i = 0; i < arrayNumber; i++) {
    const options = arrayName[i];
    newArray.push(options);
  }
  return newArray;
};

const showMessage = (status)=>{
  const message = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  document.querySelector('.map').append(message);
  setTimeout(()=>{ message.remove();}, ALERT_SHOW_TIME);
};
const setErrorMarkMessage = ()=>{
  document.querySelector('.map').classList.add('map--error');
  document.querySelector('.notice').insertBefore(document.querySelector('#error__download').content.querySelector('.error__download'),document.querySelector('.notice__title'));
};

const validateValueRoom = ()=>{
  const adForm = document.querySelector('.ad-form');
  const roomsField = adForm.querySelector('[name="rooms"]');
  const capacityField = adForm.querySelector('[name="capacity"]');
  capacityField.querySelectorAll('option').forEach((item) => item.parentNode.removeChild(item));
  switch (roomsField.value){
    case VALUE_GUESTS.threeGuests:
      for(let i=1;i<=3;i++){
        const newOption= new Option(`для ${i} гостей`, `${i}`);

        capacityField.appendChild(newOption);
      }
      return;
    case VALUE_GUESTS.twoGuests:
      for(let i=1;i<=2;i++){

        const newOption= new Option(`для ${i} гостей`, `${i}`);

        capacityField.appendChild(newOption);
      }
      return;
    case VALUE_GUESTS.oneGuest:
      for(let i=1;i<=1;i++){
        const newOption= new Option(`для ${i} гостей`, `${i}`);
        capacityField.appendChild(newOption);
      }
      return;
    case VALUE_GUESTS.noGuests:
      for(let i=1;i<=1;i++){
        const newOption= new Option('не для гостей', '0');
        capacityField.appendChild(newOption);
      }
  }
};

function debounce (callback, timeoutDelay = TIME_RERENDER) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export {getRandomPositiveInteger,getRandomPositiveFloat,getNewRandomArray,showMessage,setErrorMarkMessage,validateValueRoom,debounce};
