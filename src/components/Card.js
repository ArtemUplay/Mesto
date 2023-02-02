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
    this._cardImage = this._element.querySelector('.element__photo');
    this._cardHeading = this._element.querySelector('.element__heading');
    this._cardButtonLike = this._element.querySelector('.element__like');
    this._cardLikesCounter = this._element.querySelector('.element__likes-counter');
    this._cardButtonDelete = this._element.querySelector('.element__delete-button');


    this._setEventListeners();

    this._element.dataset.cardId = this._cardId;
    this._cardImage.src = this._image;
    this._cardImage.alt = `Фото. + ${this._placeName}`;
    this._cardHeading.textContent = this._placeName;
    this._cardLikesCounter.textContent = this._likesNumber;


    if (this._ownerId === this._myId) {
      this._cardButtonDelete.style.display = 'block';
    }

    if (this._likes.findIndex(e => e._id === this._myId) !== -1) {
      this._cardButtonLike.classList.add('element__like_active');
    }

    return this._element;
  }


  _setEventListeners() {
    this._cardButtonLike.addEventListener('click', () => {
      this._toggleLike();
    })

    this._cardImage.addEventListener('click', () => {
      this._popupOpener(this._placeName, this._image);
    })

    this._cardButtonDelete.addEventListener('click', () => this._deleteCard());
  }

  _toggleLike() {
    if (this._cardButtonLike.classList.contains('element__like_active')) {
      this._disliker(this._cardId)
        .then(data => {
          this._cardLikesCounter.textContent = data.likes.length;
          this._cardButtonLike.classList.remove('element__like_active');
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`);
        })
    } else {
      this._liker(this._cardId)
        .then(data => {
          this._cardLikesCounter.textContent = data.likes.length;
          this._cardButtonLike.classList.add('element__like_active');
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`);
        })
    }
  }

  _deleteCard() {
    this._deleter(this._element.dataset.cardId)
      .then(() => {
        this._element.remove();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }
}
