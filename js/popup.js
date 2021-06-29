import {
  createFeatureMarkup,
  createImgMarkup,
  addElementTextContent,
  addElementAdditionalTextContent,
  addTypeElementTextContent,
  addCapacityElementTextContent,
  addTimeElementTextContent,
  addListElementContent,
  addElementSrc
} from './popup-helper.js';

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const createSimilarObjectsFragment = (elements) => {
  const similarObjectsFragment = document.createDocumentFragment();

  elements.forEach(({author, offer}) => {
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

  return similarObjectsFragment;
};

export {createSimilarObjectsFragment};
