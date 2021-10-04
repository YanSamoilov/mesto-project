class FormValidator {
    constructor(config, popupItem) {
        this.inputSelector = config.inputSelector
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config._inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = configErrorClass;
        this._elem = popupItem;
    }

    _checkValidity(inputElement) {
        if(!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        }
            
    }

    _showError(inputElement, errorMessage) {
        const errorElement = this._element.querySelector(`${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);

    }
    _hideError(inputElement) {
        const errorElement = this._element.querySelector(`${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }

    _toggleSubmitActivity(){
        if(this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;    
        } else {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
      }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
    }
    _setEventListener () {
        this._inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
        this._buttonElement = this._element.querySelector(this._submitButtonSelector);

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
              this._checkInputValidity(inputElement);
              this._toggleButtonState();
            });
        });
    }

    enableValidation () {
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListener();
    }
}

export default FormValidator