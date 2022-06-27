function getRandomPositiveFloat (min,max, maxDigits = 0) {
  if (min > max || min < 0 || max <= 0) {
    return ('Задан неверный диапазон! Укажите другие числа.');
  }
  const digitsDegree = 10 ** maxDigits;
  return ~~((Math.random() * (max - min) + min) * digitsDegree) / digitsDegree;
}


function getRandomPositiveInteger (a, b) {

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
const getNewRandomArray = function (arrayNumber,arrayName)  {
  const newArray = [];
  const copyArray = arrayName.slice();
  shuffle(copyArray);
  for (let i = 0; i < arrayNumber; i++) {
    const options = arrayName[i];
    newArray.push(options);
  }
  return newArray;
};

export {getRandomPositiveInteger,getRandomPositiveFloat,getNewRandomArray};
