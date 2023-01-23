import { createCardElement, insertCard2Page } from './card_module.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, cleanValidationErrors, validationConfig } from './validate.js';
import { api, getUserProfile, postCard, patchProfile, patchAvatar } from './api.js';
import { renderLoading, fillProfile, profileAvatar } from './utils.js';

import '../pages/index.css';

import Card from './Card.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAddPlace = document.querySelector('.profile__add-button');

const popupCardAdd = document.querySelector('.popup_type_card');
const popupProfile = document.querySelector('.popup_type_profile');


const popupUserName = popupProfile.querySelector('.popup__item_el_name');
const popupUserPosition = popupProfile.querySelector('.popup__item_el_position');
const profileUserName = document.querySelector('.profile__username');
const profileUserPosition = document.querySelector('.profile__user-position');

const popupCardName = popupCardAdd.querySelector('.popup__item_el_name');
const popupCardSrc = popupCardAdd.querySelector('.popup__item_el_position');

const buttonSavePlace = popupCardAdd.querySelector('.popup__button');
const profileSaveButton = popupProfile.querySelector('.popup__button');

const cardCreateForm = document.forms.cardCreateForm;
const userProfileForm = document.forms.userprofileform;

const buttonAvatarEdit = document.querySelector('.profile__avatar-container');
const popupAvatar = document.querySelector('.popup_type_avatar');
const userAvatarForm = document.forms.useravatarform;
const buttonSaveAvatar = popupAvatar.querySelector('.popup__button');
const popupAvatarUrl = userAvatarForm.elements.position;

let userId = 1;

// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

// initialCards.forEach(element => {
//   const newCard = createCardElement(element.name, element.link);
//   insertCard2Page(newCard);
// });

function openProfilePopup() {
  popupUserName.value = profileUserName.textContent;
  popupUserPosition.value = profileUserPosition.textContent;
  cleanValidationErrors(popupProfile, validationConfig);
  openPopup(popupProfile);
}

// function saveProfileFromPopup() {
//   if (!profileSaveButton.disabled) {
//     profileUserName.textContent = popupUserName.value;
//     profileUserPosition.textContent = popupUserPosition.value;
//     closePopup(popupProfile);
//   }
// }

function openCardAddPopup() {
  popupCardName.value = '';
  popupCardSrc.value = '';
  cleanValidationErrors(popupCardAdd, validationConfig);
  buttonSavePlace.disabled = true;
  openPopup(popupCardAdd);
}

// function saveCardfromPopup() {
//   if (!buttonSavePlace.disabled) {
//     const newCard = createCardElement(popupCardName.value, popupCardSrc.value);
//     insertCard2Page(newCard);
//     closePopup(popupCardAdd);
//   }
// }



// popupCardAdd.addEventListener('keydown', function(evt) {
//   if (evt.key === 'Enter') {
//     saveCardfromPopup();
//     cardCreateForm.submit();
//   }
// });

const popupEdit = new Popup('.popup_type_profile');
const popupImage = new PopupWithImage('.popup_type_img');
// popupImage.open(1,2);

buttonEdit.addEventListener('click', popupEdit.open.bind(popupEdit));

popupEdit.setEventListeners();
popupImage.setEventListeners();

// buttonEdit.addEventListener('click', openProfilePopup);
userProfileForm.addEventListener('submit', saveProfileFromPopup);

// buttonAddPlace.addEventListener('click', openCardAddPopup);
// cardCreateForm.addEventListener('submit', saveCardfromPopup);

buttonAvatarEdit.addEventListener('click', () => {
  popupAvatarUrl.textContent = "";
  cleanValidationErrors(popupAvatar, validationConfig);
  buttonSaveAvatar.disabled = true;
  openPopup(popupAvatar);
})

userAvatarForm.addEventListener('submit', updateAvatar);

enableValidation(validationConfig);



// Promise.all([getUserProfile(), getCards()])
//   // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
//   // .then((results) => {
//   //   const userData = results[0];
//   //   const cards = results[1];
//   // })
//   .then((results) => {
//     const userData = results[0];
//     const cards = results[1];
//     // тут установка данных пользователя
//     fillProfile(userData);
//     userId = userData._id;
//     // и тут отрисовка карточек
//     cards.reverse().forEach(element => {
//       const newCard = createCardElement(element.name, element.link, element.likes.length, element._id, element.owner._id, userId);
//       insertCard2Page(newCard);
//       if (element.likes.findIndex(e => e._id === userId) !== -1) {
//         const cardLike = newCard.querySelector('.element__like');
//         cardLike.classList.add('element__like_active');
//       }
//     });
//   })
//   .catch(err => {
//     // тут ловим ошибку
//     console.log(err);
//   });

