import {setActivatePageState} from './form-activation.js';
import {createSimilarObjectsFragment} from './popup.js';
import {createSimilarObjects} from './create-similar-objects.js';
const addressInput = document.querySelector('#address');
const similarObjects = createSimilarObjects();
const mapInteractive = L.map('map-canvas');

const addMarkersGroup = (arr) => {
  const markups = createSimilarObjectsFragment(arr);
  const markerGroup = L.layerGroup().addTo(mapInteractive);
  arr.forEach((el, index) => {
    const lat = el.location.lat;
    const lng = el.location.lng;
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

    marker.addTo(markerGroup).bindPopup(markups.childNodes[index], {
      keepInView: true,
    });
  });
};

export const initMap = () => {
  mapInteractive.on('load', setActivatePageState)
    .setView(
      {
        lat: 35.6895,
        lng: 139.69171,
      },
      12,
    );

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapInteractive);

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
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

  addressInput.value = `Координаты объекта: ${mainPinMarker.getLatLng().lat.toFixed(5)}, ${mainPinMarker.getLatLng().lng.toFixed(5)}`;

  mainPinMarker.addTo(mapInteractive).on('move', () => {
    addressInput.value = `Координаты объекта: ${mainPinMarker.getLatLng().lat.toFixed(5)}, ${mainPinMarker.getLatLng().lng.toFixed(5)}`;
  });
  addMarkersGroup(similarObjects);
};
