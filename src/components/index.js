import { createCardElement, insertCard2Page } from './card.js';
import { popupCardAdd, popupCardView, popupProfile, openPopup, closePopup } from './modal.js';
import { enableValidation, cleanValidationErrors, validationConfig } from './validate.js';


import '../pages/index.css';

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAddPlace = document.querySelector('.profile__add-button');

const popupUserName = popupProfile.querySelector('.popup__item_el_name');
const popupUserPosition = popupProfile.querySelector('.popup__item_el_position');
const profileUserName = document.querySelector('.profile__username');
const profileUserPosition = document.querySelector('.profile__user-position');

const popupCardName = popupCardAdd.querySelector('.popup__item_el_name');
const popupCardSrc = popupCardAdd.querySelector('.popup__item_el_position');

const popupPhoto = popupCardView.querySelector('.popup__photo');
const popupHeading = popupCardView.querySelector('.popup__heading');

const buttonSavePlace = popupCardAdd.querySelector('.popup__button');
const profileSaveButton = popupProfile.querySelector('.popup__button');



const cardCreateForm = document.forms.cardCreateForm;
const userProfileForm = document.forms.userprofileform;

const initialCards = [
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

function openProfilePopup() {
  {
    popupUserName.value = profileUserName.textContent;
    popupUserPosition.value = profileUserPosition.textContent;
    cleanValidationErrors(popupProfile, validationConfig);
    openPopup(popupProfile);
  }
}

function saveProfileFromPopup() {
  if (!profileSaveButton.disabled) {
    profileUserName.textContent = popupUserName.value;
    profileUserPosition.textContent = popupUserPosition.value;
    closePopup(popupProfile);
  }
}

function openCardAddPopup() {
  {
    popupCardName.value = '';
    popupCardSrc.value = '';
    cleanValidationErrors(popupCardAdd, validationConfig);
    buttonSavePlace.disabled = true;
    openPopup(popupCardAdd);
  }
}

function saveCardfromPopup() {
  if (!buttonSavePlace.disabled) {
    const newCard = createCardElement(popupCardName.value, popupCardSrc.value);
    insertCard2Page(newCard);
    closePopup(popupCardAdd);
  }
}

export function openCardViewPopup(src, alt) {
  return function () {

    popupPhoto.setAttribute('src', src);
    popupPhoto.setAttribute('alt', alt);
    popupHeading.textContent = alt;
    openPopup(popupCardView);
  }
}

// popupCardAdd.addEventListener('keydown', function(evt) {
//   if (evt.key === 'Enter') {
//     saveCardfromPopup();
//     cardCreateForm.submit();
//   }
// });


buttonEdit.addEventListener('click', openProfilePopup);
userProfileForm.addEventListener('submit', saveProfileFromPopup);

buttonAddPlace.addEventListener('click', openCardAddPopup);
cardCreateForm.addEventListener('submit', saveCardfromPopup);

enableValidation(validationConfig);

initialCards.forEach(element => {
  const newCard = createCardElement(element.name, element.link);
  insertCard2Page(newCard);
});


