import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, validationClearer) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = document.querySelector(popupSelector).querySelector('.popup__input-container');
    this._validationClearer = validationClearer;
  }

  open() {
    this._validationClearer();
    super.open();
  }

  _getInputValues() {
    this._inputList = document.querySelector(this._popupSelector).querySelectorAll('.popup__item');
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;
  }

  setEventListeners() {
    document.querySelector(this._popupSelector).addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      this.close();
    })
    super.setEventListeners();
  }

  close() {
    document.querySelector(this._popupSelector).querySelector('.popup__input-container').reset();

    super.close();
  }
}
