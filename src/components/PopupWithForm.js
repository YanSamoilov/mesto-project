import Popup from './Popup';

class PopupWithForm extends Popup {
  constructor (selector, formSubmitCallback) {
    super(selector);
    this._formSubmit = formSubmitCallback;
    this._popupForm = this._popup.querySelector('popup__main-container');
    this._inputsArray = Array.from(this._popupForm.querySelectorAll('popup__form'));
  }

  //получаем данные из полей ввода
  _getInputValues () {
    this._dataSet= {};
    this._inputsArray.forEach(item => {
      this._dataSet[item.name] = item.value;
      return this._dataSet;
    });
  }

  //Слушатель на кнопке submit
  _setEventListeners() {
    this._popup.addEventListeners('submit', evt => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    })

  }
  //перезаписал родительский метод
  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;