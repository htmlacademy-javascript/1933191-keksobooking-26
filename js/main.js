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

const AMOUNT_ARRAYS = 10;

const authorNumber =[];
function authorGenerate () {
  for (let i=1;i<=AMOUNT_ARRAYS;i++) {
    authorNumber[i]=i;
  }
}


const TITLE_HOTELS = ['Отель Гельвеция','Арт Отель','Лахта Плаза','Кино Хостел на Выборгской','Александр Хаус',
  'Галунов Отель','Соул Китчен Джуниор Хостел','Камердинеръ Отель','Гостиница Моя','Центр Отель'
];

const DESCRIPTION_HOTELS = ['Остановитесь в самом центре! 5-звездочный отель "Гельвеция" расположен в 2 минутах ходьбы от Невского проспекта и станции метро «Маяковская».',
  'Новый современный бизнес-отель, отвечающий актуальным требованиям и тенденциям сферы гостеприимства.',
  'Новый бизнес-отель на берегу Финского залива, в новом деловом центре Петербурга.',
  'Самый дизайнерский и уютный хостел, который вы видели.',
  'Вы будете чувствовать себя в Москве как дома благодаря услугам, которые предлагает этот b&b.',
  'Расположен в Санкт-Петербурге, в 7 минутах ходьбы от площади Восстания.',
  'Расположена в зеленой зоне города Самара рядом с рекой Волгой',
  'Отличный выбор для гостей Санкт-Петербурга, семейная атмосфера и множество полезных услуг сделают пребывание здесь очень приятным.',
  'Наша квартира 8 гостей идеально подойдет для всех типов путешественников: туристы, пары, небольшие семьи, бизнес-туристы.',
  'Прекрасный выбор для тех, кто хочет восстановить силы.'

];

const TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const CHECK_IN_LIST = ['12:00','13:00','14:00'];

const CHECK_OUT_LIST = ['12:00','13:00','14:00'];

const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PHOTOS_LIST = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

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
const getHotel = (id) => ({
  id,
  author : {avatar : `img/avatars/user${id < 10 ? id : 0 ,`0${id}`}.png`},
  offer : {
    title : TITLE_HOTELS[id],
    address : [getRandomPositiveFloat(35.65, 35.7, 5), getRandomPositiveFloat(139.7, 139.8, 5)],
    price : getRandomPositiveInteger(1,100000),
    type : TYPE_HOUSING[getRandomPositiveInteger(0,4)],
    rooms : getRandomPositiveInteger(1,8),
    guests : getRandomPositiveInteger(1,6),
    checkin : CHECK_IN_LIST[getRandomPositiveInteger(0,2)],
    checkout : CHECK_OUT_LIST[getRandomPositiveInteger(0,2)],
    features : getNewRandomArray(getRandomPositiveInteger(1,6),FEATURES_LIST),
    description : DESCRIPTION_HOTELS[id],
    photos : getNewRandomArray(getRandomPositiveInteger(1,3),PHOTOS_LIST)
  },
  location : {lat: getRandomPositiveFloat(35.65, 35.7, 5),lng :getRandomPositiveFloat(139.7, 139.8, 5)}
});


function getGenerationArray () {
  const hotels = [];
  for (let i=0;i < AMOUNT_ARRAYS;i++) {
    hotels.push(getHotel(i));
  }
  return hotels;
}

console.log(getGenerationArray ());
