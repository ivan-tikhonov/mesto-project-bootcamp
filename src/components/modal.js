import { hideClosestPopup } from './utils.js'
import { addElements } from './card.js';
import { patchUserInfo } from './api.js';

const profileAvatarElement = document.querySelector('.profile__image')
export const profileNameElement = document.querySelector('.profile__title');
export const profileOccupationElement = document.querySelector('.profile__subtitle');

export function updateProfile(result) {
  profileAvatarElement.src = result.avatar;
  profileNameElement.textContent = result.name;
  profileOccupationElement.textContent = result.about;
}

export function handleProfileFormSubmit(evt, profileNameInput, profileOccupationInput) {
  evt.preventDefault();
  const nameValue = profileNameInput.value;
  const occupationValue = profileOccupationInput.value;

  patchUserInfo(nameValue, occupationValue)
   .then(res =>{
      updateProfile.res;
   })
   .catch(err => {
    console.log(err);
   })
  hideClosestPopup(evt);
}

export function handleElementFormSubmit(evt, elementNameInput, elementURLInput) {
  evt.preventDefault();
  const newElements = [];
  const newElement = {};
  newElement['name'] = elementNameInput.value;
  newElement['link'] = elementURLInput.value;
  newElements.push(newElement);
  addElements(newElements);
  hideClosestPopup(evt);
}

