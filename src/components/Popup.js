export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    document.querySelector(this._popupSelector).classList.add('popup_opened');
  }

  close() {
    document.querySelector(this._popupSelector).classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    })

    document.querySelector(this._popupSelector).addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    })

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    })
  }
}
