const validationConfig = {
  formSelector: ".popup__input-container",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__item_type_error",
  inputErrorActiveClass: "popup__item-error_active",
};

const showInputError = (formElement, inputElement, errorMessage, confObj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(confObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(confObj.inputErrorActiveClass);
};

const hideInputError = (formElement, inputElement, confObj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(confObj.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(confObj.inputErrorActiveClass);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) =>{
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

const checkInputValidity = (formElement, inputElement, confObj) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, confObj);
  } else {
    hideInputError(formElement, inputElement, confObj);
  }
  };

  const cleanValidationErrors = (formElement, confObj) => {
    const inputList = Array.from(formElement.querySelectorAll(confObj.inputSelector));
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, confObj);
    })
   };

   const setEventListeners = (formElement, confObj) => {
    const inputList = Array.from(formElement.querySelectorAll(confObj.inputSelector));
    const buttonElement = formElement.querySelector(confObj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, confObj);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const enableValidation = (confObj) => {
    const formList = Array.from(document.querySelectorAll(confObj.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, confObj);
    });
  };

  export { enableValidation, cleanValidationErrors, validationConfig };
