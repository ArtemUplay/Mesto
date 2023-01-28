import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, defaultFieldsValuesGetter) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.someFunction = async function () { return await {} };
    this._defaultFieldsValuesGetter = defaultFieldsValuesGetter || this.someFunction;
    this._formElement = document.querySelector(popupSelector).querySelector('.popup__input-container');
    this._buttonSubmitText = document.querySelector(this._popupSelector).querySelector('.popup__button').textContent;

    // this._validationClearer = validationClearer;
  }

  open() {
    this._defaultFieldsValuesGetter()
      .then((res) => {
        this._setInputValues(res);
      });
    super.open();
  }

  _renderLoading(btnText) {
    this._btnSave = document.querySelector(this._popupSelector).querySelector('.popup__button');
    this._btnSave.textContent = btnText;
    console.log(this._btnSave.textContent);
    // const normBtnTxt = btnSave.textContent;
    // if (isLoading) {
    //   btnSave.textContent = "Сохранение...";
    // } else {
    //   btnSave.textContent = normBtnTxt;
    // }
  }

  _getInputValues() {
    this._inputList = document.querySelector(this._popupSelector).querySelectorAll('.popup__item');
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;
  }

  _setInputValues(formData) {
    this._inputList = document.querySelector(this._popupSelector).querySelectorAll('.popup__item');
    this._inputList.forEach((input) => {
      console.log(input.name);
      if (typeof formData[input.name] !== "undefined") {
        input.value = formData[input.name];
      }
    })
    //есть массим инпутов
    //есть объект с данными пользователя
    //пробежаться по объекту с данными пользователя
    //если находится соответствие поля объекта и инпута, поменять значение инпута


    // this._formValues = {};
    // this._inputList.forEach(input => {
    //   this._formValues[input.name] = input.value;
    // })
    // for (let key in formData) {
    //   if (key in this._inputList) {
    //     this._inputList

    //   }
    //   this._formValues[key] = formData[key];
    // }

  }

  setEventListeners() {
    document.querySelector(this._popupSelector).addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._renderLoading('Сохранение...');
      this._handleFormSubmit(this._getInputValues())
        .then(() => {
          this.close();
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
        .finally(() => {
          this._renderLoading(this._buttonSubmitText);
        });
    })
    super.setEventListeners();
  }

  close() {
    document.querySelector(this._popupSelector).querySelector('.popup__input-container').reset();
    super.close();
  }
}
