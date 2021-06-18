import {createObj} from './create-similar-objects.js';


const list = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content;
const popupTemplate = cardTemplate.querySelector('.popup');

const createNewCard = () => {
  const newCard = popupTemplate.cloneNode(true);
  const popupTitle = newCard.querySelector('.popup__title');
  popupTitle.textContent = createObj.offer.title;
  const popupAddress = newCard.querySelector('.popup__text--address');
  popupAddress.textContent = createObj.offer.address;
  const popupPrice = newCard.querySelector('.popup__text--price');
  popupPrice.textContent = `${createObj.offer.price} ₽/ночь`;
  const popupType = newCard.querySelector('.popup__type');
  popupType.textContent = createObj.offer.type;
  const popupCapacity = newCard.querySelector('.popup__text--capacity');
  popupCapacity.textContent = `${createObj.offer.rooms} комнаты для ${createObj.offer.guests} гостей`;
  const popupTime = newCard.querySelector('.popup__text--time');
  popupTime.textContent = `Заезд после ${createObj.offer.checkin}, выезд до ${createObj.offer.checkout}`;
  const popupFeatures = newCard.querySelector('.popup__features');
  popupFeatures.textContent = createObj.offer.features;
  const popupDescription = newCard.querySelector('.popup__description');
  popupDescription.textContent = createObj.offer.description;
  const popupPhotos = newCard.querySelector('.popup__photos');
  popupPhotos.src = createObj.offer.photos;
  const popupAvatar = newCard.querySelector('.popup__avatar');
  popupAvatar.src = createObj.author.avatar;
  list.appendChild(newCard);
};

export {createNewCard};
