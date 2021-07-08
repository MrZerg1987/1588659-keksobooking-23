import {isEscEvent, renderElement} from '../../utils/utils.js';

const createErrorMarkup = (text, btnState) => `<div class="error">
                                                <p class="error__message">${text}</p>
                                                ${btnState ? '<button type="button" class="error__button">Попробовать снова</button>': ''}
                                              </div>`;


const ErrorBlockClickHandler = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.error')) {
    closeErrorBlock();
  }
};

const DocumentKeydownHandler = (evt) => {
  evt.preventDefault();
  if (isEscEvent(evt)) {
    closeErrorBlock();
  }
};

const addListeners = () => {
  document.addEventListener('click', ErrorBlockClickHandler);
  document.addEventListener('keydown', DocumentKeydownHandler);
};

function closeErrorBlock () {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', DocumentKeydownHandler);
  document.removeEventListener('click', ErrorBlockClickHandler);
}

export const onGetError = () => {
  renderElement(createErrorMarkup('При загрузке данных произошла ошибка!'), document.body);
  addListeners();
};

export const onSendError = () => {
  renderElement(createErrorMarkup('Ошибка размещения объявления', true), document.body);
  addListeners();
};
