function showInputError(configObject, formElement, inputElement,errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configObject.inputErrorClass);
  errorElement.classList.add(configObject.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(configObject, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configObject.inputErrorClass);
  errorElement.classList.remove(configObject.errorClass);
}

function isValid(configObject, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(configObject, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(configObject, formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

function setEventListener(configObject, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(configObject.inputSelector));
  const buttonElement = formElement.querySelector(configObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(configObject, formElement, inputElement)
      toggleButtonState(inputList, buttonElement);
    })
  });
};

export function enableValidation(configObject) {
  const formList = document.querySelectorAll(configObject.formSelector);
  Array.from(formList).forEach((formObject) => {
    setEventListener(configObject, formObject);
  });

};


