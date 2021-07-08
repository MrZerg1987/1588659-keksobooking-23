import {setActivateFormState} from '../set-forms-state.js';
import {initFormValidation, changePriceInputState, changeRoomQuantityInputState} from './form-validation.js';
import {sendData} from '../api/api-service.js';
import {onSendSuccess} from '../api-callbacks/on-send-success.js';
import {onSendError} from '../api-callbacks/on-error-action.js';
import {setPinMarkerStartState} from '../map/map.js';
import {clearImgBlocks, addChooserInputsListeners} from '../ad-form/load-photo.js';

const addForm = document.querySelector('.ad-form');
const filter = document.querySelector('.map__filters');
const filterItems = filter.querySelectorAll('select');
const featuresItems = filter.querySelectorAll('input');

const AddFormSubmitHandler = (evt) => {
  evt.preventDefault();
  sendData(onSendSuccess, onSendError, new FormData(evt.target));
};

export const resetFilter = () => {
  filterItems.forEach((it) => it.value = 'any');
  featuresItems.forEach((feature) => feature.checked = false);
};

export const resetAddForm  = () => {
  setPinMarkerStartState();
  changePriceInputState();
  changeRoomQuantityInputState();
  clearImgBlocks();
};

const AddFormResetHandler  = () => {
  setTimeout(() => {
    resetAddForm();
    resetFilter();
  });
};

export const activateAdForm = () => {
  setActivateFormState(addForm);
  initFormValidation();
  addChooserInputsListeners();
  addForm.addEventListener('submit', AddFormSubmitHandler);
  addForm.addEventListener('reset', AddFormResetHandler);
};
