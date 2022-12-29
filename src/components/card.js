const cardTemplate = document.querySelector('#element-template').content;
const cardsSection = document.querySelector('.elements');
import { openCardViewPopup } from './modal.js';

export const initialCards = [
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

export function createCardElement (placeName, placePhotoSrc) {
  const cardNew = cardTemplate.querySelector('.element').cloneNode(true);
  const photoCardNew = cardNew.querySelector('.element__photo');

  photoCardNew.src = placePhotoSrc;
  photoCardNew.alt = 'Фото. ' + placeName;
  cardNew.querySelector('.element__heading').textContent = placeName;
  cardNew.querySelector('.element__delete-button').addEventListener('click', function() {
    const cardElement = cardNew.querySelector('.element__delete-button').closest('.element');
    cardElement.remove();
  })
  cardNew.querySelector('.element__like').addEventListener('click', function (evt){
    evt.target.classList.toggle('element__like_active');
  })

  photoCardNew.addEventListener('click', openCardViewPopup(placePhotoSrc, placeName));

  return cardNew;
}

export function insertCard2Page (card) {
  cardsSection.prepend(card);
}




