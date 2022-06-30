import { getHotel,getGenerationArray } from './data.js';

const canvas= document.querySelector('.map__canvas');
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');


const arrayHotels = getGenerationArray();

const getTypeHotel=function(type){
  switch(type){
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
  }
};

const getPhotosList = function(array,photo,photos){
  photo.remove();
  for(let i =0;i <array.length;i++){
    photo.src=array[i];
    photos.appendChild(photo.cloneNode(true));
  }
};

const getFeatureList = function(array,features){
  while (features.firstChild) {
    features.removeChild(features.firstChild);
  }
  for(let i =0;i <array.length;i++) {
    const li = document.createElement('li');
    li.classList.add('popup__feature',`popup__feature--${array[i]}`);
    features.append(li);
  }
};

getGenerationArray().forEach((hotel) =>{

  const popupElement = popupTemplate.cloneNode(true);
  popupElement.querySelector('.popup__title').textContent=hotel.offer.title;
  popupElement.querySelector('.popup__text--address').textContent=hotel.offer.address;
  popupElement.querySelector('.popup__text--price').textContent=`${hotel.offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent=getTypeHotel(hotel.offer.type);
  popupElement.querySelector('.popup__text--capacity').textContent=`${hotel.offer.rooms} комнаты для ${hotel.offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent=`Заезд после ${hotel.offer.checkin}, выезд до ${hotel.offer.checkout}`;
  popupElement.querySelector('.popup__features').append=getFeatureList(hotel.offer.features,popupElement.querySelector('.popup__features'),popupElement.querySelector('.popup__feature'));
  popupElement.querySelector('.popup__description').textContent=hotel.offer.description;
  popupElement.querySelector('.popup__photos').append=getPhotosList(hotel.offer.photos,popupElement.querySelector('.popup__photo'),popupElement.querySelector('.popup__photos'));
  popupElement.querySelector('.popup__avatar').src=hotel.author.avatar;
  canvas.appendChild(popupElement);
});


