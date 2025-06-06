function openModal(modalElement) {
  modalElement.classList.add("modal_is-opened");
}
function closeModal(modalElement) {
  modalElement.classList.remove("modal_is-opened");
}

let initialCards = [
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

const profileEditbtn = document.querySelector(`.profile__edit-btn`);
const profileEditModal = document.querySelector(`#edit-profile-modal`);
const profileClsBtn = profileEditModal.querySelector(`.modal__close-btn`);

const profileAddBtn = document.querySelector(`.profile__add-btn`);
const newPostModal = document.querySelector(`#new-post-modal`);
const newPostClsBtn = newPostModal.querySelector(`.modal__close-btn`);

const profileName = document.querySelector(`.profile__name`);
const profileDescription = document.querySelector(`.profile__description`);

const profileNameInput = document.querySelector(`#profile-name-input`);
const profileDescriptionInput = document.querySelector(
  `#profile-description-input`
);

const profileModalForm = profileEditModal.querySelector(`.modal__form`);
const postModalForm = newPostModal.querySelector(`.modal__form`);

const cardImgLink = newPostModal.querySelector(`#card-img-input`);
const cardCaptionInput = newPostModal.querySelector(`#card-caption-input`);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  console.log(cardImgLink.value);
  console.log(cardCaptionInput.value);
  closeModal(newPostModal);
}

profileModalForm.addEventListener(`submit`, handleProfileFormSubmit);
postModalForm.addEventListener(`submit`, handleNewPostFormSubmit);

profileEditbtn.addEventListener(`click`, function () {
  openModal(profileEditModal);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileClsBtn.addEventListener(`click`, function () {
  closeModal(profileEditModal);
});

profileAddBtn.addEventListener(`click`, function () {
  openModal(newPostModal);
});
newPostClsBtn.addEventListener(`click`, function () {
  closeModal(newPostModal);
});

initialCards.forEach(function (card) {
  console.log(card.name);
});
