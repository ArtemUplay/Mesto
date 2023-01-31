import './index.css';

import { api } from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

import {
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
} from '../utils/constansts';

const userProfile = new UserInfo(userProfileSelectors);

//popupImage
const popupImage = new PopupWithImage('.popup_type_img');

Promise.all([api.getUserProfile(), api.getCards()])
  .then((results) => {
    const userData = results[0];
    const cards = results[1];
    // тут установка данных пользователя

    const userId = userData._id;
    userProfile.setUserInfo(userData);

    // и тут отрисовка карточек

    const cardList = new Section({
      data: cards,
      renderer: (element) => {
        const newCard = new Card(element, userId, (cardId) => { return api.likeCard(cardId) }, (cardId) => { return api.dislikeCard(cardId) }, (cardId) => api.delCard(cardId), '#element-template', popupImage.open.bind(popupImage));
        const cardElement = newCard.generate();
        cardList.setItem(cardElement);
      }
    }, cardContainerSelector);

    cardList.renderItems();

    //Создание попапов

    //popupEdit
    const popupEditValidation = new FormValidator(validationConfig, userProfileForm);
    popupEditValidation.enableValidation();

    // const popupEdit = new PopupWithForm(popupProfileSelector, function () { return userProfile.setUserInfo(popupEdit._getInputValues(), api.patchProfile.bind(api)) }, popupEditValidation.cleanValidationErrors.bind(popupEditValidation), api.getUserProfile.bind(api));
    const popupEdit = new PopupWithForm(popupProfileSelector, function () {
      return (api.patchProfile(popupEdit.getInputValues())
      .then ((userData) => userProfile.setUserInfo(userData)))
    }, popupEditValidation.cleanValidationErrors.bind(popupEditValidation), api.getUserProfile.bind(api));

    buttonEdit.addEventListener('click', popupEdit.open.bind(popupEdit));



    //popupAddCard

    const popupAddCardValidation = new FormValidator(validationConfig, cardCreateForm);
    popupAddCardValidation.enableValidation();

    const popupAddCard = new PopupWithForm(popupAddCardSelector, async function () {
      return await api.postCard(popupAddCard.getInputValues())
        .then((element) => {
          const newCard = new Card(element, userId, (cardId) => { return api.likeCard(cardId) }, (cardId) => { return api.dislikeCard(cardId) }, (cardId) => api.delCard(cardId), '#element-template', popupImage.open.bind(popupImage));
          cardList.prependItem(newCard.generate())
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
    }, popupAddCardValidation.cleanValidationErrors.bind(popupAddCardValidation));
    buttonAddPlace.addEventListener('click', popupAddCard.open.bind(popupAddCard))


    //popupAvatar
    const popupAvatarValidation = new FormValidator(validationConfig, userAvatarForm);
    popupAvatarValidation.enableValidation();

    const popupAvatar = new PopupWithForm(popupAvatarSelector, async function () {
      // const avatar = popupAvatar._getInputValues();
      return (api.patchAvatar(popupAvatar.getInputValues())
      .then ((userData) => userProfile.setUserInfo(userData)))
      // return await userProfile.setUserAvatar(avatar, api.patchAvatar.bind(api))
    }, popupAvatarValidation.cleanValidationErrors.bind(popupAvatarValidation));
    buttonAvatarEdit.addEventListener('click', popupAvatar.open.bind(popupAvatar));

  })
  .catch(err => {
    // тут ловим ошибку
    console.log(err);
  });


