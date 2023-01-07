import { hideClosestPopup } from './utils.js'
import { addElements } from './card.js';
const profileNameElement = document.querySelector('.profile__title');
const profileOccupationElement = document.querySelector('.profile__subtitle');

export function handleProfileFormSubmit(evt, profileNameInput, profileOccupationInput) {
  evt.preventDefault();
  const nameValue = profileNameInput.value;
  const occupationValue = profileOccupationInput.value;

  profileNameElement.textContent = nameValue;
  profileOccupationElement.textContent = occupationValue;
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
