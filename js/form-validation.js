const titleInput = document.querySelector('#title');
const housingTypeSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const roomQuantitySelect = document.querySelector('#room_number');
const guestQuantitySelect = document.querySelector('#capacity');
const guestQuantityOption = document.querySelectorAll('#capacity option');
const addressInput = document.querySelector('#address');
const timeInSelect = document.querySelector('#timein');
const timeOutSelect = document.querySelector('#timeout');

const setAddressInput = () => addressInput;

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

const titleInputHandler = () => {
  const valueLength = titleInput.value.length;
  if (valueLength < titleInput.minLength) {
    titleInput.setCustomValidity(`Ещё ${titleInput.minLength - valueLength } симв.`);
  } else if (valueLength > titleInput.maxLength) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - titleInput.maxLength} симв.`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
};

const timeOutSelectHandler = ({target}) => {
  timeInSelect.value = target.value;
};

const timeInSelectHandler = ({target}) => {
  timeOutSelect.value = target.value;
};

const priceInputHandler = () => {
  if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity('Максимальное значение - 1 000 000');
  } else if (titleInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле');
  } else {
    priceInput.setCustomValidity('');
  }
};

const housingTypeSelectHandler = ({target}) => {
  priceInput.min = HOUSING_TYPES[target.value];
  priceInput.placeholder = HOUSING_TYPES[target.value];
};

const roomQuantitySelectHandler = ({target}) => {
  let inputValue = target.value;
  if(!RENT_ROOMS[inputValue]) {
    inputValue = 'default';
  }
  guestQuantityOption.forEach((option) => {
    option.disabled = true;
  });
  RENT_ROOMS[inputValue].items.forEach((item) => {
    guestQuantityOption[item].disabled = false;
  });
  guestQuantitySelect.value = RENT_ROOMS[inputValue].value;
};

titleInput.addEventListener('input', titleInputHandler);
housingTypeSelect.addEventListener('change', housingTypeSelectHandler);
priceInput.addEventListener('invalid', priceInputHandler);
roomQuantitySelect.addEventListener('change', roomQuantitySelectHandler);
timeInSelect.addEventListener('change', timeInSelectHandler);
timeOutSelect.addEventListener('change', timeOutSelectHandler);

export {setAddressInput};
