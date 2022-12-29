const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAddPlace = document.querySelector('.profile__add-button');
const page = document.querySelector('.page');

import { initialCards, createCardElement, insertCard2Page } from './card.js';
initialCards.forEach(element => {
  const newCard = createCardElement(element.name, element.link);
  insertCard2Page(newCard);
});

import { profileCloseButton, profileSaveButton, buttonClosePlace, buttonSavePlace, popupCardAdd, popupCardView, popupProfile, buttonCloseView, openProfilePopup, closeProfilePopup, saveProfileFromPopup, openCardAddPopup, closePopup, saveCardfromPopup } from './modal.js';
buttonEdit.addEventListener('click', openProfilePopup);
profileCloseButton.addEventListener('click', closeProfilePopup);
profileSaveButton.addEventListener('click', saveProfileFromPopup);

buttonAddPlace.addEventListener('click', openCardAddPopup);
buttonClosePlace.addEventListener('click', () => closePopup(popupCardAdd));
buttonSavePlace.addEventListener('click', saveCardfromPopup);
popupCardAdd.addEventListener('keydown', function(evt) {
  if (evt.key === 'Enter') {
    saveCardfromPopup();
  }
});

buttonCloseView.addEventListener('click', () => closePopup(popupCardView));
page.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupCardAdd);
    closePopup(popupCardView);
    closePopup(popupProfile);
  }
})

page.addEventListener('mousedown', function(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
})

import { enableValidation, validationConfig } from './validate.js';
enableValidation(validationConfig);

import '../pages/index.css';
