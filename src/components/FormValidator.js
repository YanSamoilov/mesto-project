export default class FormValidator {
    constructor(config, popupForm) {
        this.inputSelector = config.inputSelector
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config._inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = popupForm;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }

    _checkValidity(inputElement) {
        if(!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        }

    }
    _showError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }

    _toggleSubmitActivity() {
        if(this._hasInvalidInput()) {
          this._submitButtonSelector.classList.add(this._inactiveButtonClass);
          this._submitButtonSelector.setAttribute('disabled', 'disabled');
        } else {
          this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
          this._submitButtonSelector.removeAttribute('disabled');
      }
    }

    _setEventListener () {
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
        this._toggleSubmitActivity()
      });
    }

    enableValidation () {
        this._setEventListener();
    }
}
