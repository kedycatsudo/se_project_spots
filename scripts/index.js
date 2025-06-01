const profileEditbtn = document.querySelector(`.profile__edit-btn`);
const profileEditModal = document.querySelector(`#edit-profile-modal`);
const profileClsBtn = profileEditModal.querySelector(`.modal__close-btn`);

const profileAddBtn = document.querySelector(`.profile__add-btn`);
const profileAddModal = document.querySelector(`#new-post-modal`);
const profileAddClsBtn = profileAddModal.querySelector(`.modal__close-btn`);

const profileName = document.querySelector(`.profile__name`);
const profileDescription = document.querySelector(`.profile__description`);

const profileNameInput = document.querySelector(`#profile-name-input`);
const profileDescriptionInput = document.querySelector(
  `#profile-description-input`
);

const profileImgInput = profileAddModal.querySelector(`#card-img-input`);
const profileCaptionInput = profileAddModal.querySelector(
  `#profile-caption-input`
);

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileEditModal.classList.remove(`modal_is-opened`);
}

function profileAddSubmit(evt) {
  evt.preventDefault();
  console.log(profileImgInput.value);
  console.log(profileCaptionInput.value);
  profileAddModal.classList.remove(`modal_is-opened`);
}

profileEditModal.addEventListener(`submit`, profileFormSubmitHandler);
profileAddModal.addEventListener(`submit`, profileAddSubmit);

profileEditbtn.addEventListener(`click`, function () {
  profileEditModal.classList.add(`modal_is-opened`);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileClsBtn.addEventListener(`click`, function () {
  profileEditModal.classList.remove(`modal_is-opened`);
});

profileAddBtn.addEventListener(`click`, function () {
  profileAddModal.classList.add(`modal_is-opened`);
});
profileAddClsBtn.addEventListener(`click`, function () {
  profileAddModal.classList.remove(`modal_is-opened`);
});
