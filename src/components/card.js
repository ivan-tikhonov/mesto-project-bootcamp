import { openPopup } from './utils.js'
import { deleteCard, addLike, removeLike } from './api.js';

const elementTemplate = document.querySelector('#element-template');
const elementsNode = document.querySelector('.elements__container');

const popupImage = document.querySelector('.popup_aim_image');
const popupImagePic = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__subtitle');

let profileUserId

function countLikes(likes) {
  return likes.length;
}

function generateElement(item) {
  const template = elementTemplate.content;
  const newElement = template.cloneNode(true);
  const newElementImage = newElement.querySelector('.element__image');
  const newElementTitle = newElement.querySelector('.element__title');
  const newElementLikeButton = newElement.querySelector('.element__button-like')
  const newElementDeleteButton = newElement.querySelector('.element__button-delete')
  const newElementLikeCount = newElement.querySelector('.element__like-count')
  newElementLikeCount.textContent = countLikes(item.likes);

  if (item.owner['_id'] === profileUserId) {
    newElementDeleteButton.addEventListener('click', (event) =>{
      deleteCard(item['_id'])
        .then(res => {
          const thisCard = event.target.closest(".element");
          thisCard.remove();
        })
        .catch(err =>{
          console.log(err);
        });

    });
  } else {
    newElementDeleteButton.remove()
  };

  newElementImage.src = item.link;
  newElementImage.alt = item.name;
  newElementTitle.textContent = item.name;

  if (item.likes.some((like) => like['_id'] === profileUserId)) {
    newElementLikeButton.classList.add('element__button-like_active');
  }

  newElementLikeButton.addEventListener('click', e => {
    if (e.target.classList.contains('element__button-like_active')) {
      removeLike(item['_id'])
        .then(res =>{
          e.target.classList.remove('element__button-like_active');
          newElementLikeCount.textContent = countLikes(res.likes);
        })
        .catch(err =>{
          console.log(err);
        });
    } else {
      addLike(item['_id'])
        .then(res =>{
          e.target.classList.add('element__button-like_active');
          newElementLikeCount.textContent = countLikes(res.likes);
        })
        .catch(err =>{
          console.log(err);
        });
    }

  })

  newElementImage.addEventListener('click', e => {
    openPopup(popupImage);
    popupImagePic.src = item.link;
    popupImagePic.alt = item.name;
    popupImageText.textContent = item.name;
  })
  return newElement;

}

export function addElements(items, userId) {
  profileUserId = userId;
  const newElements = items.map(generateElement);
  elementsNode.prepend(...newElements);
}
