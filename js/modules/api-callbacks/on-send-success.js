import {isEscEvent, renderElement} from '../../utils/utils.js';
import {setPinMarkerStartState} from '../map/map.js';
import {resetAddForm} from '../ad-form/activate-ad-form.js';

const forms = document.querySelectorAll('form');

const createSuccessMarkup = () => `<div class="success">
                                    <p class="success__message">Ваше объявление<br>успешно размещено!</p>
                                  </div>`;

const SuccessBlockClickHandler = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.success')) {
    closeSuccessBlock();
  }
};

const DocumentKeydownHandler = (evt) => {
  evt.preventDefault();
  if (isEscEvent(evt)) {
    closeSuccessBlock();
  }
};

const addListeners = () => {
  document.addEventListener('click', SuccessBlockClickHandler);
  document.addEventListener('keydown', DocumentKeydownHandler);
};

function closeSuccessBlock() {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', DocumentKeydownHandler);
  document.removeEventListener('click', SuccessBlockClickHandler);
}

export const onSendSuccess = () => {
  renderElement(createSuccessMarkup(), document.body);
  addListeners();
  forms.forEach((form) => form.reset());
  resetAddForm();
  setPinMarkerStartState();
};
