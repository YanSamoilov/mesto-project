import './index.css';
import {Api} from '../components/Api.js';
import {Section} from '../components/Section.js';
import {Card} from '../components/Card.js';
import {hidePreloader} from '../components/util.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import { userEditPopupForm, cardAddPopup, changeAvatarPopup, buttonUserEdit,
   nameForInput,activityForInput, changeAvatar,userEditPopupTest,
  changeAvatarPopupTest, buttonAddCard
} from '../utils/constants.js';

import {
  token,
  serverURL,
  defaultFormConfig,
} from '../utils/constants.js'
import PopupWithForm from '../components/PopupWithForm';
import User from '../components/UserInfo.js';

let userId = 0;

// создаем объект api и он будет везде участвовать по идее.
const api = new Api(token, serverURL);
console.log(api)
// создаем объект User и он будет везде участвовать по идее.
const user = new User ({
  name: '.profile__user-name',
  about: '.profile__user-action',
  avatar:'.profile__avatar',
});
//Создаем объект попап для добавления карточки.
const popupAddCard = new PopupWithForm('#popup-add-card',
  (dataInputs) => {
    api.addCard(dataInputs)
      .then((data) => {
        const cardList = new Section ({
          items: data,
          renderer: (item) => {
            const card = new Card(item, userId, api, '#card-template', () => {
              const popupWithImage = new PopupWithImage('#popup-view-image', item.link, item.name);
              popupWithImage.open();
            });
            const cardElement = card.generate();
            cardList.addItem(cardElement);
          }
        }, '.cards__list');
      })
      .catch((err) => {
        console.log(err);
      })
})

//Валидируем формы
const editFormValidator = new FormValidator(defaultFormConfig, userEditPopupForm);
const cardFormValidator = new FormValidator(defaultFormConfig, cardAddPopup);
const editAvatarValidator = new FormValidator(defaultFormConfig, changeAvatarPopup)

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
editAvatarValidator.enableValidation();

const popupEditAvatar = new PopupWithForm('#popup-change-avatar', (newData) => {
  popupEditAvatar.renderLoading(true)
  api.patchUserAvatar(newData)
  .then((res) => {
    user.setUserAvatar(res)
  })
  .catch((err) => console.log(err))
  .finally(() => popupEditAvatar.renderLoading(false))
})
popupEditAvatar.setEventListeners();

const popupFormEditProfile = new PopupWithForm(userEditPopupTest, (newData) => {
  popupFormEditProfile.renderLoading(true)
  api.patchUserProfile(newData)
  .then((res) => {
  user.setUserInfo(res)
  })
  .catch((err) => console.log(err))
  .finally(() => popupFormEditProfile.renderLoading(false))
})
//Обновляем данные о юзере на сервере
popupFormEditProfile.setEventListeners()

//Открываем popup редактирования профиля
buttonUserEdit.addEventListener('click', () => {
  const userData = user.getUser();
  editFormValidator.setInitialState();
  nameForInput.value = userData.name;
  activityForInput.value = userData.about;
  popupFormEditProfile.open();
})

changeAvatar.addEventListener('click', ()=> {
  editAvatarValidator.setInitialState();
  popupEditAvatar.open();
})

api.getInfoArray()                //Получаем стартовые данные с сервера
  .then(([userInfo, cards]) => {
    userId = userInfo._id;
    const cardList = new Section ({
      items: cards,
      renderer: (item) => {
        const card = new Card(item, userId, api, '#card-template', () => {
          const popupWithImage = new PopupWithImage('#popup-view-image', item.link, item.name);
          popupWithImage.open();
        });
        const cardElement = card.generate();
        cardList.addItem(cardElement);
      }
    }, '.cards__list');
    cardList.renderedItems();
    user.setUserInfo(userInfo);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    hidePreloader();
  })

//Кнопка открытия добавления карточки
buttonAddCard.addEventListener('click', () => popupAddCard.open());

//editFormValidator.setInitialState(); //вызываем при открытии popup редактирования
//cardFormValidator.setInitialState(); //вызываем при открытии popup добавления карточки
//editAvatarValidator.setInitialState(); //вызываем при открытии popup редактирования аватарки


