export {createCard, submitFormNewCard, handleDeleteCard, largeImagePopup};
import {openPopup, handleViewImage, closePopup, cardAddPopup} from './modal.js';
import {cardsList, addCardForm} from '../index.js';

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
  addCardListeners(cardElement);
  return cardElement;
}

// Слушатели увеличения картинки, лайка, удаления на каждую карточку
const addCardListeners = (cardElement) => {
  cardElement.addEventListener('click', (evt) => {
    const evtClassList = evt.target.classList;
    if (evtClassList.contains('cards__like')) {
      evtClassList.toggle('cards__like_active');
    } else if (evtClassList.contains('cards__button-bin')) {
      handleDeleteCard(evt.target);
    } else if (evtClassList.contains('cards__image')) {
      openPopup(largeImagePopup);
      handleViewImage(evt.target);
    }
  })
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

// Удаление карточки места
const handleDeleteCard = (button) => {
  const card = button.closest('.cards__list-elem');
  card.remove();
}
