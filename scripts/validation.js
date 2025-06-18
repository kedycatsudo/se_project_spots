const hasInvalidInput = (inputList) => {
  const InputListValidity = inputList.some((input) => {
    if (!input.validity.valid) {
      return true;
    } else {
      return false;
    }
  });
  if (InputListValidity) {
    return true;
  } else {
    return false;
  }
};
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};
function resetValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  inputList.forEach((inputElement) => {
    // Remove error class from input
    inputElement.classList.remove(config.inputErrorClass);
    // Hide error message
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(config.errorClass);
    }
  });

  // Update submit button state
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
}
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn-disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const showInputError = (formEl, inputEl, errorMsg, config) => {
  const errorMsgID = inputEl.id + "-error";
  const errorMsgEl = formEl.querySelector("#" + errorMsgID);
  errorMsgEl.textContent = errorMsg;
  errorMsgEl.classList.add(config.errorClass);

  inputEl.classList.add(config.inputErrorClass);
};
const hideInputError = (formEl, inputEl, config) => {
  const errorMsgID = inputEl.id + "-error";
  const errorMsgEl = formEl.querySelector("#" + errorMsgID);
  inputEl.classList.remove(config.inputErrorClass);

  errorMsgEl.textContent = "";
};

const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  hasInvalidInput(inputList);
  const disabledButton = (buttonElement, config) => {
    buttonElement.disabled = true;
  };

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formel) => {
    setEventListeners(formel, config);
  });
};

enableValidation(settings);