//Это все ниже старый код потом для удаления-------------------------------------------
//===============================================================

// export {userEditorForm, addCardForm, cardsList, avatar, changeAvatarForm};
// import {submitFormNewCard, largeImagePopup, loadCards, handleDeleteCard} from '../components/card.js';
// import {handleOpenUserEditor, submitFormProfile, handleClosePopup, closePopup, openPopup, cardAddPopup, nameUser, activityUser, changeAvatarPopup,
//         submitNewAvatar} from '../components/modal.js';
// import {enableValidationForms} from '../components/validation.js';
// import {setUserInfo} from '../components/user.js';
// import {getInfoArray} from '../components/api.js';
// import {hidePreloader, cardTarget} from '../components/util.js';
// import './index.css';

// const buttonUserEdit = document.querySelector('.profile__user-edit');        // Кнопка открытия редактирования профиля.
// const buttonUserEditorClose = document.querySelector('#user-editor-close');  // Кнопка закрытия редактирования профиля.
// const buttonAddCard = document.querySelector('.profile__add-card');          // Кнопка добавления карточки.
// const buttonAddCardClose = document.querySelector('#add-card-close');        // Кнопка закрытия окна добавления изображения.
// const buttonCloseViewImage = document.querySelector('#close-larger-image');  // Кнопка закрытия окна просмотра изображения.
// const buttonChangeAvatar = document.querySelector('.profile__change-avatar');    // Кнопка открытия изменения аватара.
// const userEditorForm = document.querySelector('#popup-user-edit-container'); // Форма редактирования профиля.
// const addCardForm = document.querySelector('#popup-add-card-container');     // Форма добавления новой карточки.
// const cardsList = document.querySelector('.cards__list');                    // Список содержащий карточки.
// const avatar = document.querySelector('.profile__avatar');                   // Аватар
// const changeAvatarForm = document.querySelector('#popup-change-avatar-container'); // Форма смены аватара.
// const buttonCloseChangeAvatar = document.querySelector('#change-avatar-close'); //Кнопка закрытия окна изменения аватара.
// const buttonCloseConfirmDelete = document.querySelector('#confirm-delete-close'); //Кнопка закрытия окна изменения аватара.
// const buttonConfirmDelete = document.querySelector('#button-confirm-delete-card'); //Кнопка подтверждения удаления карточки.

// // Popup User
// buttonUserEdit.addEventListener('click', handleOpenUserEditor);
// userEditorForm.addEventListener('submit', submitFormProfile);
// buttonUserEditorClose.addEventListener('click', handleClosePopup);
// // Popup добавления карточки
// buttonAddCard.addEventListener('click', () => openPopup(cardAddPopup));
// addCardForm.addEventListener('submit', submitFormNewCard);
// buttonAddCardClose.addEventListener('click', handleClosePopup);
// // Popup увеличенного изображения.
// buttonCloseViewImage.addEventListener('click', () => closePopup(largeImagePopup));
// // Popup обновления аватара
// buttonChangeAvatar.addEventListener('click', () => openPopup(changeAvatarPopup));
// buttonCloseChangeAvatar.addEventListener('click', handleClosePopup);
// changeAvatarForm.addEventListener('submit', submitNewAvatar);
// // Popup подтверждения удаления карточки
// buttonCloseConfirmDelete.addEventListener('click', handleClosePopup);
// buttonConfirmDelete.addEventListener('click', () => handleDeleteCard(cardTarget));

// getInfoArray()
//   .then(([userInfo, cards]) => {
//     const userId = userInfo._id;
//     loadCards(cardsList, cards, userId);
//     setUserInfo(nameUser, activityUser, avatar, userInfo);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     hidePreloader();
//   })

// enableValidationForms({
//   formSelector: '.popup__main-container',
//   inputSelector: '.popup__form',
//   submitButtonSelector: '.popup__button-save',
//   inactiveButtonClass: 'popup__button-save_inactive',
//   inputErrorClass: 'popup__form_type_error',
//   errorClass: 'popup__error_active'
// });
