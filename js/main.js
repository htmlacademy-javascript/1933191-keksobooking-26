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
  return authorNumber;
}

const author = {
  avatar : `img/avatars/user${authorGenerate()}.png` ,
};

const titleHotels = ['','Отель Гельвеция','Арт Отель','Лахта Плаза','Кино Хостел на Выборгской','Александр Хаус',
  'Галунов Отель','Соул Китчен Джуниор Хостел','Камердинеръ Отель','Гостиница Моя','Центр Отель'
];

const descriptionHotels = ['','Остановитесь в самом центре! 5-звездочный отель "Гельвеция" расположен в 2 минутах ходьбы от Невского проспекта и станции метро «Маяковская».',
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

const typeHousing = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const checkInList = ['12:00','13:00','14:00'];

const checkOutList = ['12:00','13:00','14:00'];

const featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const locations = {
  lat : getRandomPositiveFloat(35.65, 35.7, 5),
  lng : getRandomPositiveFloat(139.7, 139.8, 5),
};

const photosList = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

const getNewRandomFeaturesList = function (arrayNumber)  {
  const newArray = [];
  const copyArray = featuresList.slice();
  shuffle(copyArray);
  for (let i = 0; i < arrayNumber; i++) {
    const options = copyArray.shift();
    newArray.push(options);
  }
  return newArray;
};

const getNewRandomPhotosList = function (arrayNumber)  {
  const newArray = [];
  const copyArray = photosList.slice();
  shuffle(copyArray);
  for (let i = 0; i < arrayNumber-1; i++) {
    const options = copyArray[i];
    newArray.push(options);
  }
  return newArray;
};
const offer =(id) => ({
  id,
  author : `img/avatars/user${(`0${authorNumber[id]}`).slice(-2)}.png`,
  title : titleHotels[id],
  address : [getRandomPositiveFloat(35.65, 35.7, 5), getRandomPositiveFloat(139.7, 139.8, 5)],
  price : getRandomPositiveInteger(1,100000),
  type : typeHousing[getRandomPositiveInteger(0,4)],
  rooms : getRandomPositiveInteger(1,8),
  guests : getRandomPositiveInteger(1,6),
  checkin : checkInList[getRandomPositiveInteger(0,2)],
  checkout : checkOutList[getRandomPositiveInteger(0,2)],
  features : getNewRandomFeaturesList(getRandomPositiveInteger(1,6)),
  description : descriptionHotels[id],
  photos : getNewRandomPhotosList(getRandomPositiveInteger(1,3))
});


function GetGenerationArray () {
  const offers = [];
  for (let i=1;i <= AMOUNT_ARRAYS;i++) {
    const storeVariable= offer(i);
    offers.push(storeVariable);

  }
  return offers;
}

