const popupCardAdd = document.querySelector('.popup_type_card');
const buttonClosePlace = popupCardAdd.querySelector('.popup__close-button');
const buttonSavePlace = popupCardAdd.querySelector('.popup__button');
const popupCardName = popupCardAdd.querySelector('.popup__item_el_name');
const popupCardSrc = popupCardAdd.querySelector('.popup__item_el_position');

const popupCardView = document.querySelector('.popup_type_img');
const buttonCloseView = popupCardView.querySelector('.popup__close-button');
const popupPhoto = popupCardView.querySelector('.popup__photo');
const popupHeading = popupCardView.querySelector('.popup__heading');

const popupProfile = document.querySelector('.popup_type_profile');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const profileSaveButton = popupProfile.querySelector('.popup__button');
const popupUserName = popupProfile.querySelector('.popup__item_el_name');
const popupUserPosition = popupProfile.querySelector('.popup__item_el_position');
const profileUserName = document.querySelector('.profile__username');
const profileUserPosition = document.querySelector('.profile__user-position');

import { cleanValidationErrors, validationConfig } from './validate.js';
import { createCardElement, insertCard2Page } from './card.js';

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function openProfilePopup () {
  {
    popupUserName.value = profileUserName.textContent;
    popupUserPosition.value = profileUserPosition.textContent;
    cleanValidationErrors(popupProfile, validationConfig);
    openPopup(popupProfile);
  }
}

function closeProfilePopup () {
  {
    closePopup(popupProfile);
  }
}

function saveProfileFromPopup () {
 {
    profileUserName.textContent = popupUserName.value;
    profileUserPosition.textContent = popupUserPosition.value;
    closePopup(popupProfile);
  }
}

function openCardAddPopup () {
  {
  popupCardName.value = '';
  popupCardSrc.value = '';
  cleanValidationErrors(popupCardAdd, validationConfig);
  openPopup(popupCardAdd);
  }
}

function saveCardfromPopup () {
 if (!buttonSavePlace.disabled) {
   const newCard = createCardElement(popupCardName.value, popupCardSrc.value);
   insertCard2Page(newCard);
   closePopup(popupCardAdd);
 }
}

function openCardViewPopup(src, alt){
return function (){

  popupPhoto.setAttribute('src', src);
  popupPhoto.setAttribute('alt', alt);
  popupHeading.textContent = alt;
  openPopup(popupCardView);
}
}

export { profileCloseButton, profileSaveButton, buttonClosePlace, buttonSavePlace, popupCardAdd, popupCardView, popupProfile, buttonCloseView, openProfilePopup, closeProfilePopup, saveProfileFromPopup, openCardAddPopup, closePopup, saveCardfromPopup, openCardViewPopup };


