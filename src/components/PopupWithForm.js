import Popup from './Popup';

class PopupWithForm extends Popup {
  constructor (selector, formSubmitCallback) {
    super(selector);
    this._formSubmit = formSubmitCallback;
    this._popupForm = this.popup.querySelector('.popup__main-container');
    this._inputsArray = Array.from(this._popupForm.querySelectorAll('.popup__form'));
  }

  //получаем данные из полей ввода
  _getInputValues () {
    this._dataSet = {};
    this._inputsArray.forEach(input => {
      this._dataSet[input.name] = input.value;
    });
    return this._dataSet;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupForm.querySelector('.popup__button-save').textContent = 'Сохранение...';
    } else {
      this._popupForm.querySelector('.popup__button-save').textContent = 'Сохранить';
    }
  }

  //Слушатель на кнопке submit
  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    })

  }
  //перезаписал родительский метод
  close () {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;
