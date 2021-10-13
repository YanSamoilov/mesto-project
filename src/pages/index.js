import './index.css';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Сard';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm';
import User from '../components/UserInfo.js';
import { userEditPopupForm, cardAddPopup, changeAvatarPopup, buttonUserEdit,
  nameForInput,activityForInput, changeAvatar,userEditPopupTest, buttonAddCard,
  token,
  serverURL,
  defaultFormConfig,
} from '../utils/constants.js'
import {hidePreloader} from '../components/util.js';

let userId = 0;

// создаем объект api и он будет везде участвовать по идее.
const api = new Api(token, serverURL);
// создаем объект User
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
            },(evt) => {
              const popupDeleteCard = new PopupDeleteCard('#popup-confirm-delete', api, item, evt);
              popupDeleteCard.open();
            });
            const cardElement = card.generate();
            cardList.addSingleItem(cardElement);
          }
        }, '.cards__list');
        cardList.renderedItems();
      })
      .catch((err) => {
        console.log(err);
      })
})

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
popupFormEditProfile.setEventListeners()

//Валидируем формы
const editFormValidator = new FormValidator(defaultFormConfig, userEditPopupForm);
const cardFormValidator = new FormValidator(defaultFormConfig, cardAddPopup);
const editAvatarValidator = new FormValidator(defaultFormConfig, changeAvatarPopup)

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
editAvatarValidator.enableValidation();

//Функция - колбек предзаполнения полей формы редактирования профиля
const setUserInput = function(userData) {
    nameForInput.value = userData.name;
    activityForInput.value = userData.about;
    console.log(userData)
}

//Открываем popup редактирования профиля
buttonUserEdit.addEventListener('click', () => {
  editFormValidator.setInitialState();
  user.getUserInfo(api.getUser.bind(api), setUserInput)
  popupFormEditProfile.open();
})
//Открываем popup редактирования аватара
changeAvatar.addEventListener('click', ()=> {
  editAvatarValidator.setInitialState();
  popupEditAvatar.open();
})

//Открываем popup добавления карточки
buttonAddCard.addEventListener('click', () =>{
cardFormValidator.setInitialState();
popupAddCard.open();
});

//Получаем стартовые данные с сервера
api.getInfoArray()
  .then(([userInfo, cards]) => {
    userId = userInfo._id;
    const cardList = new Section ({
      items: cards,
      renderer: (item) => {
        const card = new Card(item, userId, api, '#card-template', () => {
          const popupWithImage = new PopupWithImage('#popup-view-image', item.link, item.name);
          popupWithImage.open();
        }, (evt) => {
          const popupDeleteCard = new PopupDeleteCard('#popup-confirm-delete', api, item, evt);
          popupDeleteCard.open();
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



