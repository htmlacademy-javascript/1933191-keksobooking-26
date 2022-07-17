const ALERT_SHOW_TIME = 2000;

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
  const Message = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  document.querySelector('.map').append(Message);
  setTimeout(()=>{ Message.remove();}, ALERT_SHOW_TIME);
};

const validateValueRoom = ()=>{

  const adForm = document.querySelector('.ad-form');
  const roomsField = adForm.querySelector('[name="rooms"]');
  const capacityField = adForm.querySelector('[name="capacity"]');
  capacityField.querySelectorAll('option').forEach((item) => item.parentNode.removeChild(item));
  switch (roomsField.value){
    case '3':
      for(let i=1;i<=3;i++){
        const newOption= new Option(`для ${i} гостей`, `${i}`);

        capacityField.appendChild(newOption);
      }
      return;
    case '2':
      for(let i=1;i<=2;i++){

        const newOption= new Option(`для ${i} гостей`, `${i}`);

        capacityField.appendChild(newOption);
      }
      return;
    case '1':
      for(let i=1;i<=1;i++){
        const newOption= new Option(`для ${i} гостей`, `${i}`);
        capacityField.appendChild(newOption);
      }
      return;
    case '100':
      for(let i=1;i<=1;i++){
        const newOption= new Option('не для гостей', '0');
        capacityField.appendChild(newOption);
      }
  }
};


export {getRandomPositiveInteger,getRandomPositiveFloat,getNewRandomArray,showMessage,validateValueRoom};
