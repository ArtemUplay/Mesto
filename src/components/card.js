export default class Card {
  constructor({ data }, cardSelector) {
    this._cardId = data.cardId;
    this._placeName = data.placeName;
    this._image = data.placePhotoSrc;
    this._likesNumber = data.likesNumbers;
    this._selector = cardSelector;
  }

    _getElement() {
      const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
    }

    generate() {
      this._element = this._getElement();
      this._element.dataset.cardId = this._cardId;
      this._element.querySelector('.element__photo').src = this._image;
      this._element.querySelector('.element__photo').alt = `Фото. + ${this._placeName}`;
      this._element.querySelector('.element__heading').textContent = this._placeName;
      this._element.querySelector('.element__likes-counter').textContent = this._likesNumber;

      return this._element;

      }

  }
