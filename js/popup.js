import {createSimilarObjects} from './create-similar-objects.js';

const HOUSING_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarObjects = createSimilarObjects();

const createFeatureMarkup = (elements) => {
  const markup =  elements.map((el) => `<li class="popup__feature popup__feature--${el}"></li>`).join('\n');
  return markup;
};

const createImgMarkup = (elements) => {
  const markup =  elements.map((el) => `<img src="${el}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('\n');
  return markup;
};

const renderElements = (elements, container, fn) => {
  container.insertAdjacentHTML('beforeend', fn(elements));
};

const addElementSrc = (value, element, selector) => {
  const currentElement = element.querySelector(selector);
  if(!value) {
    currentElement.remove();
    return;
  }
  currentElement.src = value;
};

const addElementTextContent = (value, element, selector) => {
  const currentElement = element.querySelector(selector);
  if(!value) {
    currentElement.remove();
    return;
  }
  currentElement.textContent = value;
};

const addElementAdditionalTextContent = (value, additionalValue, element, selector) => {
  const currentElement = element.querySelector(selector);
  if(!value) {
    currentElement.remove();
    return;
  }
  currentElement.textContent = `${value} ${additionalValue}`;
};

const addListElementContent = (value, element, selector, fn) => {
  const currentElement = element.querySelector(selector);
  if(!value && value.length) {
    currentElement.remove();
    return;
  }
  currentElement.innerHTML = '';
  renderElements(value, currentElement, fn);
};

const addTimeElementTextContent = (valueIn, valueOut, element, selector) => {
  const currentElement = element.querySelector(selector);
  const checkInText = valueIn ? `Заезд после ${valueIn}` : '';
  const checkOutText = valueOut ? `выезд до ${valueOut}` : '';
  const betweenText = ', ';
  const timeFullText = checkInText && checkOutText ? `${checkInText}${betweenText}${checkOutText}` : '';
  const timeFragmentText = checkInText || checkOutText ? `${checkInText}${checkOutText}` : '';
  const timeText = timeFullText || timeFragmentText;

  if(!timeText) {
    currentElement.remove();
    return;
  }
  currentElement.innerHTML = '';
  currentElement.textContent = timeText;
};

const addCapacityElementTextContent = (rooms, guests, element, selector) => {
  const currentElement = element.querySelector(selector);
  const roomsText = rooms ? `${rooms} комнаты ` : '';
  const guestsText = guests ? `для ${guests} гостей` : '';
  const capacityText = `${roomsText}${guestsText}`;

  if(!capacityText) {
    currentElement.remove();
    return;
  }
  currentElement.innerHTML = '';
  currentElement.textContent = capacityText;
};

const addTypeElementTextContent = (value, element, selector) => {
  const currentElement = element.querySelector(selector);
  if(!value || !HOUSING_TYPES[value]) {
    currentElement.remove();
    return;
  }
  currentElement.textContent = HOUSING_TYPES[value];
};

const createSimilarObjectsFragment = () => {
  const similarObjectsFragment = document.createDocumentFragment();

  similarObjects.forEach(({author, offer}) => {
    const advertElement = popupTemplate.cloneNode(true);

    addElementTextContent(offer.title, advertElement, '.popup__title');
    addElementTextContent(offer.address, advertElement, '.popup__text--address');
    addElementAdditionalTextContent(offer.price, '₽/ночь', advertElement, '.popup__text--price');
    addTypeElementTextContent(offer.type, advertElement, '.popup__type');
    addCapacityElementTextContent(offer.rooms, offer.guests, advertElement, '.popup__text--capacity');
    addTimeElementTextContent(offer.checkIn, offer.checkOut, advertElement, '.popup__text--time');
    addListElementContent(offer.features, advertElement, '.popup__features', createFeatureMarkup);
    addElementTextContent(offer.description, advertElement, '.popup__description');
    addListElementContent(offer.photos, advertElement, '.popup__photos', createImgMarkup);
    addElementSrc(author.avatar, advertElement, '.popup__avatar');

    similarObjectsFragment.appendChild(advertElement);
  });

  return similarObjectsFragment.childNodes[0];
};

export {createSimilarObjectsFragment};
