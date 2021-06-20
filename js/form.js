const forms = document.querySelectorAll('form');
const elementsForm = document.querySelectorAll('form input, select, button, textarea');

const setElementDisableState = () => {
  elementsForm.forEach((item) => {
    item.disabled = true;
  });
};

const setElementEnableState = () => {
  elementsForm.forEach((item) => {
    item.disabled = false;
  });
};

const setDeactivatePageState = () => {
  forms.forEach((form) => {
    form.classList.add('disabled');
    setElementDisableState();
  });
};

const setActivatePageState = () => {
  forms.forEach((form) => {
    form.classList.remove('disabled');
    setElementEnableState();
  });
};

export {setDeactivatePageState, setActivatePageState};
