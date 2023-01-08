import { openPopup } from './utils.js'

const elementTemplate = document.querySelector('#element-template');
const elementsNode = document.querySelector('.elements__container');

const popupImage = document.querySelector('.popup_aim_image');
const popupImagePic = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__subtitle');

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

export function addElements(items) {
  const newElements = items.map(generateElement);
  elementsNode.prepend(...newElements);
}
