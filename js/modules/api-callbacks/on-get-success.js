import {setActivateFormState} from '../set-forms-state.js';
import {addMarkersGroup} from '../map/map.js';
import {filterAdverts} from '../filter/filter.js';

const filtersForm = document.querySelector('.map__filters');

export const onGetSuccess = (res) => {
  addMarkersGroup(filterAdverts(res));
  setActivateFormState(filtersForm);
};
