const profileEditButton = document.querySelector('.profile__button-edit');
const profileNameElement = document.querySelector('.profile__title');
const profileOccupationElement = document.querySelector('.profile__subtitle');


const popupProfileCloseButton = document.querySelector(".popup__button-close_aim_profile")
const popupProfile = document.querySelector(".popup_aim_profile");

const formProfileElement = document.querySelector('form[name="profile"]');
const profileNameInput = formProfileElement.querySelector('input[name="profile_name"]')
const profileOccupationInput = formProfileElement.querySelector('input[name="profile_occupation"]')



function closePopup(event) {
  popup = event.target.closest('.popup')
  popup.classList.toggle('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameValue = profileNameInput.value;
  occupationValue = profileOccupationInput.value;

  profileNameElement.textContent = nameValue;
  profileOccupationElement.textContent =occupationValue;
  closePopup(evt);
}

profileEditButton.addEventListener('click', function(e) {
  popupProfile.classList.toggle('popup_opened');
  const profileNameValue = profileNameElement.textContent;
  const profileOccupationValue = profileOccupationElement.textContent;
  popupProfile.querySelector('input[name="profile_name"]').placeholder = profileNameValue;
  popupProfile.querySelector('input[name="profile_occupation"]').placeholder = profileOccupationValue;

});

popupProfileCloseButton.addEventListener('click', closePopup)

formProfileElement.addEventListener('submit', handleFormSubmit);

