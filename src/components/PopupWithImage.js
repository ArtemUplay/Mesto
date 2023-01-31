import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__photo');
    this._popupImageCaption = this._popup.querySelector('.popup__heading_type_img');
  }

  open(placeName, srcImg) {
    this._popupImageCaption.textContent = placeName;
    this._popupImage.src = srcImg;
    this._popupImage.alt = placeName;
    super.open();
  }
}
