// Функция, возвращающая рандомное положительное число.

const getRandomNumber = (from, to, roundTo = 0) => {
  const num = from + Math.random() * (to - from);
  return roundTo > 0 ? num.toFixed(roundTo) : Math.round(num);
};

// Функция, возвращающая рандомный элемент массива

const getRandomArrayElement = (elements) => elements[Math.round(Math.random() * (elements.length - 1))];

const USERS = [
  'user01',
  'user02',
  'user03',
  'user04',
  'user05',
  'user06',
  'user07',
  'user08',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];


const OBJECT_COUNT = 10;

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

const createSimilarObjects = () => new Array(OBJECT_COUNT).fill(null).map(() => createObj());
createSimilarObjects();
