const blockAdForm = document.querySelector('.ad-form');
const blockAdFormFieldset = blockAdForm.querySelectorAll('fieldset');
const blockMapFilters = document.querySelector('.map__filters');
const blockMapFiltersFieldset = blockMapFilters.querySelectorAll('fieldset');


const makeDeactivatePage = () => {
  blockAdForm.classList.add('ad-form--disabled');
  blockAdFormFieldset.forEach((item) => {
    item.setAttribute('disabled', 'disabled');
  });
  blockMapFilters.classList.add('ad-form--disabled');
  blockMapFiltersFieldset.forEach((item) => {
    item.setAttribute('disabled', 'disabled');
  });
};

const makeActivatePage = () => {
  blockAdForm.classList.remove('ad-form--disabled');
  blockAdFormFieldset.forEach((item) => {
    item.removeAttribute('disabled', 'disabled');
  });
  blockMapFilters.classList.remove('ad-form--disabled');
  blockMapFiltersFieldset.forEach((item) => {
    item.removeAttribute('disabled', 'disabled');
  });
};

export {makeDeactivatePage, makeActivatePage};
