// Функция, возвращающая рандомное положительное число.

const getRandomNumber = function(from, to, roundTo = 0) {
  const num = from + Math.random() * (to - from);
  if (from >= 0 && from < to) {
    return roundTo > 0 ? num.toFixed(roundTo) : Math.round(num);
  }
  return 'Заданы неверные параметры';
};

getRandomNumber(0, 3, 2);
