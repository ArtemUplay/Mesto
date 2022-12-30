// import { cleanValidationErrors, validationConfig } from './validate.js';
// import { createCardElement, insertCard2Page } from './card.js';

const popupCardAdd = document.querySelector('.popup_type_card');
// const buttonClosePlace = popupCardAdd.querySelector('.popup__close-button');
const popupCardView = document.querySelector('.popup_type_img');
// const buttonCloseView = popupCardView.querySelector('.popup__close-button');
const popupProfile = document.querySelector('.popup_type_profile');
// const profileCloseButton = popupProfile.querySelector('.popup__close-button');

function closeByEsc(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function closeBybackgroungClick(popup) {
  if (popup.classList.contains('popup_opened')) {
    closePopup(popup);
  }
}

// function submitByEnter (evt, popup) {
//   const form = popup.querySelector('.popup__input-container');
//   if (evt.key === 'Enter') {
//     form.submit();
//   }
// }

function openPopup(popup) {
  const closeBtn = popup.querySelector('.popup__close-button');
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => closeByEsc(evt, popup));
  document.addEventListener('mousedown', (evt) => closeBybackgroungClick(evt.target));
  closeBtn.addEventListener('click', () => closePopup(popup));
  // popup.addEventListener('keydown', (evt) => submitByEnter(evt, popup));
}

function closePopup(popup) {
  const closeBtn = popup.querySelector('.popup__close-button');
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', (evt) => closeByEsc(evt, popup));
  document.removeEventListener('mousedown', (evt) => closeBybackgroungClick(evt.target));
  closeBtn.removeEventListener('click', () => closePopup(popup));
  // popup.removeEventListener('keydown', (evt) => submitByEnter(evt, popup));
}

// export { userProfileForm, profileCloseButton, profileSaveButton, buttonClosePlace, buttonSavePlace, popupCardAdd, popupCardView, popupProfile, buttonCloseView, openProfilePopup, saveProfileFromPopup, openCardAddPopup, closePopup, saveCardfromPopup, openCardViewPopup };

export { popupCardAdd, popupCardView, popupProfile, openPopup, closePopup };
