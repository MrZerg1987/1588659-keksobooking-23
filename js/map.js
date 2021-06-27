
import {setDeactivatePageState, setActivatePageState} from './form-activation.js';
import {setAddressInput} from './form-validation.js';
import {getRandomNumber} from './utils.js';
import {createSimilarObjectsFragment} from './popup.js';

const createPointsLocation = () => {
  const lat = getRandomNumber(35.65000, 35.70000, 5);
  const lng = getRandomNumber(139.70000, 139.80000, 5);

  return {
    lat,
    lng,
  };
};

const createSimilarMarkerGroup = () => new Array(10).fill(null).map(() => createPointsLocation());

setDeactivatePageState();

// Создаем карту

const mapInteractive = L.map('map-canvas');

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

// Создаем главную метку

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Создаем группу меток,

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
      icon,
    },
  );

  marker.addTo(markerGroup)
    .bindPopup(createSimilarObjectsFragment(),
      {
        keepInView: true,
      },
    );
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
    setAddressInput().value = (evt.target.getLatLng());
  });

export {onMapLoad};
