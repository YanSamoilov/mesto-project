export {Card}

//Класс пока не принимает функции по открытию попапа большой картинки как это требуется в задании. Надеюсь, что его не сложно будет вставить позже))
class Card {
  constructor({name, link, likes, owner, _id}, userId, api, selector) {
    this.name = name;           //Название карточки
    this.link = link;           //Ссылка на картинку
    this.likes = likes;         //Массив с лайками
    this.selector = selector;   //Селектор шаблона
    this.userId = userId;       //Id активного юзера
    this.owner = owner._id;     //Id хозяина карточки для постановки корзины, потом понадобится
    this.api = api;
    this._id = _id;             //Id карточки для лайка
  }

  //Получить элемент шаблона карточки
  _getElement() {
    const cardElement = document
      .querySelector(this.selector)
      .content
      .querySelector('.cards__list-elem')
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getElement();

    this._setEventListeners();
    this._markLikedCard();

    this._element.querySelector('.cards__title').textContent = this.name;
    this._element.querySelector('.cards__image').src = this.link;
    this._element.querySelector('.cards__like-num').textContent = this.likes.length;

    return this._element;
  }

  _handleClickLikeCard() {
    const likeImage = this._element.querySelector('.cards__like');
    const likeCount = this._element.querySelector('.cards__like-num');

    if(!likeImage.classList.contains('cards__like_active')) {
      this.api.putLike(this._id)
        .then((data) => {
          likeCount.textContent = data.likes.length;
          likeImage.classList.add('cards__like_active');
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else {
      this.api.deleteLikeRequest(this._id)
        .then((data) => {
          likeCount.textContent = data.likes.length;
          likeImage.classList.remove('cards__like_active');
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  _markLikedCard() {
    const likeElem = this._element.querySelector('.cards__like');
    if(this.likes.some(like => like._id === this.userId)) {
      likeElem.classList.add('cards__like_active');
    }
  }

  _setEventListeners() {
    this._element.querySelector('.cards__like').addEventListener('click', () => {
      this._handleClickLikeCard();
    })
  }
}


// export {createCard, submitFormNewCard, handleDeleteCard, largeImagePopup, loadCards};
// import {handleOpenImagePopup, closePopup, cardAddPopup} from './modal.js';
// import {cardsList, addCardForm} from '../pages/index.js';
// import {addCard, deleteCard} from './Api.js';
// import {toggleCardsBin, markLikedCard, addLike, deleteLike, setButtonSubmitCondition, confirmDeleteCardPopup} from './util.js';

// const largeImagePopup = document.querySelector('#popup-view-image');  // Попап просмотра увеличенного изображения.

// // Создание карточек из шаблона
// const createCard = (item, userId) => {
//   const cardTemplate = document.querySelector('#card-template').content;
//   const cardElement = cardTemplate.querySelector('.cards__list-elem').cloneNode(true);
//   const likeElem = cardElement.querySelector('.cards__like');
//   cardElement.id = item._id;
//   const cardOwnerId = item.owner._id;
//   cardElement.querySelector('.cards__title').textContent = item.name;
//   cardElement.querySelector('.cards__image').src = item.link;
//   cardElement.querySelector('.cards__like-num').textContent = item.likes.length;
//   likeElem.addEventListener('click', toogleLikeCard);
//   toggleCardsBin(userId, cardOwnerId, cardElement);
//   markLikedCard(item, likeElem, userId);
//   cardElement.querySelector('.cards__image').addEventListener('click', () =>{
//     handleOpenImagePopup(item.name, item.link, item.alt);
//   });
//   return cardElement;
// }

// //Перебор массива данных от сервера для стартовой расстановки карточек
// const loadCards = (cardsList, cardsArray, userId) => {
//   cardsArray.forEach(item => {
//     cardsList.append(createCard(item, userId));
//   })
// }

// //Тоггл лайка на карточке
// const toogleLikeCard = (evt) => {
//   const likeCard = evt.target;
//   const cardId = evt.target.closest('.cards__list-elem').id;
//   const cardLikeCount = evt.target.closest('.cards__list-elem').querySelector('.cards__like-num');
//   if(!likeCard.classList.contains('cards__like_active')) {
//     addLike(cardId, likeCard, cardLikeCount);
//   }
//   else {
//     deleteLike(cardId, likeCard, cardLikeCount);
//   }
// }

// //Удалить карточку
// const handleDeleteCard = (cardTarget) => {
//   deleteCard(cardTarget.id)
//     .then(() => {
//       cardTarget.remove();
//       closePopup(confirmDeleteCardPopup);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// }

// // Добавление новой карточки пользователем в начало списка
// const submitFormNewCard = (event) => {
//   event.preventDefault();
//   const actualButton = event.target.querySelector('.popup__button-save');
//   setButtonSubmitCondition(actualButton, false);
//   const nameCard = document.querySelector('#card-title').value;
//   const linkCard = document.querySelector('#card-url').value;
//   addCard(nameCard, linkCard)
//     .then((res) => {
//       cardsList.prepend(createCard(res, res.owner._id));
//       closePopup(cardAddPopup);
//       addCardForm.reset();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       setButtonSubmitCondition(actualButton, true);
//     })
// }
