const cardTemplate = document.querySelector('#element-template').content;
const cardsSection = document.querySelector('.elements');
import { openCardViewPopup } from './utils.js';
import { delCard, likeCard, dislikeCard } from './api.js';

function deleteCard(delBtn) {
  const cardElement = delBtn.closest('.element');
  delCard(cardElement.dataset.cardId)
    .then(() => {
       cardElement.remove();
      })
    .catch((err) => console.log(`Ошибка: ${err}`))
}

function toggleLike(likeBtn) {
  const cardElement = likeBtn.closest('.element');
  const likesCounter = cardElement.querySelector('.element__likes-counter');

  if(likeBtn.classList.contains('element__like_active')) {
    dislikeCard(cardElement.dataset.cardId)
      .then((data) => {
        likesCounter.textContent = data.likes.length
        likeBtn.classList.remove('element__like_active');
      })
  } else {
    likeCard(cardElement.dataset.cardId)
      .then((data) => {
        likesCounter.textContent = data.likes.length;
        likeBtn.classList.add('element__like_active');
       })
  }
}

export function createCardElement (placeName, placePhotoSrc, likesNumbers, cardId, cardOwnerId, myId) {
  const cardNew = cardTemplate.querySelector('.element').cloneNode(true);
  const photoCardNew = cardNew.querySelector('.element__photo');
  const likesCounter = cardNew.querySelector('.element__likes-counter');
  const deleteBtn = cardNew.querySelector('.element__delete-button');

  cardNew.dataset.cardId = cardId;
  photoCardNew.src = placePhotoSrc;
  photoCardNew.alt = 'Фото. ' + placeName;
  likesCounter.textContent = likesNumbers;

  cardNew.querySelector('.element__heading').textContent = placeName;
  cardNew.querySelector('.element__like').addEventListener('click', (evt) => toggleLike(evt.target));
  photoCardNew.addEventListener('click', openCardViewPopup(placePhotoSrc, placeName));

  if (cardOwnerId === myId) {
    deleteBtn.style.display = 'block';
    deleteBtn.addEventListener('click', (evt) => deleteCard(evt.target));
  }

  return cardNew;
}

export function insertCard2Page (card) {
  cardsSection.prepend(card);
}




