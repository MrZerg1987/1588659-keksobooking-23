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
  const advertBlock = popupTemplate.cloneNode(true);

  addElementTextContent(offer.title, advertBlock, '.popup__title');
  addElementTextContent(offer.address, advertBlock, '.popup__text--address');
  addElementAdditionalTextContent(offer.price, '₽/ночь', advertBlock, '.popup__text--price');
  addTypeElementTextContent(offer.type, advertBlock, '.popup__type');
  addCapacityElementTextContent(offer.rooms, offer.guests, advertBlock, '.popup__text--capacity');
  addTimeElementTextContent(offer.checkin, offer.checkout, advertBlock, '.popup__text--time');
  addListElementContent(offer.features, advertBlock, '.popup__features', createFeatureMarkup);
  addElementTextContent(offer.description, advertBlock, '.popup__description');
  addListElementContent(offer.photos, advertBlock, '.popup__photos', createImgMarkup);
  addElementSrc(author.avatar, advertBlock, '.popup__avatar');

  similarObjectsFragment.appendChild(advertBlock);

  return similarObjectsFragment;
};
