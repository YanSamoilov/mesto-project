export {createCard, submitFormNewCard, handleDeleteCard, largeImagePopup};
import {openPopup, handleOpenImagePopup, closePopup, cardAddPopup} from './modal.js';
import {cardsList, addCardForm} from '../pages/index.js';

const largeImagePopup = document.querySelector('#popup-view-image');  // Попап просмотра увеличенного изображения.
const titleOfCard = document.querySelector('#card-title');            // Название карточки.
const srcOfCard = document.querySelector('#card-url');                // Путь карточки.

// Создание карточек из шаблона
const createCard = (item) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.cards__list-elem').cloneNode(true);
  cardElement.querySelector('.cards__title').textContent = item.name;
  cardElement.querySelector('.cards__image').src = item.link;
  cardElement.querySelector('.cards__image').alt = item.alt;
  cardElement.querySelector('.cards__like').addEventListener('click', toogleLikeCard);
  cardElement.querySelector('.cards__button-bin').addEventListener('click', handleDeleteCard);
  cardElement.querySelector('.cards__image').addEventListener('click', () =>{
    handleOpenImagePopup(item.name, item.link, item.alt);
  });
  return cardElement;
}

//Тоггл лайка на карточке
const toogleLikeCard = (evt) => {
  evt.target.classList.toggle('cards__like_active');
}

//Удалить карточку
const handleDeleteCard = (evt) => {
  const card = evt.target.closest('.cards__list-elem');
  card.remove();
}

// Добавление новой карточки пользователем в начало списка
const submitFormNewCard = (event) => {
  event.preventDefault();
  const card = {
    name: titleOfCard.value,
    link: srcOfCard.value,
    alt: titleOfCard.value
  }
  cardsList.prepend(createCard(card));
  closePopup(cardAddPopup);
  addCardForm.reset();
}
