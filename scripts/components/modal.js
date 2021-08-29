export {handleOpenUserEditor, submitFormProfile, handleClosePopup, openPopup, handleViewImage, closePopup, cardAddPopup};
import {largeImagePopup} from './card.js';
import {userEditorForm, addCardForm} from '../index.js';

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
  noticePopupActive === ('popup-view-image') ? closePopup(largeImagePopup) : '';
}

// Закрытие при клике вне popup.
const handleClosePopupOverlay = (evt) => {
  evt.target.classList.contains('popup') ? handleClosePopup() : '';
}

// Закрытие popup кликом Esc.
const handleClosePopupEsc = (evt) => {
  evt.key === 'Escape' ? handleClosePopup() : '';
}

// Закрытие окна добавления карточки
const handleCloseAddCard = () => {
  addCardForm.reset();
  closePopup(cardAddPopup);
}

// Открытие увеличенного просмотра изображения места
const handleViewImage = (image) => {
  const largerImage = document.querySelector('.popup__larger-image');
  const figCaption = document.querySelector('.popup__figcaption');
  const elemList = image.closest('.cards__list-elem');
  largerImage.setAttribute('src', image.getAttribute('src'));
  largerImage.setAttribute('alt', image.getAttribute('alt'));
  figCaption.textContent = elemList.querySelector('.cards__title').textContent;
}
