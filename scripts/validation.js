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
  inputEl.classList.add(config.inputErrorClass);
};
const hideInputError = (formEl, inputEl, config) => {
  const errorMsgID = inputEl.id + "-error";
  const errorMsgEl = formEl.querySelector("#" + errorMsgID);
  inputEl.classList.remove(config.inputErrorClass);

  errorMsgEl.textContent = "";
};

const checkInputValidity = (formEl, inputEl, config) => {
  console.log(inputEl.validationMessage);
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

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
  const disabledButton = (buttonElement, config) => {
    buttonElement.disabled = true;
  };
  const toggleButtonState = (inputList, buttonElement, config) => {
    console.log(hasInvalidInput(inputList));
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
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
