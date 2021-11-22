export default class FormValidator {
  constructor(config, formElement) {
      this._formElement = formElement;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;

      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.classList.add(this._errorClass);
      errorElement.textContent = errorMessage;
  }

  _hideError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
        this._showError(inputElement, inputElement.validationMessage);
    } else {
        this._hideError(inputElement);
    }

  }
  _hasInvalidInput(inputlist){
    return inputlist.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _toggleSubmitActivity() {
      if(this._hasInvalidInput(this._inputList)) {
        this._buttonSubmit.classList.add(this._inactiveButtonClass);
        this._buttonSubmit.disabled = true;
      } else {
        this._buttonSubmit.classList.remove(this._inactiveButtonClass);
        this._buttonSubmit.disabled = false;
      }
  }

  _setEventListener () {
      this._toggleSubmitActivity()
      this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleSubmitActivity();
          });
      });
  }
  //Сброс ошибок валидации при открытии popup
  setInitialState() {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
      this._toggleSubmitActivity();
    });
  }

  enableValidation () {
    this._setEventListener();
  }
}
