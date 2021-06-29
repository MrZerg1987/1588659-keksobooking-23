const HOUSING_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

export const createFeatureMarkup = (elements) => elements.map((el) => `<li class="popup__feature popup__feature--${el}"></li>`).join('\n');

export const createImgMarkup = (elements) => elements.map((el) => `<img src="${el}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('\n');

export const renderElements = (elements, container, fn) => {
  container.insertAdjacentHTML('beforeend', fn(elements));
};

export const addElementSrc = (value, element, selector) => {
  if(!value) {
    element.querySelector(selector).remove();
    return;
  }
  element.querySelector(selector).src = value;
};

export const addElementTextContent = (value, element, selector) => {
  if(!value) {
    element.querySelector(selector).remove();
    return;
  }
  element.querySelector(selector).textContent = value;
};

export const addElementAdditionalTextContent = (value, additionalValue, element, selector) => {
  if(!value) {
    element.querySelector(selector).remove();
    return;
  }
  element.querySelector(selector).textContent = `${value} ${additionalValue}`;
};

export const addListElementContent = (value, element, selector, fn) => {
  const currentElement = element.querySelector(selector);
  if(!value && value.length) {
    currentElement.remove();
    return;
  }
  currentElement.innerHTML = '';
  renderElements(value, currentElement, fn);
};

export const addTimeElementTextContent = (valueIn, valueOut, element, selector) => {
  const checkInText = valueIn ? `Заезд после ${valueIn}` : '';
  const checkOutText = valueOut ? `выезд до ${valueOut}` : '';
  const betweenText = ', ';
  const timeFullText = checkInText && checkOutText ? `${checkInText}${betweenText}${checkOutText}` : '';
  const timeFragmentText = checkInText || checkOutText ? `${checkInText}${checkOutText}` : '';
  const timeText = timeFullText || timeFragmentText;

  if(!timeText) {
    element.querySelector(selector).remove();
    return;
  }
  element.querySelector(selector).innerHTML = '';
  element.querySelector(selector).textContent = timeText;
};

export const addCapacityElementTextContent = (rooms, guests, element, selector) => {
  const roomsText = rooms ? `${rooms} комнаты ` : '';
  const guestsText = guests ? `для ${guests} гостей` : '';
  const capacityText = `${roomsText}${guestsText}`;

  if(!capacityText) {
    element.querySelector(selector).remove();
    return;
  }
  element.querySelector(selector).innerHTML = '';
  element.querySelector(selector).textContent = capacityText;
};

export const addTypeElementTextContent = (value, element, selector) => {
  if(!value || !HOUSING_TYPES[value]) {
    element.querySelector(selector).remove();
    return;
  }
  element.querySelector(selector).textContent = HOUSING_TYPES[value];
};
