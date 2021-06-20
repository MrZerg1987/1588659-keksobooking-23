// Функция, возвращающая рандомное положительное число.

const getRandomNumber = (from, to, roundTo = 0) => {
  const num = from + Math.random() * (to - from);
  return roundTo > 0 ? num.toFixed(roundTo) : Math.round(num);
};

// Функция, возвращающая рандомный элемент массива

const getRandomArrayElement = (elements) => elements[Math.round(Math.random() * (elements.length - 1))];

// Функция, проверяющая нажатую клавишу 'Esc'

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {getRandomNumber, getRandomArrayElement, isEscEvent};

