const popupProfileSelector = '.popup_type_profile';
const popupAddCardSelector = '.popup_type_card';
const popupAvatarSelector = '.popup_type_avatar';
const cardContainerSelector = '.elements';

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAddPlace = document.querySelector('.profile__add-button');
const buttonAvatarEdit = document.querySelector('.profile__avatar-container');
const userProfileForm = document.forms.userprofileform;
const cardCreateForm = document.forms.cardCreateForm;
const userAvatarForm = document.forms.useravatarform;

const userProfileSelectors = {
  usernameSelector: '.profile__username',
  userAboutSelector: '.profile__user-position',
  userAvatarSelector: '.profile__avatar'
}

const validationConfig = {
  formSelector: ".popup__input-container",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__item_type_error",
  inputErrorActiveClass: "popup__item-error_active",
};

export {
  popupProfileSelector,
  popupAddCardSelector,
  popupAvatarSelector,
  cardContainerSelector,
  buttonEdit,
  buttonAddPlace,
  buttonAvatarEdit,
  userProfileForm,
  cardCreateForm,
  userAvatarForm,
  userProfileSelectors,
  validationConfig
}