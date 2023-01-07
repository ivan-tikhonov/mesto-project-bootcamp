export function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

export function hideClosestPopup(event) {
  const popup = event.target.closest(".popup");

  if (popup) {
    closePopup(popup);
  }
}

export function preparePopup(popup) {
  popup.addEventListener('click', evt => {
    if (Array.from(evt.target.classList).includes('popup')) {
      hideClosestPopup(evt);
    };
  });
  popup.addEventListener('keydown', evt => {
    if (evt.key == 'Escape') {
      hideClosestPopup(evt);
    }
  });
}
