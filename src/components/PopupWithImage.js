import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

  }

  open(placeName, srcImg) {

    // console.log()
    document.querySelector(this._popupSelector).querySelector('.popup__heading_type_img').textContent = placeName;
    document.querySelector(this._popupSelector).querySelector('.popup__photo').src = srcImg;
    super.open();
  }
}
