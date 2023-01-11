import { openPopup } from "./modal.js";

const profileSection = document.querySelector('.profile');
const profileUsername = profileSection.querySelector('.profile__username');
const profileUserPosition = profileSection.querySelector('.profile__user-position');
export const profileAvatar = profileSection.querySelector('.profile__avatar');

const popupCardView = document.querySelector('.popup_type_img');
const popupPhoto = popupCardView.querySelector('.popup__photo');
const popupHeading = popupCardView.querySelector('.popup__heading');

export function openCardViewPopup(src, alt) {
  return function () {

    popupPhoto.setAttribute('src', src);
    popupPhoto.setAttribute('alt', alt);
    popupHeading.textContent = alt;
    openPopup(popupCardView);
  }
}

export function renderLoading(popup, btnText) {
  const btnSave =  popup.querySelector('.popup__button');
  btnSave.textContent = btnText;
  // const normBtnTxt = btnSave.textContent;
  // if (isLoading) {
  //   btnSave.textContent = "Сохранение...";
  // } else {
  //   btnSave.textContent = normBtnTxt;
  // }
}

export function fillProfile(profileObj) {
  profileUsername.textContent = profileObj.name;
  profileUserPosition.textContent = profileObj.about;
  profileAvatar.src = profileObj.avatar;
  profileAvatar.alt = `фотография ${profileObj.name}`;
}


