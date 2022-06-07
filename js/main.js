// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
//  Будет использоваться для генерации временных географических координат в следующем задании.
//  Пример использования функции:

function getRandom (min,max, maxDigits = 0) {
  if (min > max || min < 0 || max <= 0) {
    return ('Задан неверный диапазон! Укажите другие числа.');
  }

  const digitsDegree = 10 ** maxDigits;
  return ~~((Math.random() * (max - min) + min) * digitsDegree) / digitsDegree;
}

getRandom(11, 101, 7);
