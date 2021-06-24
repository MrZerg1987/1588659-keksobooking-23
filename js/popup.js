import {createSimilarObjects} from './create-similar-objects.js';
import {setDeactivatePageState, setActivatePageState, addressInput} from './form.js';
import {getRandomNumber} from './utils.js';

const HOUSING_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const mapCanvas = document.querySelector('#map-canvas');
const mapInteractive = L.map('map-canvas');
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarObjectsFragment = document.createDocumentFragment();
const similarObjects = createSimilarObjects();

const createFeatureMarkup = (el) => `<li class="popup__feature popup__feature--${el}"></li>`;

const createImgMarkup = (src) => `<img src="${src}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;

const renderElements = (container, elements, fn) => {
  elements.forEach((el) => {
    container.insertAdjacentHTML('beforeend', fn(el));
  });
};

similarObjects.forEach(({author, offer}) => {
  const element = popupTemplate.cloneNode(true);
  const popupTitle = element.querySelector('.popup__title');
  const popupAddress = element.querySelector('.popup__text--address');
  const popupPrice = element.querySelector('.popup__text--price');
  const popupType = element.querySelector('.popup__type');
  const popupCapacity = element.querySelector('.popup__text--capacity');
  const popupTime = element.querySelector('.popup__text--time');
  const popupFeatures = element.querySelector('.popup__features');
  const popupDescription = element.querySelector('.popup__description');
  const popupPhotos = element.querySelector('.popup__photos');
  const popupAvatar = element.querySelector('.popup__avatar');
  const roomsText = offer.rooms ? `${offer.rooms} комнаты ` : '';
  const guestsText = offer.guests ? `для ${offer.guests} гостей` : '';
  const capacityText = `${roomsText}${guestsText}`;

  const checkinText = offer.checkin ? `Заезд после ${offer.checkin}` : '';
  const checkoutText = offer.checkout ? `выезд до ${offer.checkout}` : '';
  const betweenText = ', ';
  const timeFullText = checkinText && checkoutText ? `${checkinText}${betweenText}${checkoutText}` : '';
  const timeFragmentText = checkinText || checkoutText ? `${checkinText}${checkoutText}` : '';
  const timeText = timeFullText || timeFragmentText;

  popupPhotos.innerHTML = '';
  popupFeatures.innerHTML = '';

  offer.title ? popupTitle.textContent = offer.title : popupTitle.remove();
  offer.address ? popupAddress.textContent = offer.address : popupAddress.remove();
  offer.price ? popupPrice.textContent = `${offer.price} ₽/ночь` : popupPrice.remove();
  offer.type ? popupType.textContent = HOUSING_TYPES[offer.type] : popupType.remove();
  capacityText ? popupCapacity.textContent = capacityText : popupCapacity.remove();
  timeText ? popupTime.textContent = timeText : popupTime.remove();

  offer.features && offer.features.length ? renderElements(popupFeatures, offer.features, createFeatureMarkup) : popupFeatures.remove();
  offer.description ? popupDescription.textContent = offer.description : popupDescription.remove();
  offer.photos && offer.photos.length ? renderElements(popupPhotos, offer.photos, createImgMarkup) : popupPhotos.remove();
  author.avatar ? popupAvatar.src = author.avatar : popupAvatar.remove();

  similarObjectsFragment.appendChild(element);
});

// Добавление интерактивной карты на страницу

setDeactivatePageState();

const onMapLoad = () => {
  setActivatePageState();
};

mapInteractive
  .on('load', onMapLoad)
  .setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapInteractive);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const createLocation = () => {
  const lat = getRandomNumber(35.65000, 35.70000, 5);
  const lng = getRandomNumber(139.70000, 139.80000, 5);

  return {
    lat,
    lng,
  };
};

const createSimilarMarkerGroup = () => new Array(10).fill(null).map(() => createLocation());

const markerGroup = L.layerGroup().addTo(mapInteractive);

createSimilarMarkerGroup().forEach(({lat, lng}) => {
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      draggable: true,
      icon,
    },
  );

  marker.addTo(markerGroup)
    .bindPopup(similarObjectsFragment.childNodes[0],
      {
        keepInView: true,
      },
    );
  marker.on('moveend', (evt) => {
    addressInput.value = (evt.target.getLatLng());
  });
});

const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker
  .addTo(mapInteractive)
  .on('moveend', (evt) => {
    addressInput.value = (evt.target.getLatLng());
  });

export {mapCanvas, similarObjectsFragment};
