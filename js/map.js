import { makeActiveForm } from './form.js';
import { getHotelListPopup } from './hotels.js';
import { getData } from './api.js';
import { debounce } from './util.js';

const address = document.querySelector('#address');
const START_LAT = 35.6780754;
const START_LNG = 139.7242175;
const PRICE_FOR_FILTER= {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: 100000,
  },
  any: {
    min: 0,
    max: 100000,
  },
};
const RELOAD_DELAY = 500;
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const mainMarker = L.marker(
  {
    lat: START_LAT,
    lng: START_LNG,
  },
  {
    draggable: true,
    icon:mainPinIcon,
  },
  address.value= [START_LAT,START_LNG]
);
const similarPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const setupMap = (array) => {
  map
    .on('load', () => {
      makeActiveForm();
      address.setAttribute('readonly','readonly');
      address.classList.add('ad-form--disabled');
    })
    .setView({
      lat: START_LAT,
      lng: START_LNG,
    }, 14);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  mainMarker.addTo(map);

  mainMarker.on('moveend',(evt)=> {
    address.value =Object.values(evt.target.getLatLng());
  });

  for(let i=0;i<array.length;i++){
    const lat = array[i].location.lat;
    const lng = array[i].location.lng;
    const similarMarker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon:similarPinIcon,
      },
    );
    similarMarker.addTo(markerGroup).bindPopup(getHotelListPopup(array)[i]);

  }
};
const filteringArray =(elementsForFiltering)=>{
  const housingTypeValue = document.querySelector('#housing-type').value;
  const housingPriceValue = document.querySelector('#housing-price').value;
  const housingRoomsValue = document.querySelector('#housing-rooms').value;
  const housingGuestsValue = document.querySelector('#housing-guests').value;
  const housingFeatures=document.querySelector('#housing-features');

  const typeFiltering = (elementFiltering)=>(
    housingTypeValue === elementFiltering.offer.type || housingTypeValue === 'any'
  );
  const priceFiltering =(elementFiltering)=>(
    elementFiltering.offer.price>= PRICE_FOR_FILTER[housingPriceValue].min && elementFiltering.offer.price <= PRICE_FOR_FILTER[housingPriceValue].max

  );
  const roomsFiltering = (elementFiltering) => (
    elementFiltering.offer.rooms.toString() === housingRoomsValue || housingRoomsValue === 'any'
  );
  const guestsFiltering = (elementFiltering) => (
    elementFiltering.offer.guests.toString() === housingGuestsValue || housingGuestsValue === 'any'
  );
  const featuresFiltering = (elementFiltering) => {

    const checkedFilters = housingFeatures.querySelectorAll('input:checked');

    const emptyArray = [];
    checkedFilters.forEach((element) => emptyArray.push(element.value));
    if (elementFiltering.offer.features){
      return emptyArray.every((feature) => elementFiltering.offer.features.includes(feature));
    }
    return false;
  };
  const checkFilters = (element) =>(
    typeFiltering(element) && priceFiltering(element)

    && roomsFiltering(element)
    && guestsFiltering(element)
    && featuresFiltering(element)
  );
  const filteredArray = [];
  for (let i = 0; i < elementsForFiltering.length; i++) {
    if(checkFilters(elementsForFiltering[i])){
      filteredArray.push(elementsForFiltering[i]);
    }
  }
  return filteredArray;
};
const createMarkers=(array)=>{
  for(let i=0;i<array.length;i++){
    const lat = array[i].location.lat;
    const lng = array[i].location.lng;
    L.marker([lat,lng],{icon: similarPinIcon}).addTo(markerGroup).bindPopup(getHotelListPopup(array)[i]);
  }
};

const mapFilterDelayUpdate =()=>{
  const hotelFormInput = document.querySelector('.map__filters');
  hotelFormInput.addEventListener('change',debounce(()=>{
    markerGroup.clearLayers();
    getData((array)=>{
      createMarkers(filteringArray(array));
    });
  },RELOAD_DELAY));
};

export {setupMap,mapFilterDelayUpdate,markerGroup,filteringArray,mainMarker};
