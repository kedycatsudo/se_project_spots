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
  profileEditModal.classList.remove(`modal_is-opened`);
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  console.log(cardImgLink.value);
  console.log(cardCaptionInput.value);
  newPostModal.classList.remove(`modal_is-opened`);
}

profileModalForm.addEventListener(`submit`, handleProfileFormSubmit);
postModalForm.addEventListener(`submit`, handleNewPostFormSubmit);

profileEditbtn.addEventListener(`click`, function () {
  profileEditModal.classList.add(`modal_is-opened`);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileClsBtn.addEventListener(`click`, function () {
  profileEditModal.classList.remove(`modal_is-opened`);
});

profileAddBtn.addEventListener(`click`, function () {
  newPostModal.classList.add(`modal_is-opened`);
});
newPostClsBtn.addEventListener(`click`, function () {
  newPostModal.classList.remove(`modal_is-opened`);
});

initialCards.forEach(function (card) {
  console.log(card.name);
});
