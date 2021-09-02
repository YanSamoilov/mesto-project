export {handleOpenUserEditor, submitFormProfile, handleClosePopup, openPopup, handleOpenImagePopup, closePopup, cardAddPopup};
import {largeImagePopup} from './card.js';
import {userEditorForm, addCardForm} from '../pages/index.js';
import {resetValidation} from './validation.js';

let noticePopupActive;
const nameForInput = document.querySelector('#user-name');              // Введенное имя пользователя в окне редактирования.
const nameUser = document.querySelector('.profile__user-name');         // Имя пользователя на странице.
const activityForInput = document.querySelector('#user-activity');      // Введенное работа пользователя в окне редактирования.
const activityUser = document.querySelector('.profile__user-action');   // Деятельность пользователя на странице.
const userEditPopup = document.querySelector('#popup-user-editor');     // Попап редактирования профиля.
const cardAddPopup = document.querySelector('#popup-add-card');         // Попап добавления карточки.

// Открытие попапа
const openPopup = (popup) => {
  popup.classList.add('popup_active');
  noticePopupActive = popup.id;
  popup.addEventListener('click', handleClosePopupOverlay);
  document.addEventListener('keydown', handleClosePopupEsc);
  if((noticePopupActive === 'popup-add-card') || (noticePopupActive === 'popup-user-editor')) resetValidation(popup);
}

// Закрытие попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_active');
}

// Открывает редактирование профиля
const handleOpenUserEditor = () => {
  nameForInput.value = nameUser.textContent;          // Вставка в открывающийся popup имени пользователя.
  activityForInput.value = activityUser.textContent;  // Вставка в открывающийся popup деятельность пользователя.
  openPopup(userEditPopup);
}

// Сохранение введенных данных в форме редактирования профиля
const submitFormProfile = event => {
  event.preventDefault();
  nameUser.textContent = nameForInput.value;
  activityUser.textContent = activityForInput.value;
  closePopup(userEditPopup);
}

// Закрытие редактирование профиля без сохранения введенных данных
const handleCloseUserEditor = () => {
  userEditorForm.reset();
  closePopup(userEditPopup);
}

// Закрытие активного popup.
const handleClosePopup = () => {
  noticePopupActive === ('popup-add-card') ? handleCloseAddCard() :
  noticePopupActive === ('popup-user-editor') ? handleCloseUserEditor() :
  noticePopupActive === ('popup-view-image') && closePopup(largeImagePopup);
}

// Закрытие при клике вне popup.
const handleClosePopupOverlay = (evt) => {
  if(evt.target.classList.contains('popup'))
    handleClosePopup();
}

// Закрытие popup кликом Esc.
const handleClosePopupEsc = (evt) => {
  if(evt.key === 'Escape')
    handleClosePopup();
}

// Закрытие окна добавления карточки
const handleCloseAddCard = () => {
  addCardForm.reset();
  closePopup(cardAddPopup);
}

// Открытие увеличенного просмотра изображения места
const handleOpenImagePopup = (name, link, alt) => {
  const largerImage = document.querySelector('.popup__larger-image');
  const figCaption = document.querySelector('.popup__figcaption');
  largerImage.setAttribute('src', link);
  largerImage.setAttribute('alt', alt);
  figCaption.textContent = name;
  openPopup(largeImagePopup);
}
