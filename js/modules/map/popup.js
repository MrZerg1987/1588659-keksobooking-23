import {
  addElementTextContent,
  addElementAdditionalTextContent,
  addTypeElementTextContent,
  addCapacityElementTextContent,
  addTimeElementTextContent,
  addListElementContent,
  addElementSrc
} from './popup-helper.js';


const createFeatureMarkup = (elements) => elements.map((el) => `<li class="popup__feature popup__feature--${el}"></li>`).join('\n');

const createImgMarkup = (elements) => elements.map((el) => `<img src="${el}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('\n');

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

export const createSimilarObjectsFragment = ({author, offer}) => {
  const similarObjectsFragment = document.createDocumentFragment();
  const advertElement = popupTemplate.cloneNode(true);

  addElementTextContent(offer.title, advertElement, '.popup__title');
  addElementTextContent(offer.address, advertElement, '.popup__text--address');
  addElementAdditionalTextContent(offer.price, '₽/ночь', advertElement, '.popup__text--price');
  addTypeElementTextContent(offer.type, advertElement, '.popup__type');
  addCapacityElementTextContent(offer.rooms, offer.guests, advertElement, '.popup__text--capacity');
  addTimeElementTextContent(offer.checkin, offer.checkout, advertElement, '.popup__text--time');
  addListElementContent(offer.features, advertElement, '.popup__features', createFeatureMarkup);
  addElementTextContent(offer.description, advertElement, '.popup__description');
  addListElementContent(offer.photos, advertElement, '.popup__photos', createImgMarkup);
  addElementSrc(author.avatar, advertElement, '.popup__avatar');

  similarObjectsFragment.appendChild(advertElement);

  return similarObjectsFragment;
};
