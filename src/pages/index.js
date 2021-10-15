import './index.css';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Сard';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm';
import User from '../components/UserInfo.js';
import {
  userEditPopupForm,
  cardAddPopup,
  changeAvatarPopup,
  buttonUserEdit,
  nameForInput,
  activityForInput,
  changeAvatar,
  userEditPopupTest,
  buttonAddCard,
  token,
  serverURL,
  defaultFormConfig
} from '../utils/constants.js'
import { hidePreloader } from '../components/util.js';

let userId = 0;

// Объект api и он будет везде участвовать по идее.
const api = new Api(token, serverURL);

// Объект User.
const user = new User({
  name: '.profile__user-name',
  about: '.profile__user-action',
  avatar: '.profile__avatar',
});

// Объект увеличенного изображения.
const popupWithImage = new PopupWithImage('#popup-view-image');
// Объект попапа удаления карточки.
const popupDeleteCard = new PopupDeleteCard('#popup-confirm-delete');


//Объект Section.
const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item);
    const cardElement = card.generate();
    cardList.addItem(cardElement);
  }
}, '.cards__list');

// Создать карточку.
const createCard = (dataCard) => {
  const card = new Card(dataCard, userId, api, '#card-template',
    () => {
      popupWithImage.open(dataCard);
    },
    (evt) => {
      popupDeleteCard.open(api, dataCard, evt);
    });
  return card;
}

//Создаем объект попап для добавления карточки.
const popupAddCard = new PopupWithForm('#popup-add-card',
  (dataInputs) => {
    popupAddCard.renderLoading(true);
    api.addCard(dataInputs)
      .then((data) => {
        cardList.renderedItems(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupAddCard.renderLoading(false));
  })

const popupEditAvatar = new PopupWithForm('#popup-change-avatar', (newData) => {
  popupEditAvatar.renderLoading(true);
  api.patchUserAvatar(newData)
    .then((res) => {
      user.setUserAvatar(res)
    })
    .catch((err) => console.log(err))
    .finally(() => popupEditAvatar.renderLoading(false))
})

const popupFormEditProfile = new PopupWithForm(userEditPopupTest, (newData) => {
  popupFormEditProfile.renderLoading(true)
  api.patchUserProfile(newData)
    .then((res) => {
      user.setUserInfo(res)
    })
    .catch((err) => console.log(err))
    .finally(() => popupFormEditProfile.renderLoading(false))
})

//Валидируем формы
const editFormValidator = new FormValidator(defaultFormConfig, userEditPopupForm);
const cardFormValidator = new FormValidator(defaultFormConfig, cardAddPopup);
const editAvatarValidator = new FormValidator(defaultFormConfig, changeAvatarPopup)

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
editAvatarValidator.enableValidation();

//Функция - колбек предзаполнения полей формы редактирования профиля
const setUserInput = function (userData) {
  nameForInput.value = userData.name;
  activityForInput.value = userData.about;
}

//Открываем popup редактирования профиля
buttonUserEdit.addEventListener('click', () => {
  editFormValidator.setInitialState();
  user.getUserInfo(api.getUser.bind(api), setUserInput)
  popupFormEditProfile.open();
})
//Открываем popup редактирования аватара
changeAvatar.addEventListener('click', () => {
  editAvatarValidator.setInitialState();
  popupEditAvatar.open();
})

//Открываем popup добавления карточки
buttonAddCard.addEventListener('click', () => {
  cardFormValidator.setInitialState();
  popupAddCard.open();
});

//Получаем стартовые данные с сервера
api.getInfoArray()
  .then(([userInfo, cards]) => {
    userId = userInfo._id;
    cardList.renderedItems(cards);
    user.setUserInfo(userInfo);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    hidePreloader();
  })
