/*IMPORT*/
import "./index.css";
import image1 from "../images/Logo.svg";
import image3 from "../images/pencil_icon.svg";
import image4 from "../images/plus_icon.svg";
import profile__pencil from "../images/pecil_light_icon.svg";
import Api from "../utils/Api.js";
import {
  enableValidation,
  settings,
  resetValidation,
  toggleButtonState,
} from "../scripts/validation.js";
import { setButtonText } from "../utils/helper.js";
/*CONTS FOR IMAGES TO SHOW ON WEBSITE*/
const image1El = document.querySelector("#image1");
image1El.src = image1;
image1El.alt = "Logo";
const image2El = document.querySelector("#image2");

const image3El = document.querySelector("#image3");
image3El.src = image3;
image3El.alt = "Edit button img";
const image4El = document.querySelector("#image4");
image4El.src = image4;
image4El.alt = "Plus icon";
//CARD ID LET
let selectedCard, selectedCardId;

//AVATAR IMAGES ELEMENTS
const profilePencilEl = document.querySelector("#profile__pencil");
profilePencilEl.src = profile__pencil;
const imageModal = document.querySelector(`#img-modal`);
const avatarEditForm = imageModal.querySelector("#profile-img-form");
const imageCloseBtn = imageModal.querySelector(".modal__close-btn");
const imageForm = imageModal.querySelector(".modal__form");
const imageInput = imageForm.querySelector("#profile-img-input");
const profileImageBtn = document.querySelector(".profile__img-btn");

//PROFILE INFO EDIT ELEMENTS
const profileEditBtn = document.querySelector(`.profile__edit-btn`);
const profileEditModal = document.querySelector(`#edit-profile-modal`);
const profileCloseBtn = profileEditModal.querySelector(`.modal__close-btn`);
const profileAddBtn = document.querySelector(`.profile__add-btn`);
const profileName = document.querySelector(`.profile__name`);
const profileDescription = document.querySelector(`.profile__description`);

const profileModalForm = profileEditModal.querySelector(`.modal__form`);

//POST CARD ELEMENTS
const newPostModal = document.querySelector(`#new-post-modal`);

const postModalForm = newPostModal.querySelector(`.modal__form`);
const newPostCloseBtn = newPostModal.querySelector(`.modal__close-btn`);
const SaveButton = newPostModal.querySelector(`.modal__submit-btn`);
const cardImgLink = newPostModal.querySelector(`#card-img-input`);
const cardCaptionInput = newPostModal.querySelector(`#card-caption-input`);
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");
const cardFragment = cardTemplate.content.cloneNode(true);
const cardElement = cardFragment.querySelector(".card");

//DELETION ELEMENTS
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__delete-form");
const cancelDeleteBtn = deleteModal.querySelector(".modal__submit-btn-cancel");

//PREVIEW ELEMENTS
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const inputList = Array.from(
  profileModalForm.querySelectorAll(settings.inputSelector)
);
const profileNameInput = document.querySelector(`#profile-name-input`);
const profileDescriptionInput = document.querySelector(
  `#profile-description-input`
);
//FUNCTIONS
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
  const submitter = evt.submitter;

  setButtonText(submitter, true, "Saving...", "Save");
  api
    .editUserInfo({
      name: profileNameInput.value,
      about: profileDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profileEditModal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonText(submitter, false, "Saving...", "Save");
    });
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  const submitter = evt.submitter;

  setButtonText(submitter, true, "Saving...", "Save");
  const newCardData = {
    name: cardCaptionInput.value,

    link: cardImgLink.value,
  };
  api
    .postCard(newCardData)
    .then((card) => {
      const newCardElement = getCardElement(card);
      cardsList.prepend(newCardElement);
      closeModal(newPostModal);
      postModalForm.reset();
      toggleButtonState(inputList, SaveButton, settings);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonText(submitter, false, "Saving...", "Save");
    });
}
function handleProfileImageSubmit(evt) {
  console.log(`asdsad`);
  evt.preventDefault();
  const submitter = evt.submitter;

  setButtonText(submitter, true, "Saving...", "Save");

  api
    .editAvatarInfo(imageInput.value)
    .then((data) => {
      debugger;
      image2El.src = data.avatar;

      imageForm.reset();
      submitter.disabled = true;
      closeModal(imageModal);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setButtonText(submitter, false, "Saving...", "Save");
    });
}
function handleDeleteCard(cardElement, cardId) {
  openModal(deleteModal);

  selectedCard = cardElement;
  selectedCardId = cardId;
}

function handleDeleteSubmit(evt) {
  const submitter = evt.submitter;

  setButtonText(submitter, true, "Deleting...", "Delete");
  evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then(() => {
      if (selectedCard) {
        selectedCard.remove();
      }
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonText(submitter, false, "Deleting...", "Delete");
    });
}
function handleToggleLiked(evt, dataId) {
  let isLiked = Boolean;
  if (evt.target.classList.contains("card__like-button_active")) {
    isLiked = true;
  } else {
    isLiked = false;
  }
  api
    .handleLiked(dataId, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-button_active");
    })
    .catch((err) => {
      console.log(err);
    });
}

function getCardElement(data) {
  const cardFragment = cardTemplate.content.cloneNode(true);
  const cardElement = cardFragment.querySelector(".card");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImgEl = cardElement.querySelector(".card__image");
  const likeBtnEl = cardElement.querySelector(".card__like-button");
  const deleteBtnEl = cardElement.querySelector(".card__delete-btn");
  if (data.isLiked) {
    likeBtnEl.classList.add("card__like-button_active");
  }
  likeBtnEl.addEventListener("click", (evt) =>
    handleToggleLiked(evt, data._id)
  );

  deleteBtnEl.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data._id);
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

//API REQS
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "cb2d50ae-6f63-4d7f-a3f6-08c31f11128a",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach(function (card) {
      const cardElement = getCardElement(card);
      cardsList.append(cardElement);
    });
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    image2El.src = user.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

//EVENT LISTENERS
profileModalForm.addEventListener(`submit`, handleProfileFormSubmit);
postModalForm.addEventListener(`submit`, handleNewPostFormSubmit);
deleteForm.addEventListener(`submit`, handleDeleteSubmit);
avatarEditForm.addEventListener(`submit`, handleProfileImageSubmit);

cancelDeleteBtn.addEventListener("click", (evt) => {
  evt.preventDefault(); // Prevent form submission if button is inside the form
  closeModal(deleteModal);
});
profileImageBtn.addEventListener("click", function () {
  console.log(`afsdsd`);
  openModal(imageModal);
});
imageCloseBtn.addEventListener("click", () => {
  closeModal(imageModal);
});

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

enableValidation(settings);
