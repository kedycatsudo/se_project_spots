const profileEditbtn =  document.querySelector(`.profile__edit-btn`);
const profileEditModal = document.querySelector(`#edit-profile-modal`);
const profileClsBtn = profileEditModal.querySelector(`.modal__close-btn`)

const profileAddBtn = document.querySelector(`.profile__add-btn`);
const profileAddModal = document.querySelector(`#new-post-modal`);
const profileAddClsBtn = profileAddModal.querySelector(`.modal__close-btn`);

profileEditbtn.addEventListener(`click`,function(){
    profileEditModal.classList.add(`modal_is-opened`);
})

profileClsBtn.addEventListener(`click`, function(){
    profileEditModal.classList.remove(`modal_is-opened`);
})

profileAddBtn.addEventListener(`click`,function(){
    profileAddModal.classList.add(`modal_is-opened`);
});
profileAddClsBtn.addEventListener(`click`, function(){
    profileAddModal.classList.remove(`modal_is-opened`);
});