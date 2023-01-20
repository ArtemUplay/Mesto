

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
    this._setEventListeners();

    this._element.dataset.cardId = this._cardId;
    this._element.querySelector('.element__photo').src = this._image;
    this._element.querySelector('.element__photo').alt = `Фото. + ${this._placeName}`;
    this._element.querySelector('.element__heading').textContent = this._placeName;
    this._element.querySelector('.element__likes-counter').textContent = this._likesNumber;

    return this._element;

  }

  _setEventListeners() {
    console.log(this._element);
    this.buttonLike = this._element.querySelector('.element__like');

    this.buttonLike.addEventListener('click', () => {
      this.toggleLike();
    })
  }

  toggleLike() {
    this.likesCounter = this_element.querySelector('.element__likes-counter');
    this.buttonLike = this._element.querySelector('.element__like');

    if (this.buttonLike.classList.contains('element__like_active')) {
      // dislikeCard(cardElement.dataset.cardId)
      //   // .then(checkResponse)
      //   .then((data) => {
      //     likesCounter.textContent = data.likes.length
      //     likeBtn.classList.remove('element__like_active');
      //   })
      //   .catch((err) => console.log(`Ошибка: ${err}`))
      this.buttonLike.classList.remove('element__like_active');
    } else {
      // likeCard(cardElement.dataset.cardId)
      //   // .then(checkResponse)
      //   .then((data) => {
      //     likesCounter.textContent = data.likes.length;
      //     likeBtn.classList.add('element__like_active');
      //   })
      //   .catch((err) => console.log(`Ошибка: ${err}`))
      this.buttonLike.classList.add('element__like_active');
    }
  }
}
