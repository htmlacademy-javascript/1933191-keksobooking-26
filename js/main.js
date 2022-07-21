import {getGenerationArray} from './data.js';
import { getHotelListPopup } from './hotels.js';
import {makeInactiveForm,setUserFormSubmit,setUserFormReset} from './form.js';
import { setupMap } from './map.js';
import {getData} from './api.js';
import { createSlider } from './slider.js';
import {setErrorMarkMessage} from './util.js';

createSlider();
getData(setupMap,setErrorMarkMessage);
setUserFormReset()
setUserFormSubmit();