Promise.all([getUserProfile(), api.getCards()])
  // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
  // .then((results) => {
  //   const userData = results[0];
  //   const cards = results[1];
  // })
  .then((results) => {
    const userData = results[0];
    const cards = results[1];
    // тут установка данных пользователя
    fillProfile(userData);
    userId = userData._id;
    // и тут отрисовка карточек

    const cardList = new Section({
      data: cards,
      renderer: (element) => {
        const newCard = new Card(element, (cardId) => { return api.likeCard(cardId) }, (cardId) => { return api.dislikeCard(cardId) }, '#element-template', popupImage.open.bind(popupImage));
        const cardElement = newCard.generate();
        cardList.setItem(cardElement);
      }
    }, '.elements');

    cardList.renderItems();

    const popupAddCard = new PopupWithForm('.popup_type_card', () => {
      api.postCard(popupAddCard._getInputValues())
        .then((element) => {
          cardList._renderedItems.unshift(element);
          cardList.renderItems();
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
    });

    buttonAddPlace.addEventListener('click', popupAddCard.open.bind(popupAddCard))
    popupAddCard.setEventListeners();

    // cards.reverse().forEach(cardElement => {
    //   console.log(cardElement);
    //   // const newCard = createCardElement(element.name, element.link, element.likes.length, element._id, element.owner._id, userId);
    //   const newCard = new Card(cardElement, '#element-template');
    //   insertCard2Page(newCard.generate());
    //   if (cardElement.likes.findIndex(e => e._id === userId) !== -1) {
    //     const cardLike = newCard.querySelector('.element__like');
    //     cardLike.classList.add('element__like_active');
    //   }
    // });
  })
  .catch(err => {
    // тут ловим ошибку
    console.log(err);
  });

//загрузка профиля
// getUserProfile()
// fetch('https://nomoreparties.co/v1/plus-cohort-18/users/me', {
//   headers: {
//     authorization: 'd95e8e0f-5717-4536-87da-f10af028f83a'
//   }
// })
//   .then((res) => {
//     return res.json();
//   })
// .then(checkResponse)
// .then((data) => {
//   fillProfile(data);
//   userId = data._id;
//   console.log(userId);

// })
// .catch((err) => console.log(`Ошибка: ${err}`))

//загрузка карточек
// getCards()
// .then(checkResponse)
//   .then((data) => {
//      data.forEach(element => {
//       const newCard = createCardElement(element.name, element.link, element.likes.length, element._id, element.owner._id, userId);
//       insertCard2Page(newCard);
//       if (element.likes.findIndex(e => e._id === userId) !== -1) {
// console.log(newCard);
// const cardLike = newCard.querySelector('.element__like');
// console.log(cardLike);
// cardLike.classList.add('element__like_active');
//     }
//   });
// })
// .catch((err) => console.log(`Ошибка: ${err}`))

const data = {
  cardId: 1,
  placeName: 'Тест класс',
  placePhotoSrc: 'https://habrastorage.org/files/3a3/4b9/774/3a34b977425e41e5855833cb3d5c1fed.png',
  likesNumbers: 100,
}

//запостить карточку
// function saveCardfromPopup() {
//   if (!buttonSavePlace.disabled) {

//     renderLoading(popupCardAdd, "Сохранение...");
//     postCard(popupCardName.value, popupCardSrc.value)
//       // .then(checkResponse)
//       // .then((res) => {
//       //   if (res.ok) {
//       //     return res.json();
//       //   }
//       //    return Promise.reject(res.status);
//       // })
//       .then((element) => {
//         const newCard = createCardElement(element.name, element.link, element.likes.length, element._id, element.owner._id, userId);
//         insertCard2Page(newCard);
//         closePopup(popupCardAdd);
//       })
//       .catch((err) => console.log(`Ошибка: ${err}`))
//       .finally(() => {
//         renderLoading(popupCardAdd, "Создать");
//       });
//   }
// }

//отредактировать профиль
function saveProfileFromPopup() {
  if (!profileSaveButton.disabled) {
    renderLoading(popupProfile, "Сохранение...");
    patchProfile(popupUserName.value, popupUserPosition.value)
      // .then(checkResponse)
      .then((element) => {
        profileUserName.textContent = element.name;
        profileUserPosition.textContent = element.about;
        closePopup(popupProfile);
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        renderLoading(popupProfile, "Сохранить");
      });
  }
}

//поменять аватар

function updateAvatar() {
  if (!buttonSaveAvatar.disabled) {
    renderLoading(popupAvatar, "Сохранение...");
    patchAvatar(popupAvatarUrl.value)

      // .then(checkResponse)
      .then((res) => {
        profileAvatar.src = popupAvatarUrl.value;
        popupAvatarUrl.value = "";
        closePopup(popupAvatar);
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        renderLoading(popupAvatar, "Сохранить");
      });
  }
}



