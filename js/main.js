import {getGenerationArray} from './data.js';
import { getHotelListPopup } from './hotels.js';
import {makeInactiveForm,makeActiveForm,setUserFormSubmit} from './form.js';
import { commonMarker } from './map.js';
import {getData} from './api.js'
import { createSlider } from './slider.js';

createSlider();
getData(commonMarker);
setUserFormSubmit();
