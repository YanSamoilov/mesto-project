export {createCard, submitFormNewCard, handleDeleteCard, largeImagePopup, loadCards};
import {handleOpenImagePopup, closePopup, cardAddPopup} from './modal.js';
import {cardsList, addCardForm} from '../pages/index.js';
import {addCard, deleteCard} from '../components/api.js';
import {toggleCardsBin, markLikedCard, addLike, deleteLike, setButtonSubmitCondition, confirmDeleteCardPopup} from './util.js';

const largeImagePopup = document.querySelector('#popup-view-image');  // Попап просмотра увеличенного изображения.

// Создание карточек из шаблона
const createCard = (item, userId) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.cards__list-elem').cloneNode(true);
  const likeElem = cardElement.querySelector('.cards__like');
  cardElement.id = item._id;
  const cardOwnerId = item.owner._id;
  cardElement.querySelector('.cards__title').textContent = item.name;
  cardElement.querySelector('.cards__image').src = item.link;
  cardElement.querySelector('.cards__like-num').textContent = item.likes.length;
  likeElem.addEventListener('click', toogleLikeCard);
  toggleCardsBin(userId, cardOwnerId, cardElement);
  markLikedCard(item, likeElem, userId);
  cardElement.querySelector('.cards__image').addEventListener('click', () =>{
    handleOpenImagePopup(item.name, item.link, item.alt);
  });
  return cardElement;
}

//Перебор массива данных от сервера для стартовой расстановки карточек
const loadCards = (cardsList, cardsArray, userId) => {
  cardsArray.forEach(item => {
    cardsList.append(createCard(item, userId));
  })
}

//Тоггл лайка на карточке
const toogleLikeCard = (evt) => {
  const likeCard = evt.target;
  const cardId = evt.target.closest('.cards__list-elem').id;
  const cardLikeCount = evt.target.closest('.cards__list-elem').querySelector('.cards__like-num');
  if(!likeCard.classList.contains('cards__like_active')) {
    addLike(cardId, likeCard, cardLikeCount);
  }
  else {
    deleteLike(cardId, likeCard, cardLikeCount);
  }
}

//Удалить карточку
const handleDeleteCard = (cardTarget) => {
  deleteCard(cardTarget.id)
    .then(() => {
      cardTarget.remove();
      closePopup(confirmDeleteCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
}

// Добавление новой карточки пользователем в начало списка
const submitFormNewCard = (event) => {
  event.preventDefault();
  const actualButton = event.target.querySelector('.popup__button-save');
  setButtonSubmitCondition(actualButton, false);
  const nameCard = document.querySelector('#card-title').value;
  const linkCard = document.querySelector('#card-url').value;
  addCard(nameCard, linkCard)
    .then((res) => {
      cardsList.prepend(createCard(res, res.owner._id));
      closePopup(cardAddPopup);
      addCardForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonSubmitCondition(actualButton, true);
    })
}
