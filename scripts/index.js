export {userEditorForm, addCardForm, cardsList};
import {createCard, submitFormNewCard, largeImagePopup} from './components/card.js';
import {initialCards} from './components/initial-сards.js';
import {handleOpenUserEditor, submitFormProfile, handleClosePopup, closePopup, openPopup, cardAddPopup} from './components/modal.js';
import {enableValidationForms} from './components/validation.js';

const buttonUserEdit = document.querySelector('.profile__user-edit');        // Кнопка открытия редактирования профиля.
const buttonUserEditorClose = document.querySelector('#user-editor-close');  // Кнопка закрытия редактирования профиля.
const buttonAddCard = document.querySelector('.profile__add-card');          // Кнопка добавления карточки.
const buttonAddCardClose = document.querySelector('#add-card-close');        // Кнопка закрытия окна добавления изображения.
const buttonCloseViewImage = document.querySelector('#close-larger-image');  // Кнопка закрытия окна просмотра изображения.
const userEditorForm = document.querySelector('#popup-user-edit-container'); // Форма редактирования профиля.
const addCardForm = document.querySelector('#popup-add-card-container');     // Форма добавления новой карточки.
const cardsList = document.querySelector('.cards__list');                    // Список содержащий карточки.

// Popup User
buttonUserEdit.addEventListener('click', handleOpenUserEditor);
userEditorForm.addEventListener('submit', submitFormProfile);
buttonUserEditorClose.addEventListener('click', handleClosePopup);
// Popup добавления карточки
buttonAddCard.addEventListener('click', () => openPopup(cardAddPopup));
addCardForm.addEventListener('submit', submitFormNewCard);
buttonAddCardClose.addEventListener('click', handleClosePopup);
// Popup увеличенного изображения.
buttonCloseViewImage.addEventListener('click', () => closePopup(largeImagePopup));
// Расстановка стартовых карточек.
initialCards.forEach(item => {
  cardsList.append(createCard(item));
})

enableValidationForms({
  formSelector: '.popup__main-container',
  inputSelector: '.popup__form',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__form_type_error',
  errorClass: 'popup__error_active'
});
