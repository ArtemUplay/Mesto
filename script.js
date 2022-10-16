let editButton = document.querySelector('.profile__edit-button');
let addPlaceButton = document.querySelector('.profile__add-button');
let popupProfile = document.querySelectorAll('.popup')[0];
let popupCardAdd = document.querySelectorAll('.popup')[1];
let profileCloseButton = popupProfile.querySelector('.popup__close-button');
let profileSaveButton = popupProfile.querySelector('.popup__button');
let placeCloseButton = popupCardAdd.querySelector('.popup__close-button');
let placeSaveButton = popupCardAdd.querySelector('.popup__button');


let profileUserName = document.querySelector('.profile__username');
let profileUserPosition = document.querySelector('.profile__user-position');
// let popupUserName = popup.querySelector('.popup__item_el_username');
// let popupUserPosition = popup.querySelector('.popup__item_el_position');

// function popupToggle (popup) {
//   popup.classList.toggle('popup_opened');
// };

function popupToggle(popup) {
    popup.classList.toggle('popup_opened');
}

function popupProfileOpen (popup) {
  return function (){
    const popupUserName = popup.querySelector('.popup__item_el_name');
    const popupUserPosition = popup.querySelector('.popup__item_el_position');
    popupUserName.value = profileUserName.textContent;
    popupUserPosition.value = profileUserPosition.textContent;
    popupToggle(popup);
  }
}

function popupClose (popup) {
  return function() {
    const popupUserName = popup.querySelector('.popup__item_el_name');
    const popupUserPosition = popup.querySelector('.popup__item_el_position');
    popupUserName.value = '';
    popupUserPosition.value = '';
    popupToggle(popup);
  }
}

function popupProfileSave (popup) {
  return function() {
    const popupUserName = popup.querySelector('.popup__item_el_name');
    const popupUserPosition = popup.querySelector('.popup__item_el_position');
    profileUserName.textContent = popupUserName.value;
    profileUserPosition.textContent = popupUserPosition.value;
    popupUserName.value = '';
    popupUserPosition.value = '';
    popupToggle(popup);
  }
}

function cardElementCreate (placeName, placePhotoSrc) {
  const cardTemplate = document.querySelector('#element-template').content;
  const cardNew = cardTemplate.querySelector('.element').cloneNode(true);

  cardNew.querySelector('.element__photo').src = placePhotoSrc;
  cardNew.querySelector('.element__photo').alt = 'Фото. ' + placeName;
  cardNew.querySelector('.element__heading').textContent = placeName;

  const cardSection = document.querySelector('.elements');
  cardSection.append(cardNew);
}

const popupCardOpen = (popup) => () => popupToggle(popup);

function popupCardSave (popup) {
  return function() {
    const popupCardName = popup.querySelector('.popup__item_el_name');
    const popupCardSrc = popup.querySelector('.popup__item_el_position');
    cardElementCreate(popupCardName.value, popupCardSrc.value);
    popupCardName.value = '';
    popupCardSrc.value = '';
    popupToggle(popup);
  }
}


editButton.addEventListener('click', popupProfileOpen(popupProfile));
profileCloseButton.addEventListener('click', popupClose(popupProfile));
profileSaveButton.addEventListener('click', popupProfileSave(popupProfile));

addPlaceButton.addEventListener('click', popupCardOpen(popupCardAdd));
placeCloseButton.addEventListener('click', popupClose(popupCardAdd));
placeSaveButton.addEventListener('click', popupCardSave(popupCardAdd));



cardElementCreate('Гггоры', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg');


// const password = prompt('Введите пароль:', '');

// for (let i = 0; i <= password.length; i = i + 1) {
//     if (password[i] === '?' ) {
//     console.log('"?" есть в пароле на позиции ' + (i + 1));
//     break;
//     }
// }
