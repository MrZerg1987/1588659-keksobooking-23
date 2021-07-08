import {createSimilarObjectsFragment} from './popup.js';
import {getData} from '../api/api-service.js';
import {onGetSuccess} from '../api-callbacks/on-get-success.js';
import {onGetError} from '../api-callbacks/on-error-action.js';
import {activateAdForm} from '../ad-form/activate-ad-form.js';
import {filterAdverts} from '../filter/filter.js';

const ADVERT_COUNTER = 10;
const CITY_CENTER = {
  lat: 35.6895,
  lng: 139.69171,
};

const addressInput = document.querySelector('#address');
const mapInteractive = L.map('map-canvas');
let mainPinMarker;
let markerGroup;

export const removeMarkerGroup = () => {
  for (const layer in markerGroup._layers) {
    mapInteractive.removeLayer(markerGroup._layers[layer]);
  }
};

export const setPinMarkerStartState = () => {
  mainPinMarker.setLatLng(CITY_CENTER);
  mapInteractive.setView(CITY_CENTER, 12);
};

export const addMarkersGroup = (arr) => {
  markerGroup = L.layerGroup().addTo(mapInteractive);
  arr
    .slice()
    .filter(filterAdverts)
    .slice(0, ADVERT_COUNTER)
    .forEach((el) => {
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

      marker.addTo(markerGroup).bindPopup(createSimilarObjectsFragment(el), {
        keepInView: true,
      });
    });
};

export const initMap = () => {
  mapInteractive
    .on('load', () => {
      activateAdForm();
      getData(onGetSuccess, onGetError);
    })
    .setView(CITY_CENTER, 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapInteractive);

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  mainPinMarker = L.marker(
    CITY_CENTER,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  addressInput.value = `LatLng(${mainPinMarker.getLatLng().lat.toFixed(5)}, ${mainPinMarker.getLatLng().lng.toFixed(5)})`;

  mainPinMarker.addTo(mapInteractive).on('move', () => {
    addressInput.value = `LatLng(${mainPinMarker.getLatLng().lat.toFixed(5)}, ${mainPinMarker.getLatLng().lng.toFixed(5)})`;
  });
};
