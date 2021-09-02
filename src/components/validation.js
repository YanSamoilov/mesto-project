export {enableValidationForms, resetValidation};

// Отображать ошибку при заполнении формы
const showError = (formElem, inputElem, errorMessage, formsData) => {
  const spanError = formElem.querySelector(`.${inputElem.id}-error`);
  spanError.textContent = errorMessage;
  inputElem.classList.add(formsData.inputErrorClass);
  spanError.classList.add(formsData.errorClass);
}

// Скрыть ошибку при заполнении формы
const hideError = (formElem, inputElem, formsData) => {
  const spanError = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.remove(formsData.inputErrorClass);
  spanError.classList.remove(formsData.errorClass);
  spanError.textContent = '';
}

// Проверка на валидность input
const checkValidity = (formElem, inputElem, formsData) => {
  if (!inputElem.validity.valid) {
    showError(formElem, inputElem, inputElem.validationMessage, formsData);
  } else {
    hideError(formElem, inputElem, formsData);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Сменить активность кнопки сохранения popup при заполнении формы
const toggleSubmitActivity = (inputList, buttonSubmit, formsData) => {
  if (hasInvalidInput(inputList)) {
    buttonSubmit.classList.add(formsData.inactiveButtonClass);
    buttonSubmit.setAttribute('disabled', 'disabled');
  } else {
    buttonSubmit.classList.remove(formsData.inactiveButtonClass);
    buttonSubmit.removeAttribute('disabled');
  }
}

// Перебор input в форме для установки слушателя
const setValidationInput = (formElem, formsData) => {
  const inputList = Array.from(formElem.querySelectorAll(formsData.inputSelector));
  const buttonSubmit = formElem.querySelector(formsData.submitButtonSelector);
  toggleSubmitActivity(inputList, buttonSubmit, formsData);
  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', () => {
      checkValidity(formElem, inputElem, formsData);
      toggleSubmitActivity(inputList, buttonSubmit, formsData);
    })
  })
}

// Перебор всех форм для последующего включения валидации в содержащихся input
const enableValidationForms = (formsData) => {
  const formsList = document.querySelectorAll(formsData.formSelector);
  formsList.forEach((formElem) => {
    setValidationInput(formElem, formsData);
  })
}

//Сброс ошибки заполнения формы при повторном открытии
const resetSpanError = (popup) => {
  const spanErrorArray = popup.querySelectorAll('.popup__error');
  spanErrorArray.forEach((spanError) => {
    if(spanError.classList.contains('popup__error_active')) {
      spanError.classList.remove('popup__error_active');
      spanError.textContent = '';
    }
  });
}

//Сброс активности формы при повторном открытии
const resetInputError = (popup) => {
  const inputArray = popup.querySelectorAll('.popup__form');
  inputArray.forEach((inputElem) => {
    if(inputElem.classList.contains('popup__form_type_error')) {
      inputElem.classList.remove('popup__form_type_error');
    }
  })
}

//Сброс активности кнопки при повторном открытии
const resetActiveSubmitButton = (popup) => {
  const buttonSubmit = popup.querySelector('.popup__button-save');
  if(!buttonSubmit.classList.contains('popup__button-save_inactive')) {
    buttonSubmit.classList.add('popup__button-save_inactive');
    buttonSubmit.setAttribute('disabled', 'disabled');
  }
}

//Сброс валидации всего попапа при повторном открытии
const resetValidation = (popup) => {
  resetActiveSubmitButton(popup);
  resetSpanError(popup);
  resetInputError(popup);
}
