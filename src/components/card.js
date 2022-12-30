const cardTemplate = document.querySelector('#element-template').content;
const cardsSection = document.querySelector('.elements');
import { openCardViewPopup } from './index.js';

function deleteCard(delBtn) {
  const cardElement = delBtn.closest('.element');
  cardElement.remove();
}

function toggleLike(likeBtn) {
  likeBtn.classList.toggle('element__like_active');
}

export function createCardElement (placeName, placePhotoSrc) {
  const cardNew = cardTemplate.querySelector('.element').cloneNode(true);
  const photoCardNew = cardNew.querySelector('.element__photo');

  photoCardNew.src = placePhotoSrc;
  photoCardNew.alt = 'Фото. ' + placeName;
  cardNew.querySelector('.element__heading').textContent = placeName;
  cardNew.querySelector('.element__delete-button').addEventListener('click', (evt) => deleteCard(evt.target));
  cardNew.querySelector('.element__like').addEventListener('click', (evt) => toggleLike(evt.target));
  photoCardNew.addEventListener('click', openCardViewPopup(placePhotoSrc, placeName));

  return cardNew;
}

export function insertCard2Page (card) {
  cardsSection.prepend(card);
}




