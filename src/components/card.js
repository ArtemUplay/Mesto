import { dislikeCard, likeCard } from "./api";

export default class Card {
  constructor(data, cardSelector) {
    this._placeName = data.name;
    this._image = data.link;
    this._likesNumber = data.likes.length;
    this._cardId = data._id;
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
    this._setEventListeners();

    this._element.dataset.cardId = this._cardId;
    this._element.querySelector('.element__photo').src = this._image;
    this._element.querySelector('.element__photo').alt = `Фото. + ${this._placeName}`;
    this._element.querySelector('.element__heading').textContent = this._placeName;
    this._element.querySelector('.element__likes-counter').textContent = this._likesNumber;

    return this._element;

  }

  _setEventListeners() {
    this.buttonLike = this._element.querySelector('.element__like');

    this.buttonLike.addEventListener('click', () => {
      this._toggleLike();
    })
  }

  _toggleLike() {
    if (this.buttonLike.classList.contains('element__like_active')) {
      dislikeCard(this._cardId)
        .then(data => {
          this._element.querySelector('.element__likes-counter').textContent = this._likesNumber;
          this.buttonLike.classList.remove('element__like_active');
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`);
        })
    } else {
      likeCard(this._cardId)
        .then(data => {
          this._element.querySelector('.element__likes-counter').textContent = this._likesNumber;
          this.buttonLike.classList.add('element__like_active');
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`);
        })
    }
  }
}
