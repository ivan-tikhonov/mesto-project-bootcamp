import './pages/page.css';
import { enableValidation } from "./components/validate.js";
import { addElements} from "./components/card.js";
import { openPopup, hideClosestPopup, preparePopup} from './components/utils.js';
import { handleProfileFormSubmit, handleElementFormSubmit} from "./components/modal.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const formProfile = document.forms.profile;
const profileNameInput = formProfile.querySelector('input[name="profile_name"]');
const profileOccupationInput = formProfile.querySelector('input[name="profile_occupation"]');


const profileEditButton = document.querySelector('.profile__button-edit');
const profileNameElement = document.querySelector('.profile__title');
const profileOccupationElement = document.querySelector('.profile__subtitle');

const popupProfile = document.querySelector(".popup_aim_profile");
const popupProfileName = popupProfile.querySelector('input[name="profile_name"]');
const popupProfileOccupation = popupProfile.querySelector('input[name="profile_occupation"]');
const popupProfileCloseButton = document.querySelector(".popup__button-close_aim_profile");

const cardForm = document.forms.element;
const elementNameInput = cardForm.querySelector('input[name="element_name"]');
const elementURLInput = cardForm.querySelector('input[name="element_url"]');


const elementEditButton = document.querySelector('.profile__button-add');

const cardPopup = document.querySelector('.popup_aim_element');
const cardPopupCloseButton = document.querySelector('.popup__button-close_aim_element')


const popupImageCloseButton = document.querySelector('.popup__button-close_aim_image');








addElements(initialCards);

profileEditButton.addEventListener('click', function(e) {
  preparePopup(popupProfile);
  openPopup(popupProfile);
  const profileNameValue = profileNameElement.textContent;
  const profileOccupationValue = profileOccupationElement.textContent;
  popupProfileName.value = profileNameValue;
  popupProfileOccupation.value = profileOccupationValue;
  enableValidation({
    formSelector: formProfile,
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: 'popup__input-error_active'
  });
});

elementEditButton.addEventListener('click', function(e) {
  preparePopup(cardPopup);
  openPopup(cardPopup);
  enableValidation({
    formSelector: cardForm,
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: 'popup__input-error_active'
  });
})


popupProfileCloseButton.addEventListener('click', hideClosestPopup)
cardPopupCloseButton.addEventListener('click', hideClosestPopup)
popupImageCloseButton.addEventListener('click', hideClosestPopup);

formProfile.addEventListener('submit', evt => {
  handleProfileFormSubmit(evt, profileNameInput, profileOccupationInput)
});
cardForm.addEventListener('submit', evt => {
  handleElementFormSubmit(evt, elementNameInput, elementURLInput)
});








