// import { cleanValidationErrors, validationConfig } from './validate.js';
// import { createCardElement, insertCard2Page } from './card.js';

// const popupCardAdd = document.querySelector('.popup_type_card');
// const buttonClosePlace = popupCardAdd.querySelector('.popup__close-button');
// const popupCardView = document.querySelector('.popup_type_img');
// const buttonCloseView = popupCardView.querySelector('.popup__close-button');
// const popupProfile = document.querySelector('.popup_type_profile');
// const profileCloseButton = popupProfile.querySelector('.popup__close-button');

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    document.querySelector(this._popupSelector).classList.add('popup_opened');
  }

  close() {
    document.querySelector(this._popupSelector).classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    })

    document.querySelector(this._popupSelector).addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    })

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    })
  }
}

function openPopup(popup) {
  const closeBtn = popup.querySelector('.popup__close-button');
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('mousedown', closeBybackgroungClick);
  closeBtn.addEventListener('click', closeByX);
  // popup.addEventListener('keydown', (evt) => submitByEnter(evt, popup));
}

function findOpenedPopup() {
  return document.querySelector('.popup_opened')
}

function closeByEsc(evt) {

  if (evt.key === 'Escape') {
    closePopup(findOpenedPopup());
  }

}

function closeBybackgroungClick(evt) {

  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }

}

function closeByX() {
  closePopup(findOpenedPopup());
}

// function submitByEnter (evt, popup) {
//   const form = popup.querySelector('.popup__input-container');
//   if (evt.key === 'Enter') {
//     form.submit();
//   }
// }



function closePopup(popup) {
  const closeBtn = popup.querySelector('.popup__close-button');
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('mousedown', closeBybackgroungClick);
  closeBtn.removeEventListener('click', closeByX);
  // popup.removeEventListener('keydown', (evt) => submitByEnter(evt, popup));
}

// export { userProfileForm, profileCloseButton, profileSaveButton, buttonClosePlace, buttonSavePlace, popupCardAdd, popupCardView, popupProfile, buttonCloseView, openProfilePopup, saveProfileFromPopup, openCardAddPopup, closePopup, saveCardfromPopup, openCardViewPopup };

export { openPopup, closePopup };
