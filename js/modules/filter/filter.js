import {removeMarkerGroup} from '../map/map.js';

const filterForm = document.querySelector('.map__filters');
const housingTypeFilter = filterForm.querySelector('#housing-type');
const housingPriceFilter = filterForm.querySelector('#housing-price');
const roomsQuantityFilter = filterForm.querySelector('#housing-rooms');
const guestsQuantityFilter = filterForm.querySelector('#housing-guests');
const featuresFilter = filterForm.querySelector('#housing-features');
const PriceTypes = {
  'low': 10000,
  'high': 50000,
};
const FILTERING_DELAY = 500;

const getFilterByHousingType = (type) =>
  (housingTypeFilter.value !== 'any') ? type === housingTypeFilter.value : true;

const getFilterByHousingPrice = (price) => {
  switch (housingPriceFilter.value) {
    case 'low':
      return price < PriceTypes['low'];
    case 'middle':
      return price >= PriceTypes['low'] && price <= PriceTypes['high'];
    case 'high':
      return price > PriceTypes['high'];
    default:
      return true;
  }
};

const getFilterByRooms = (rooms) =>
  roomsQuantityFilter.value === 'any' || rooms === parseInt(roomsQuantityFilter.value, 10);

const getFilterByGuests = (guests) =>
  (guestsQuantityFilter.value !== 'any') ? guests === parseInt(guestsQuantityFilter.value, 10) : true;

const getFilterByFeatures = (features) => {
  if (features) {
    const selectedFeatures = featuresFilter.querySelectorAll('input:checked');
    return Array.from(selectedFeatures).every((element) => features.includes(element.value));
  }
  return false;
};

export const filterAdverts = ({offer}) =>
  getFilterByRooms(offer.rooms) &&
  getFilterByGuests(offer.guests) &&
  getFilterByHousingType(offer.type) &&
  getFilterByHousingPrice(offer.price) &&
  getFilterByFeatures(offer.features);

export const setResRanking = (res) =>
  res
    .reduce((acc, item) => {
      const rank = item.offer.features && item.offer.features.length ? item.offer.features.length : 0;
      item.rank = rank;
      acc.push(item);
      return acc;
    }, [])
    .sort((a, b) => b.rank - a.rank);

export const setFilterFormChange = (cb) => {
  filterForm.addEventListener('change', () => {
    setTimeout(() => {
      removeMarkerGroup();
      cb();
    }, FILTERING_DELAY);
  });
};
