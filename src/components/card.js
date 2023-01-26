import { api } from "./api";

export default class Card {
  constructor(data, myId, liker, disliker, deleter, cardSelector, popupOpener) {
    this._placeName = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._likesNumber = data.likes.length;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._myId = myId;
    this._selector = cardSelector;
    this._liker = liker;
    this._disliker = disliker;
    this._deleter = deleter;
    this._popupOpener = popupOpener;
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

    if (this._ownerId === this._myId) {
      this._element.querySelector('.element__delete-button').style.display = 'block';
    }

    if (this._likes.findIndex(e => e._id === this._myId) !== -1) {
      const cardLike = this._element.querySelector('.element__like');
      cardLike.classList.add('element__like_active');
    }

    return this._element;
  }

  _setEventListeners() {
    this.buttonLike = this._element.querySelector('.element__like');

    this.buttonLike.addEventListener('click', () => {
      this._toggleLike();
    })



    this.photoPlace = this._element.querySelector('.element__photo');
    this.photoPlace.addEventListener('click', () => {
      this._popupOpener(this._placeName, this._image);
    })

    this._element.querySelector('.element__delete-button').addEventListener('click', () => this._deleteCard());


  }

  _toggleLike() {
    if (this.buttonLike.classList.contains('element__like_active')) {
      this._disliker(this._cardId)
        .then(data => {
          console.log(data);
          this._element.querySelector('.element__likes-counter').textContent = data.likes.length;
          this.buttonLike.classList.remove('element__like_active');
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`);
        })
    } else {
      this._liker(this._cardId)
        .then(data => {
          console.log(data);
          this._element.querySelector('.element__likes-counter').textContent = data.likes.length;
          this.buttonLike.classList.add('element__like_active');
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`);
        })
    }
  }

  _deleteCard() {
    const cardElement = this._element.querySelector('.element__delete-button').closest('.element');
    this._deleter(cardElement.dataset.cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

}
