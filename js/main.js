import {getGenerationArray} from './data.js';
import { getHotelListPopup } from './hotels.js';
import {makeInactiveForm,makeActiveForm,setUserFormSubmit,setUserFormReset} from './form.js';
import { commonMarker } from './map.js';
import {getData} from './api.js';
import { createSlider } from './slider.js';
import {setErrorMarkMessage} from './util.js';

createSlider();
getData(commonMarker,setErrorMarkMessage);
setUserFormReset()
setUserFormSubmit();
