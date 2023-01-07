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

const elementTemplate = document.querySelector('#element-template');
const elementsNode = document.querySelector('.elements__container');

const profileEditButton = document.querySelector('.profile__button-edit');
const profileNameElement = document.querySelector('.profile__title');
const profileOccupationElement = document.querySelector('.profile__subtitle');

const popupProfile = document.querySelector(".popup_aim_profile");
const popupProfileName = popupProfile.querySelector('input[name="profile_name"]');
const popupProfileOccupation = popupProfile.querySelector('input[name="profile_occupation"]');
const popupProfileCloseButton = document.querySelector(".popup__button-close_aim_profile");

const elementEditButton = document.querySelector('.profile__button-add');

const cardPopup = document.querySelector('.popup_aim_element');
const cardPopupCloseButton = document.querySelector('.popup__button-close_aim_element')

const popupImage = document.querySelector('.popup_aim_image');
const popupImagePic = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__subtitle');
const popupImageCloseButton = document.querySelector('.popup__button-close_aim_image');

const formProfile = document.forms.profile;
const profileNameInput = formProfile.querySelector('input[name="profile_name"]');
const profileOccupationInput = formProfile.querySelector('input[name="profile_occupation"]');

const cardForm = document.forms.element;
const elementNameInput = cardForm.querySelector('input[name="element_name"]');
const elementURLInput = cardForm.querySelector('input[name="element_url"]');


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function hideClosestPopup(event) {
  const popup = event.target.closest(".popup");

  if (popup) {
    closePopup(popup);
  }
}



function generateElement(item) {
  const template = elementTemplate.content;
  const newElement = template.cloneNode(true);
  const newElementImage = newElement.querySelector('.element__image');
  const newElementTitle = newElement.querySelector('.element__title');
  const newElementLikeButton = newElement.querySelector('.element__button-like')
  const newElementDeleteButton = newElement.querySelector('.element__button-delete')
  newElementImage.src = item.link;
  newElementImage.alt = item.name;
  newElementTitle.textContent = item.name;
  newElementLikeButton.addEventListener('click', e => {
    e.target.classList.toggle('element__button-like_active');
  })
  newElementDeleteButton.addEventListener('click', e => {
    e.target.closest('.element').remove();
  })
  newElementImage.addEventListener('click', e => {
    openPopup(popupImage);
    popupImagePic.src = item.link;
    popupImagePic.alt = item.name;
    popupImageText.textContent = item.name;
  })
  return newElement;

}

function addElements(items) {
  let newElements = items.map(generateElement);
  elementsNode.prepend(...newElements);
}


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = profileNameInput.value;
  const occupationValue = profileOccupationInput.value;

  profileNameElement.textContent = nameValue;
  profileOccupationElement.textContent = occupationValue;
  hideClosestPopup(evt);
}

function handleElementFormSubmit(evt) {
  evt.preventDefault();
  const newElements = [];
  const newElement = {};
  newElement['name'] = elementNameInput.value;
  newElement['link'] = elementURLInput.value;
  newElements.push(newElement);
  addElements(newElements);
  hideClosestPopup(evt);
}

addElements(initialCards);

profileEditButton.addEventListener('click', function(e) {
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
  openPopup(cardPopup);
})


popupProfileCloseButton.addEventListener('click', hideClosestPopup)
cardPopupCloseButton.addEventListener('click', hideClosestPopup)
popupImageCloseButton.addEventListener('click', hideClosestPopup);

formProfile.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleElementFormSubmit);








function showInputError(configObject, formElement, inputElement,errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configObject.inputErrorClass);
  errorElement.classList.add(configObject.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(configObject, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configObject.inputErrorClass);
  errorElement.classList.remove(configObject.errorClass);
}

function isValid(configObject, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(configObject, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(configObject, formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    console.log(inputElement);
    console.log(inputElement.validity);
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

function setEventListener(configObject, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(configObject.inputSelector));
  const buttonElement = formElement.querySelector(configObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(configObject, formElement, inputElement)
      toggleButtonState(inputList, buttonElement);
    })
  });
};

function enableValidation(configObject) {
  const form = configObject.formSelector;
  setEventListener(configObject, form);
};


