import { getGenerationArray } from './data.js';
import { makeActiveForm } from './form.js';
import { getHotelListPopup } from './hotels.js';
const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    makeActiveForm();
  })

  .setView({
    lat: 35.6780754,
    lng: 139.7242175,
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
    lat: 35.6780754,
    lng: 139.7242175,
  },
  {
    draggable: true,
    icon:mainPinIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend',(evt)=> {
  address.value =Object.values(evt.target.getLatLng());
});

const markerGroup = L.layerGroup().addTo(map);


const commonMarker = ()=>{

  for(let i=0;i<getGenerationArray().length;i++){
    const lat = getGenerationArray()[i].location.lat;
    const lng = getGenerationArray()[i].location.lng;

    const similarMarker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon:similarPinIcon,
      },
    );
    similarMarker.addTo(markerGroup).bindPopup(getHotelListPopup()[i]);

  }
};

export {commonMarker};

