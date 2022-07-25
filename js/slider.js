const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');

const createSlider= () =>{
  noUiSlider.create(sliderElement,{
    range: {
      min: 0,
      max: 100000,
    },
    start: 1000,
    step:1,
    format:{
      to: function(value){
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
      },
      from: function(value){
        return parseFloat(value);
      }
    },
  });
  sliderElement.noUiSlider.on('slide',()=>{
    valueElement.value= sliderElement.noUiSlider.get();
  });
};
export {createSlider};

