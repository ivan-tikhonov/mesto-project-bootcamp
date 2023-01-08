import { openPopup } from './utils.js'
import { getUserInfo, deleteCard, addLike, removeLike } from './api.js';

const elementTemplate = document.querySelector('#element-template');
const elementsNode = document.querySelector('.elements__container');

const popupImage = document.querySelector('.popup_aim_image');
const popupImagePic = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__subtitle');

function likeCount(likes) {
  return likes.reduce(function(total){
    return total += 1;
  },0);
}

function generateElement(item) {
  const isMy = this.my;
  const template = elementTemplate.content;
  const newElement = template.cloneNode(true);
  const newElementImage = newElement.querySelector('.element__image');
  const newElementTitle = newElement.querySelector('.element__title');
  const newElementLikeButton = newElement.querySelector('.element__button-like')
  const newElementDeleteButton = newElement.querySelector('.element__button-delete')
  const newElementLikeCount = newElement.querySelector('.element__like-count')


  newElementLikeCount.textContent = likeCount(item.likes);

  getUserInfo()
    .then((result) => {
      if (item.owner['_id'] === result['_id']) {
        newElementDeleteButton.addEventListener('click', (event) =>{
          deleteCard(item['_id'])
            .catch(err =>{
              console.log(err);
            });
          const thisCard = event.target.closest(".element");
          thisCard.remove();
        });
      } else {
        newElementDeleteButton.remove()
      };
    })
    .catch((err) =>{
      console.log(err);
    });



  newElementImage.src = item.link;
  newElementImage.alt = item.name;
  newElementTitle.textContent = item.name;
  newElementLikeButton.addEventListener('click', e => {
    if (e.target.classList.contains('element__button-like_active')) {
      e.target.classList.remove('element__button-like_active');
      removeLike(item['_id'])
        .then(res =>{
          newElementLikeCount.textContent = likeCount(res.likes);
        })
        .catch(err =>{
          console.log(err);
        });
    } else {
      e.target.classList.add('element__button-like_active');
      addLike(item['_id'])
        .then(res =>{
          newElementLikeCount.textContent = likeCount(res.likes);
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

export function addElements(items, my = false) {
  const newElements = items.map(generateElement, my);
  elementsNode.prepend(...newElements);
}
