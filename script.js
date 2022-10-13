let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__button');
let popup = document.querySelector('.popup');

let profileUserName = document.querySelector('.profile__username');
let profileUserPosition = document.querySelector('.profile__user-position');
let popupUserName = popup.querySelector('.popup__item_el_username');
let popupUserPosition = popup.querySelector('.popup__item_el_position');

function popupToggle () {
  popup.classList.toggle('popup_opened');
};

function popupProfileOpen () {
  popupUserName.value = profileUserName.textContent;
  popupUserPosition.value = profileUserPosition.textContent;
  popupToggle();
}

function popupProfileClose () {
  popupUserName.value = '';
  popupUserPosition.value = '';
  popupToggle();
}

function popupProfileSave () {
   profileUserName.textContent = popupUserName.value;
   profileUserPosition.textContent = popupUserPosition.value;
   popupProfileClose();
}

editButton.addEventListener('click', popupProfileOpen);
closeButton.addEventListener('click', popupProfileClose);
saveButton.addEventListener('click',popupProfileSave);
