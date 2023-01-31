import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, validationClearer, defaultFieldsValuesGetter) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._emptyFunction = async function () { return await {} };
    this._defaultFieldsValuesGetter = defaultFieldsValuesGetter || this._emptyFunction;
    this._formElement = this._popup.querySelector('.popup__input-container');
    this._btnSave = this._popup.querySelector('.popup__button');
    this._buttonSubmitText = this._popup.querySelector('.popup__button').textContent;
    this._inputList = this._popup.querySelectorAll('.popup__item');
    this._submiterForm = this._submiterForm.bind(this);
    this._validationClearer = validationClearer;
  }

  open() {
    this._defaultFieldsValuesGetter()
      .then((res) => {
        this._setInputValues(res);
      });
    super.open();
  }

  _renderLoading(isLoading, loadingText = 'Сохранение...') {

    if (isLoading) {
      this._btnSave.textContent = loadingText;
    } else {
      this._btnSave.textContent = this._buttonSubmitText;
    }
  }

  getInputValues() {
    this.formValues = {};

    this._inputList.forEach(input => {
      this.formValues[input.name] = input.value;
    })

    return this.formValues;
  }

  _setInputValues(formData) {
    this._inputList.forEach((input) => {
      if (typeof formData[input.name] !== "undefined") {
        input.value = formData[input.name];
      }
    })
  }

  _submiterForm(evt) {
    evt.preventDefault();
    this._renderLoading(true);
    this._handleFormSubmit(this.getInputValues())
      .then(() => {
        this.close();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        this._renderLoading(false);
      });
  }

  setEventListeners() {
    this._popup.addEventListener('submit', this._submiterForm);
    super.setEventListeners();
  }

  close() {
    this._formElement.reset();
    this._validationClearer();
    this._popup.removeEventListener('submit', this._submiterForm);
    super.close();
  }
}
