import "./index.css";
import image1 from "../images/Logo.svg";
import image2 from "../images/avatar.jpg";
import image3 from "../images/pencil_icon.svg";
import image4 from "../images/plus_icon.svg";

import {
  enableValidation,
  settings,
  resetValidation,
  toggleButtonState,
} from "../scripts/validation.js";

const image1El = document.querySelector("#image1");
image1El.src = image1;
image1El.alt = "Logo";
const image2El = document.querySelector("#image2");
image2El.src = image2;
image2El.alt = "Profile image";
const image3El = document.querySelector("#image3");
image3El.src = image3;
image3El.alt = "Edit button img";
const image4El = document.querySelector("#image4");
image4El.src = image4;
image4El.alt = "Plus icon";

const profileEditBtn = document.querySelector(`.profile__edit-btn`);
const profileEditModal = document.querySelector(`#edit-profile-modal`);
const profileCloseBtn = profileEditModal.querySelector(`.modal__close-btn`);

const profileAddBtn = document.querySelector(`.profile__add-btn`);
const newPostModal = document.querySelector(`#new-post-modal`);
const newPostCloseBtn = newPostModal.querySelector(`.modal__close-btn`);
const SaveButton = newPostModal.querySelector(`.modal__submit-btn`);

const profileName = document.querySelector(`.profile__name`);
const profileDescription = document.querySelector(`.profile__description`);

const profileNameInput = document.querySelector(`#profile-name-input`);
const profileDescriptionInput = document.querySelector(
  `#profile-description-input`
);

const profileModalForm = profileEditModal.querySelector(`.modal__form`);
const postModalForm = newPostModal.querySelector(`.modal__form`);
const inputList = Array.from(
  profileModalForm.querySelectorAll(settings.inputSelector)
);

const cardImgLink = newPostModal.querySelector(`#card-img-input`);
const cardCaptionInput = newPostModal.querySelector(`#card-caption-input`);

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const cardTemplate = document
  .querySelector(`#card-template`)
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function handleOverlayClick(evt) {
  if (
    evt.target.classList.contains("modal") &&
    evt.target.classList.contains("modal_is-opened")
  ) {
    closeModal(evt.target);
  }
}

function handleEscClose(evt) {
  const openedModal = document.querySelector(".modal_is-opened");
  if (evt.key === "Escape" && openedModal) {
    closeModal(openedModal);
  }
}

function openModal(modalElement) {
  modalElement.classList.add("modal_is-opened");
  modalElement.addEventListener("mousedown", handleOverlayClick);
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modalElement) {
  modalElement.classList.remove("modal_is-opened");
  modalElement.removeEventListener("mousedown", handleOverlayClick);
  document.removeEventListener("keydown", handleEscClose);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: cardCaptionInput.value,

    link: cardImgLink.value,
  };
  const newCardElement = getCardElement(newCardData);
  cardsList.prepend(newCardElement);
  closeModal(newPostModal);
  postModalForm.reset();
  toggleButtonState(inputList, SaveButton, settings);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImgEl = cardElement.querySelector(".card__image");
  const likeBtnEl = cardElement.querySelector(".card__like-button");

  likeBtnEl.addEventListener("click", function () {
    likeBtnEl.classList.toggle("card__like-button_active");
  });

  const deleteBtnEl = cardElement.querySelector(".card__delete-btn");
  deleteBtnEl.addEventListener("click", function () {
    deleteBtnEl.closest(".card").remove();
  });

  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  cardImgEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });
  previewModalCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
  });
  return cardElement;
}

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

profileModalForm.addEventListener(`submit`, handleProfileFormSubmit);
postModalForm.addEventListener(`submit`, handleNewPostFormSubmit);

profileEditBtn.addEventListener(`click`, function () {
  openModal(profileEditModal);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  resetValidation(profileModalForm, inputList, settings);
  toggleButtonState(
    Array.from(profileModalForm.querySelectorAll(settings.inputSelector)),
    profileModalForm.querySelector(settings.submitButtonSelector),
    settings
  );
});

profileCloseBtn.addEventListener(`click`, function () {
  closeModal(profileEditModal);
});
profileAddBtn.addEventListener("click", function () {
  postModalForm.reset(); // Clear previous input values
  const inputList = Array.from(
    postModalForm.querySelectorAll(settings.inputSelector)
  );
  resetValidation(postModalForm, inputList, settings);
  openModal(newPostModal);
});
newPostCloseBtn.addEventListener(`click`, function () {
  closeModal(newPostModal);
});

initialCards.forEach(function (card) {
  const cardElement = getCardElement(card);
  cardsList.append(cardElement);
});
enableValidation(settings);
