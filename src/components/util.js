export { toggleCardsBin, addButtonBinCard, markLikedCard, addLike, deleteLike, setButtonSubmitCondition, hidePreloader, confirmDeleteCardPopup, cardTarget };

const confirmDeleteCardPopup = document.querySelector('#popup-confirm-delete');
let cardTarget;

//Отображение кнопки удаления карточки в завимости от того кто ее создал
const toggleCardsBin = (userId, cardOwnerId, cardElement) => {
  if (userId === cardOwnerId) {
    addButtonBinCard(cardElement);
  }
  else {
    inactivateButtonBinCard(cardElement);
  }
}

//Скрыть прелоадер
const hidePreloader = () => {
  document.querySelector('.preloader').remove();
}

//Изменить состояние кнопки сохранить
const setButtonSubmitCondition = (button, active) => {
  button.disabled = !active;
  button.textContent = active ? "Сохранить" : button.textContent = "Сохранение...";
}

//Добавить слушатель удаления на карточку
const addButtonBinCard = (cardElement) => {
  cardElement.querySelector('.cards__button-bin').addEventListener('click', (evt) => {
    cardTarget = evt.target.closest('.cards__list-elem');
    openPopup(confirmDeleteCardPopup);
  });
}

//Удалить кнопку удаления карточки
const inactivateButtonBinCard = (cardElement) => {
  cardElement.querySelector('.cards__button-bin').classList.add('cards__button-bin_inactive');
}

//Закрасить собственный лайк при загрузке карточки
const markLikedCard = (card, likeElem, userId) => {
  if (card.likes.some(like => like._id === userId)) {
    likeElem.classList.add('cards__like_active');
  }
}

//Поставить лайк на карточке
const addLike = (cardId, likeCard, cardLikeCount) => {
  putLike(cardId)
    .then((data) => {
      likeCard.classList.add('cards__like_active');
      cardLikeCount.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
}

//Удалить свой лайк
const deleteLike = (cardId, likeCard, cardLikeCount) => {
  deleteLikeRequest(cardId)
    .then((data) => {
      likeCard.classList.remove('cards__like_active');
      cardLikeCount.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
}
