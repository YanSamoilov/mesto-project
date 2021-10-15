import Popup from './Popup';

class PopupWithForm extends Popup {
  constructor(selector, formSubmitCallback) {
    super(selector);
    this._formSubmit = formSubmitCallback;
    this._popupForm = this.popup.querySelector('.popup__main-container');
    this._inputsArray = Array.from(this._popupForm.querySelectorAll('.popup__form'));
    this._submitButton = this._popupForm.querySelector('.popup__button-save');
  }

  //получаем данные из полей ввода
  _getInputValues() {
    this._dataSet = {};
    this._inputsArray.forEach(input => {
      this._dataSet[input.name] = input.value;
    });
    return this._dataSet;
  }
  // UX
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
      this._submitButton.setAttribute("disabled", "disabled");
    } else {
      this._submitButton.textContent = 'Сохранить';
      this._submitButton.removeAttribute("disabled");
    }
  }

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._formSubmit(this._getInputValues());
    this.close();
  }

  //Слушатель на кнопке submit
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._handleSubmitForm)
  }
  //перезаписываем родительский метод
  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;
