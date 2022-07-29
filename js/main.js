import {setUserFormSubmit} from './form.js';
import { setupMap,mapFilterDelayUpdate } from './map.js';
import {getData} from './api.js';
import { createSlider } from './slider.js';
import {setErrorMarkMessage} from './util.js';
import './avatar.js';

createSlider();
getData(setupMap,setErrorMarkMessage);
mapFilterDelayUpdate();
setUserFormSubmit();
