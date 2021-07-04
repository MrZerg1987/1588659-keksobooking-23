import {setActivateFormState} from '../set-forms-state.js';
import {initFormValidation} from './form-validation.js';
import {sendData} from '../api/api-service.js';
import {onSendSuccess} from '../api-callbacks/on-send-success.js';
import {onSendError} from '../api-callbacks/on-error-action.js';

const addForm = document.querySelector('.ad-form');

const onAddFormSubmit = (evt) => {
  evt.preventDefault();
  sendData(onSendSuccess, onSendError, new FormData(evt.target));
};

export const activateAdForm = () => {
  setActivateFormState(addForm);
  initFormValidation();
  addForm.addEventListener('submit', onAddFormSubmit);
};
