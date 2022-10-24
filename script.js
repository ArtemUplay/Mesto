let editButton = document.querySelector('.profile__edit-button');
let addPlaceButton = document.querySelector('.profile__add-button');
let popupProfile = document.querySelectorAll('.popup')[0];
let popupCardAdd = document.querySelectorAll('.popup')[1];
let popupCardView = document.querySelectorAll('.popup')[2];
let profileCloseButton = popupProfile.querySelector('.popup__close-button');
let profileSaveButton = popupProfile.querySelector('.popup__button');
let placeCloseButton = popupCardAdd.querySelector('.popup__close-button');
let placeSaveButton = popupCardAdd.querySelector('.popup__button');
let viewCloseButton = popupCardView.querySelector('.popup__close-button');


let profileUserName = document.querySelector('.profile__username');
let profileUserPosition = document.querySelector('.profile__user-position');
// let popupUserName = popup.querySelector('.popup__item_el_username');
// let popupUserPosition = popup.querySelector('.popup__item_el_position');



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
  cardNew.querySelector('.element__delete-button').addEventListener('click', function() {
    const CardElement = cardNew.querySelector('.element__delete-button').closest('.element');
    CardElement.remove();
  })
  cardNew.querySelector('.element__like').addEventListener('click', function (evt){
    evt.target.classList.toggle('element__like_active');
  })

  cardNew.querySelector('.element__photo').addEventListener('click', popupCardViewOpen(popupCardView, cardNew.querySelector('.element__photo').src, placeName));

  const cardSection = document.querySelector('.elements');
  cardSection.prepend(cardNew);
}

// const deleteButton = document.querySelector('.element__delete-button');
// deleteButton.addEventListener('click', function () {
//   const CardElement = deleteButton.closest('.element');
//   CardElement.remove();
// })


const popupToggleToggle = (popup) => () => popupToggle(popup);

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

function popupCardViewOpen(popup, src, alt){
return function (){
  const popupPhoto = popup.querySelector('.popup__photo');
  const popupHeading = popup.querySelector('.popup__heading');
  popupPhoto.setAttribute('src', src);
  popupPhoto.setAttribute('alt', alt);
  popupHeading.textContent = alt;
  popupToggle(popup);
}
}

editButton.addEventListener('click', popupProfileOpen(popupProfile));
profileCloseButton.addEventListener('click', popupClose(popupProfile));
profileSaveButton.addEventListener('click', popupProfileSave(popupProfile));

addPlaceButton.addEventListener('click', popupToggleToggle(popupCardAdd));
placeCloseButton.addEventListener('click', popupClose(popupCardAdd));
placeSaveButton.addEventListener('click', popupCardSave(popupCardAdd));

viewCloseButton.addEventListener('click', popupToggleToggle(popupCardView));





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

  initialCards.forEach(element => {
    cardElementCreate(element.name, element.link);
  });


// const password = prompt('Введите пароль:', '');

// for (let i = 0; i <= password.length; i = i + 1) {
//     if (password[i] === '?' ) {
//     console.log('"?" есть в пароле на позиции ' + (i + 1));
//     break;
//     }
// }
