import { openPopup } from "./modal.js";
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
