// Функция, возвращающая целое положительное число.

const getIntegerNumber = function(from, to) {
  const num = Math.random() * to;
  if (from >= 0 && from < to && num >= from) {
    return Math.round(num);
  }
  return 'Заданы неверные параметры или результат не соответствует заданным параметрам';
};

getIntegerNumber(1, 100);

// Функция, возвращающая дробное положительное число с плавающей запятой.

const getFractionalNumber = function(from, to, roundTo) {
  const num = Math.random() * to;
  if (from >= 0 && from < to && num >= from) {
    return num.toFixed(roundTo);
  }
  return 'Заданы неверные параметры или результат не соответствует заданным параметрам';
};

getFractionalNumber(1, 50, 3);
