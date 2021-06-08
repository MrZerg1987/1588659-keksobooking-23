import {USERS, TYPES, TIME, PHOTOS, FEATURES} from './data.js';

// Функция, возвращающая рандомное положительное число.

const getRandomNumber = (from, to, roundTo = 0) => {
  const num = from + Math.random() * (to - from);
  return roundTo > 0 ? num.toFixed(roundTo) : Math.round(num);
};

// Функция, возвращающая рандомный элемент массива

const getRandomArrayElement = (elements) => elements[Math.round(Math.random() * (elements.length - 1))];

const createObj = () => {
  const lat = getRandomNumber(35.65000, 35.70000, 5);
  const lng = getRandomNumber(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/${getRandomArrayElement(USERS)}.png`,
    },
    offer: {
      title: 'Внимание! Горячее предложение! Успейте оформить заказ!',
      address: `${lat}, ${lng}`,
      price: `$${getRandomNumber(100, 1000)}`,
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features:  new Set (new Array(getRandomNumber(1, 6)).fill(null).map(() => getRandomArrayElement(FEATURES))),
      description: 'Самое лучшее предложение по мнению пользователей нашего сайта!',
      photos: new Set (new Array(getRandomNumber(1, 3)).fill(null).map(() => getRandomArrayElement(PHOTOS))),
    },
    location: {
      lat,
      lng,
    },
  };
};

export {createObj};
