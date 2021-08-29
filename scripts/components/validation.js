export {enableValidationForms};

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

// Сменить активность кнопки сохранения popup
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
