import { makeActiveForm } from './form.js';
import { getGenerationArray } from './data.js';
import { getHotelListPopup } from './hotels.js';
const address = document.querySelector('#address');
const START_LAT = 35.6780754;
const START_LNG = 139.7242175;

const map = L.map('map-canvas')
  .on('load', () => {
    // makeActiveForm();
    address.setAttribute('disabled','disabled');
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

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const similarPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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

mainMarker.addTo(map);

mainMarker.on('moveend',(evt)=> {
  address.value =Object.values(evt.target.getLatLng());
});

const markerGroup = L.layerGroup().addTo(map);


const commonMarker = (array)=>{

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

export {commonMarker};

