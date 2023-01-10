import './pages/page.css';
import { configObject } from './components/constants.js';
import { enableValidation } from "./components/validate.js";
import { addElements} from "./components/card.js";
import { openPopup, closePopup} from './components/utils.js';
import { handleProfileFormSubmit, handleElementFormSubmit, handleAvatarFormSubmit, updateProfile, profileNameElement, profileOccupationElement} from "./components/modal.js";
import { getInitialCards, getUserInfo } from './components/api.js';



const formProfile = document.forms.profile;
const profileNameInput = formProfile.querySelector('input[name="profile_name"]');
const profileOccupationInput = formProfile.querySelector('input[name="profile_occupation"]');


const profileEditButton = document.querySelector('.profile__button-edit');
const profileAvatarEditButton = document.querySelector('.profile__image-change');

const popupProfile = document.querySelector(".popup_aim_profile");
const popupProfileName = popupProfile.querySelector('input[name="profile_name"]');
const popupProfileOccupation = popupProfile.querySelector('input[name="profile_occupation"]');

const popupAvatar = document.querySelector(".popup_aim_avatar");
const avatarForm = document.forms.avatar;
const avatarURLInput = avatarForm.querySelector('input[name="avatar_url"]')

const cardForm = document.forms.element;
const elementNameInput = cardForm.querySelector('input[name="element_name"]');
const elementURLInput = cardForm.querySelector('input[name="element_url"]');


const elementEditButton = document.querySelector('.profile__button-add');

const cardPopup = document.querySelector('.popup_aim_element');
const popups = document.querySelectorAll('.popup')

let userId

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


Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    updateProfile(userData);
    addElements(cards, userId);
  })
  .catch((err) => {
    console.log(err);
  });



profileEditButton.addEventListener('click', function(e) {
  openPopup(popupProfile);
  const profileNameValue = profileNameElement.textContent;
  const profileOccupationValue = profileOccupationElement.textContent;
  popupProfileName.value = profileNameValue;
  popupProfileOccupation.value = profileOccupationValue;
});

profileAvatarEditButton.addEventListener('click', function(e){
  openPopup(popupAvatar);
});

elementEditButton.addEventListener('click', function(e) {
  openPopup(cardPopup);
})


formProfile.addEventListener('submit', evt => {
  handleProfileFormSubmit(evt, profileNameInput, profileOccupationInput);
});

avatarForm.addEventListener('submit', evt =>{
  handleAvatarFormSubmit(evt, avatarURLInput);
});
cardForm.addEventListener('submit', evt => {
  handleElementFormSubmit(evt, elementNameInput, elementURLInput, userId);
});


enableValidation(configObject);


