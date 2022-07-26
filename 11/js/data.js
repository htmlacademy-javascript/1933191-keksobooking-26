import {getRandomPositiveInteger,getRandomPositiveFloat,getNewRandomArray} from './util.js';

const AMOUNT_ARRAYS = 10;

const TITLE_HOTELS = ['Hilton Tokyo','Keio Plaza Hotel','Shinjuku Granbell Hotel','Daiwa Roynet Hotel Nishi Shinjuku','Hotel&Co. Sagami x HighUnitTokyo',
  'Hotel Metropolitan Tokyo Ikebukuro','Hotel Wing International Korakuen','BOOK AND BED TOKYO','UNPLAN Shinjuku','Hotel Shinjuku Kabukicho'
];

const DESCRIPTION_HOTELS = ['Остановитесь в самом центре! 5-звездочный отель "Hilton Tokyo"',
  'Новый современный бизнес-отель, отвечающий актуальным требованиям и тенденциям сферы гостеприимства.',
  'Отель, где вы можете насладиться спокойным отдыхом в стиле «убежища для взрослых». Напоминает свою предыдущую суету',
  'Самый дизайнерский и уютный хостел, который вы видели.',
  'Вы будете чувствовать себя в Москве как дома благодаря услугам, которые предлагает этот b&b.',
  'Отель сочетает в себе уют домашнего очага и комфорт современной обстановки.',
  'Расположен в Токио, в 7 минутах ходьбы от храма Сэнсодзи.',
  'Отличный выбор для гостей Токио, семейная атмосфера и множество полезных услуг сделают пребывание здесь очень приятным.',
  'Наша гостиница идеально подойдет для всех типов путешественников: туристы, пары, небольшие семьи, бизнес-туристы.',
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

const getHotel = (id) => ({
  id,
  author : {avatar : `img/avatars/user${id >= 10 ? id : `0${id}`}.png`},
  offer : {
    title : TITLE_HOTELS[id-1],
    address : [getRandomPositiveFloat(35.65, 35.7, 5), getRandomPositiveFloat(139.7, 139.8, 5)],
    price : getRandomPositiveInteger(1,100000),
    type : TYPE_HOUSING[getRandomPositiveInteger(0,4)],
    rooms : getRandomPositiveInteger(1,8),
    guests : getRandomPositiveInteger(1,6),
    checkin : CHECK_IN_LIST[getRandomPositiveInteger(0,2)],
    checkout : CHECK_OUT_LIST[getRandomPositiveInteger(0,2)],
    features : getNewRandomArray(getRandomPositiveInteger(1,6),FEATURES_LIST),
    description : DESCRIPTION_HOTELS[id-1],
    photos : getNewRandomArray(getRandomPositiveInteger(1,3),PHOTOS_LIST)
  },
  location : {lat: getRandomPositiveFloat(35.65, 35.7, 5),lng :getRandomPositiveFloat(139.7, 139.8, 5)}
});


function getGenerationArray () {
  const hotels = [];
  for (let i=1;i <= AMOUNT_ARRAYS;i++) {
    hotels.push(getHotel(i));
  }
  return hotels;
}
export {getHotel,getGenerationArray};
