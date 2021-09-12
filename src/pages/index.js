export {userEditorForm, addCardForm, cardsList, avatar, changeAvatarForm};
import {submitFormNewCard, largeImagePopup, loadCards, handleDeleteCard} from '../components/card.js';
import {handleOpenUserEditor, submitFormProfile, handleClosePopup, closePopup, openPopup, cardAddPopup, nameUser, activityUser, changeAvatarPopup,
        submitNewAvatar} from '../components/modal.js';
import {enableValidationForms} from '../components/validation.js';
import {setUserInfo} from '../components/user.js';
import {getInfoArray} from '../components/api.js';
import {hidePreloader, cardTarget} from '../components/util.js';
import './index.css';

const buttonUserEdit = document.querySelector('.profile__user-edit');        // Кнопка открытия редактирования профиля.
const buttonUserEditorClose = document.querySelector('#user-editor-close');  // Кнопка закрытия редактирования профиля.
const buttonAddCard = document.querySelector('.profile__add-card');          // Кнопка добавления карточки.
const buttonAddCardClose = document.querySelector('#add-card-close');        // Кнопка закрытия окна добавления изображения.
const buttonCloseViewImage = document.querySelector('#close-larger-image');  // Кнопка закрытия окна просмотра изображения.
const buttonChangeAvatar = document.querySelector('.profile__change-avatar');    // Кнопка открытия изменения аватара.
const userEditorForm = document.querySelector('#popup-user-edit-container'); // Форма редактирования профиля.
const addCardForm = document.querySelector('#popup-add-card-container');     // Форма добавления новой карточки.
const cardsList = document.querySelector('.cards__list');                    // Список содержащий карточки.
const avatar = document.querySelector('.profile__avatar');                   // Аватар
const changeAvatarForm = document.querySelector('#popup-change-avatar-container'); // Форма смены аватара.
const buttonCloseChangeAvatar = document.querySelector('#change-avatar-close'); //Кнопка закрытия окна изменения аватара.
const buttonCloseConfirmDelete = document.querySelector('#confirm-delete-close'); //Кнопка закрытия окна изменения аватара.
const buttonConfirmDelete = document.querySelector('#button-confirm-delete-card'); //Кнопка подтверждения удаления карточки.

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
// Popup обновления аватара
buttonChangeAvatar.addEventListener('click', () => openPopup(changeAvatarPopup));
buttonCloseChangeAvatar.addEventListener('click', handleClosePopup);
changeAvatarForm.addEventListener('submit', submitNewAvatar);
// Popup подтверждения удаления карточки
buttonCloseConfirmDelete.addEventListener('click', handleClosePopup);
buttonConfirmDelete.addEventListener('click', () => handleDeleteCard(cardTarget));

getInfoArray()
  .then(([userInfo, cards]) => {
    const userId = userInfo._id;
    loadCards(cardsList, cards, userId);
    setUserInfo(nameUser, activityUser, avatar, userInfo);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    hidePreloader();
  })

enableValidationForms({
  formSelector: '.popup__main-container',
  inputSelector: '.popup__form',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__form_type_error',
  errorClass: 'popup__error_active'
});
