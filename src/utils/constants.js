export const token = '981a6ce5-6623-4e6e-80d4-27c651744329';
export const serverURL = 'https://nomoreparties.co/v1/plus-cohort-1/';

export const defaultFormConfig = {
  inputSelector: '.popup__form',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass:'popup__button-save_inactive',
  inputErrorClass:  'popup__form_type_error',
  errorClass:'popup__error_active'
};
export const userEditPopup = document.querySelector('#popup-user-editor');
export const userEditPopupForm = userEditPopup.querySelector('#popup-user-edit-container');   // Попап редактирования профиля.
export const cardAddPopup = document.querySelector('#popup-add-card');
export const cardAddPopupForm = cardAddPopup.querySelector('#popup-add-card-container');          // Попап добавления карточки.
export const changeAvatarPopup = document.querySelector('#popup-change-avatar')
export const changeAvatarPopupForm = changeAvatarPopup.querySelector('#popup-change-avatar-container');

