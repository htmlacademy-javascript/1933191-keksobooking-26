// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
//  Будет использоваться для генерации временных географических координат в следующем задании.
//  Пример использования функции:

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

const RANDOM_AUTHOR_AVATARS = (`0${ getRandomPositiveInteger(1, 10)}`).slice(-2);

const AUTHOR = {
  avatar : `img/avatars/user${RANDOM_AUTHOR_AVATARS}.png` ,
};

console.log(AUTHOR.avatar);

const TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const RANDOM_TYPE_HOUSING = getRandomPositiveInteger(0,TYPE_HOUSING.length-1);

const CHECK_IN_LIST = ['12:00','13:00','14:00'];
const RANDOM_CHECK_IN_LIST = getRandomPositiveInteger(0,CHECK_IN_LIST.length-1);

const CHECK_OUT_LIST = ['12:00','13:00','14:00'];
const RANDOM_CHECK_OUT_LIST = getRandomPositiveInteger(0,CHECK_OUT_LIST.length-1);

const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const GET_NEW_ARRAY = function (array)  {
  const NEW_ARRAY = [];
  const NEW_ARRAY_LENGTH = getRandomPositiveInteger(1, array.length);

  for (let i = 1; i <= NEW_ARRAY_LENGTH; i++) {
    const OPTIONS = array.shift();
    NEW_ARRAY.push(OPTIONS);
  }
  return NEW_ARRAY;
};

const PHOTOS_LIST =['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const LOCATION = {
  lat : getRandomPositiveFloat(35.65, 35.7, 5),
  lng : getRandomPositiveFloat(139.7, 139.8, 5)
};

const OFFER = {
  title : 'Отель "Космос"',
  address : [LOCATION.lat, LOCATION.lng],
  price : getRandomPositiveInteger(1,100000),
  type : TYPE_HOUSING[RANDOM_TYPE_HOUSING],
  rooms : getRandomPositiveInteger(1,8),
  guests : getRandomPositiveInteger(1,6),
  checkin : CHECK_IN_LIST[RANDOM_CHECK_IN_LIST],
  checkout : CHECK_OUT_LIST[RANDOM_CHECK_OUT_LIST],
  features : GET_NEW_ARRAY(FEATURES_LIST),
  description : 'Космический отель',
  photos : GET_NEW_ARRAY(PHOTOS_LIST)
};

console.log(OFFER);
