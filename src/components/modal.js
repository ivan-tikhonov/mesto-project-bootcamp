import { hideClosestPopup } from './utils.js'
import { addElements } from './card.js';
import { createNewCard, patchUserInfo, changeAvatar } from './api.js';

const profileAvatarElement = document.querySelector('.profile__image')
export const profileNameElement = document.querySelector('.profile__title');
export const profileOccupationElement = document.querySelector('.profile__subtitle');

export function updateProfile(result) {
  profileAvatarElement.src = result.avatar;
  profileNameElement.textContent = result.name;
  profileOccupationElement.textContent = result.about;
}

function renderLoading(isLoading, element) {
  if (isLoading) {
    element.textContent = 'Сохранение...';
  } else {
    element.textContent = 'Сохранить';
  }
}

export function handleProfileFormSubmit(evt, profileNameInput, profileOccupationInput) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  renderLoading(true, submitButton);
  const nameValue = profileNameInput.value;
  const occupationValue = profileOccupationInput.value;

  patchUserInfo(nameValue, occupationValue)
   .then(res =>{
      updateProfile(res);
      hideClosestPopup(evt);
   })
   .catch(err => {
    console.log(err);
   })
   .finally(() => {
    renderLoading(false, submitButton);
   });

}

export function handleElementFormSubmit(evt, elementNameInput, elementURLInput, userId) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button-save');
  renderLoading(true, submitButton);
  createNewCard(elementNameInput.value, elementURLInput.value)
    .then(res => {
      addElements([res], userId);
      evt.target.reset()
      hideClosestPopup(evt);
    })
    .catch(err =>{
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
     });
}

export function handleAvatarFormSubmit(evt, avatarURLInput) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button-save');
  renderLoading(true, submitButton);
  changeAvatar(avatarURLInput.value)
    .then(res => {
      profileAvatarElement.src = avatarURLInput.value;
      evt.target.reset()
      hideClosestPopup(evt);
    })
    .catch(err =>{
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
     });
}

