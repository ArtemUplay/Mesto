const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAddPlace = document.querySelector('.profile__add-button');

const cardsSection = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;

const popupProfile = document.querySelector('.popup_type_profile');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const profileSaveButton = popupProfile.querySelector('.popup__button');
const popupUserName = popupProfile.querySelector('.popup__item_el_name');
const popupUserPosition = popupProfile.querySelector('.popup__item_el_position');


const popupCardAdd = document.querySelector('.popup_type_card');
const buttonClosePlace = popupCardAdd.querySelector('.popup__close-button');
const buttonSavePlace = popupCardAdd.querySelector('.popup__button');
const popupCardName = popupCardAdd.querySelector('.popup__item_el_name');
const popupCardSrc = popupCardAdd.querySelector('.popup__item_el_position');

const popupCardView = document.querySelector('.popup_type_img');
const buttonCloseView = popupCardView.querySelector('.popup__close-button');
const popupPhoto = popupCardView.querySelector('.popup__photo');
const popupHeading = popupCardView.querySelector('.popup__heading');



const profileUserName = document.querySelector('.profile__username');
const profileUserPosition = document.querySelector('.profile__user-position');
// let popupUserName = popup.querySelector('.popup__item_el_username');
// let popupUserPosition = popup.querySelector('.popup__item_el_position');


function openProfilePopup () {
  return function (){
    popupUserName.value = profileUserName.textContent;
    popupUserPosition.value = profileUserPosition.textContent;
    popupProfile.classList.add('popup_opened');
  }
}

function closeProfilePopup () {
  return function() {
    popupProfile.classList.remove('popup_opened');
  }
}

function saveProfileFromPopup () {
  return function() {
    profileUserName.textContent = popupUserName.value;
    profileUserPosition.textContent = popupUserPosition.value;
    popupProfile.classList.remove('popup_opened');
  }
}


function createCardElement (placeName, placePhotoSrc) {
  const cardNew = cardTemplate.querySelector('.element').cloneNode(true);
  const photoCardNew = cardNew.querySelector('.element__photo');

  photoCardNew.src = placePhotoSrc;
  photoCardNew.alt = 'Фото. ' + placeName;
  cardNew.querySelector('.element__heading').textContent = placeName;
  cardNew.querySelector('.element__delete-button').addEventListener('click', function() {
    const cardElement = cardNew.querySelector('.element__delete-button').closest('.element');
    cardElement.remove();
  })
  cardNew.querySelector('.element__like').addEventListener('click', function (evt){
    evt.target.classList.toggle('element__like_active');
  })

  photoCardNew.addEventListener('click', openCardViewPopup(placePhotoSrc, placeName));

  return cardNew;
}

function insertCard2Page (card) {
  cardsSection.prepend(card);
}

function saveCardfromPopup () {
  return function() {
    const newCard = createCardElement(popupCardName.value, popupCardSrc.value);
    insertCard2Page(newCard);
    popupCardAdd.classList.remove('popup_opened');
  }
}

function openCardAddPopup () {
  return function () {
  popupCardName.value = '';
  popupCardSrc.value = '';
  popupCardAdd.classList.add('popup_opened');
  }
}

function openCardViewPopup(src, alt){
return function (){

  popupPhoto.setAttribute('src', src);
  popupPhoto.setAttribute('alt', alt);
  popupHeading.textContent = alt;
  popupCardView.classList.add('popup_opened');
}
}

const closePopup = (popup) => () => {
  popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', openProfilePopup());
profileCloseButton.addEventListener('click', closeProfilePopup());
profileSaveButton.addEventListener('click', saveProfileFromPopup());

buttonAddPlace.addEventListener('click', openCardAddPopup());
buttonClosePlace.addEventListener('click', closePopup(popupCardAdd));
buttonSavePlace.addEventListener('click', saveCardfromPopup());
buttonCloseView.addEventListener('click', closePopup(popupCardView));

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
    const newCard = createCardElement(element.name, element.link);
    insertCard2Page(newCard);
  });


// const password = prompt('Введите пароль:', '');

// for (let i = 0; i <= password.length; i = i + 1) {
//     if (password[i] === '?' ) {
//     console.log('"?" есть в пароле на позиции ' + (i + 1));
//     break;
//     }
// }
