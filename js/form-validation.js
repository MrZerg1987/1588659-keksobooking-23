const titleInput = document.querySelector('#title');
const housingTypeSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const roomQuantitySelect = document.querySelector('#room_number');
const guestQuantitySelect = document.querySelector('#capacity');
const guestQuantityOption = document.querySelectorAll('#capacity option');
const timeInSelect = document.querySelector('#timein');
const timeOutSelect = document.querySelector('#timeout');

const HOUSING_TYPES = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};

const RENT_ROOMS = {
  '1': {
    value: 1,
    items: [2],
  },
  '2': {
    value: 2,
    items: [2, 1],
  },
  '3': {
    value: 3,
    items: [2, 1, 0],
  },
  '100': {
    value: 0,
    items: [3],
  },
  'default': {
    value: 0,
    items: [3, 2, 1, 0],
  },
};

const titleInputHandler = ({target}) => {
  if (target.value.length < target.minLength) {
    target.setCustomValidity(`Ещё ${target.minLength - target.value.length } симв.`);
  } else if (target.value.length > target.maxLength) {
    target.setCustomValidity(`Удалите лишние ${target.value.length - target.maxLength} симв.`);
  } else {
    target.setCustomValidity('');
  }
  target.reportValidity();
};

const timeOutSelectHandler = ({target}) => {
  timeInSelect.value = target.value;
};

const timeInSelectHandler = ({target}) => {
  timeOutSelect.value = target.value;
};

const priceInputHandler = ({target}) => {
  if (target.validity.rangeOverflow) {
    target.setCustomValidity('Максимальное значение - 1 000 000');
  } else if (target.validity.valueMissing) {
    target.setCustomValidity('Обязательное поле');
  } else {
    target.setCustomValidity('');
  }
  target.reportValidity();
};

const changePriceInputState = (el) => {
  priceInput.min = HOUSING_TYPES[el.value];
  priceInput.placeholder = HOUSING_TYPES[el.value];
};

const housingTypeSelectHandler = ({target}) => {
  changePriceInputState(target);
  priceInput.setCustomValidity('Изменился диапазон допустимых цен');
  priceInput.reportValidity();
};

const changeRoomQuantityInputState = (el) => {
  if(!RENT_ROOMS[el.value]) {
    el.value = 'default';
  }
  guestQuantityOption.forEach((option) => {
    option.disabled = true;
  });
  RENT_ROOMS[el.value].items.forEach((item) => {
    guestQuantityOption[item].disabled = false;
  });
  guestQuantitySelect.value = RENT_ROOMS[el.value].value;
};

const roomQuantitySelectHandler = ({target}) => {
  changeRoomQuantityInputState(target);
  guestQuantitySelect.setCustomValidity('Изменились варианты размещения гостей');
  guestQuantitySelect.reportValidity();
};

export const initFormValidation = () => {
  changePriceInputState(housingTypeSelect);
  changeRoomQuantityInputState(roomQuantitySelect);
  titleInput.addEventListener('input', titleInputHandler);
  housingTypeSelect.addEventListener('change', housingTypeSelectHandler);
  priceInput.addEventListener('input', priceInputHandler);
  roomQuantitySelect.addEventListener('change', roomQuantitySelectHandler);
  timeInSelect.addEventListener('change', timeInSelectHandler);
  timeOutSelect.addEventListener('change', timeOutSelectHandler);
};
