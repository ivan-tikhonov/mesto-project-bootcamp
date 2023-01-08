import './pages/page.css';
import { enableValidation } from "./components/validate.js";
import { addElements} from "./components/card.js";
import { openPopup, closePopup} from './components/utils.js';
import { handleProfileFormSubmit, handleElementFormSubmit} from "./components/modal.js";
import { getInitialCards } from './components/api.js';

const configObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__input-error_active'
}

const formProfile = document.forms.profile;
const profileNameInput = formProfile.querySelector('input[name="profile_name"]');
const profileOccupationInput = formProfile.querySelector('input[name="profile_occupation"]');


const profileEditButton = document.querySelector('.profile__button-edit');
const profileNameElement = document.querySelector('.profile__title');
const profileOccupationElement = document.querySelector('.profile__subtitle');

const popupProfile = document.querySelector(".popup_aim_profile");
const popupProfileName = popupProfile.querySelector('input[name="profile_name"]');
const popupProfileOccupation = popupProfile.querySelector('input[name="profile_occupation"]');

const cardForm = document.forms.element;
const elementNameInput = cardForm.querySelector('input[name="element_name"]');
const elementURLInput = cardForm.querySelector('input[name="element_url"]');


const elementEditButton = document.querySelector('.profile__button-add');

const cardPopup = document.querySelector('.popup_aim_element');
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
});





profileEditButton.addEventListener('click', function(e) {
  openPopup(popupProfile);
  const profileNameValue = profileNameElement.textContent;
  const profileOccupationValue = profileOccupationElement.textContent;
  popupProfileName.value = profileNameValue;
  popupProfileOccupation.value = profileOccupationValue;
});

elementEditButton.addEventListener('click', function(e) {
  openPopup(cardPopup);
})


formProfile.addEventListener('submit', evt => {
  handleProfileFormSubmit(evt, profileNameInput, profileOccupationInput)
});
cardForm.addEventListener('submit', evt => {
  handleElementFormSubmit(evt, elementNameInput, elementURLInput)
});


enableValidation(configObject);


getInitialCards()
  .then((result) => {
    addElements(result);
  })
  .catch((err) => {
    console.log(err);
  });
