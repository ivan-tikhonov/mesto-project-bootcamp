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
const popupProfileCloseButton = document.querySelector(".popup__button-close_aim_profile");

const elementEditButton = document.querySelector('.profile__button-add');

const popupElement = document.querySelector('.popup_aim_element');
const popupElementCloseButton = document.querySelector('.popup__button-close_aim_element')

const popupImage = document.querySelector('.popup_aim_image');
const popupImageCloseButton = document.querySelector('.popup__button-close_aim_image');

const formProfile = document.querySelector('form[name="profile"]');
const profileNameInput = formProfile.querySelector('input[name="profile_name"]');
const profileOccupationInput = formProfile.querySelector('input[name="profile_occupation"]');

const formElement = document.querySelector('form[name="element"]');
const elementNameInput = formElement.querySelector('input[name="element_name"]');
const elementURLInput = formElement.querySelector('input[name="element_url"]');



function generateElement(item) {
  const template = elementTemplate.content;
  let newElement = template.cloneNode(true);
  let newElementImage = newElement.querySelector('.element__image');
  let newElementTitle = newElement.querySelector('.element__title');
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
    popupImage.classList.toggle('popup_opened');
    popupImage.querySelector('.popup__image').src = item.link;
    popupImage.querySelector('.popup__image').alt = item.name;
    popupImage.querySelector('.popup__subtitle').textContent = item.name;
  })
  return newElement;

}

function addElements(items) {
  let newElements = items.map(generateElement);
  elementsNode.prepend(...newElements);
}

function closePopup(event) {
  popup = event.target.closest('.popup')
  popup.classList.toggle('popup_opened');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameValue = profileNameInput.value;
  occupationValue = profileOccupationInput.value;

  profileNameElement.textContent = nameValue;
  profileOccupationElement.textContent =occupationValue;
  closePopup(evt);
}

function handleElementFormSubmit(evt) {
  evt.preventDefault();
  const newElements = [];
  const newElement = {};
  newElement['name'] = elementNameInput.value;
  newElement['link'] = elementURLInput.value;
  newElements.push(newElement);
  addElements(newElements);
  closePopup(evt);
}

addElements(initialCards);

profileEditButton.addEventListener('click', function(e) {
  popupProfile.classList.toggle('popup_opened');
  const profileNameValue = profileNameElement.textContent;
  const profileOccupationValue = profileOccupationElement.textContent;
  popupProfile.querySelector('input[name="profile_name"]').placeholder = profileNameValue;
  popupProfile.querySelector('input[name="profile_occupation"]').placeholder = profileOccupationValue;

});

elementEditButton.addEventListener('click', function(e) {
  popupElement.classList.toggle('popup_opened');
})


popupProfileCloseButton.addEventListener('click', closePopup)
popupElementCloseButton.addEventListener('click', closePopup)
popupImageCloseButton.addEventListener('click', closePopup);

formProfile.addEventListener('submit', handleProfileFormSubmit);
formElement.addEventListener('submit', handleElementFormSubmit);

