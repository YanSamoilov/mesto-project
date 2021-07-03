const buttonUserEdit = document.querySelector('.profile__user-edit');        // Кнопка открытия редактирования профиля.
const buttonUserEditorClose = document.querySelector('#user-editor-close');  // Кнопка закрытия редактирования профиля.
const buttonSubmit = document.querySelector('.popup__button-save');          // Кнопка подтверждения редактирования профиля.
const buttonAddCard = document.querySelector('.profile__add-card');          // Кнопка добавления карточки.
const buttonAddCardClose = document.querySelector('#add-card-close');        // Кнопка закрытия окна добавления изображения.
const buttonDeleteCard = document.querySelector('.cards__button-bin');       // Кнопка удаления изображения.
const buttonCloseViewImage = document.querySelector('#close-larger-image');  // Кнопка закрытия окна просмотра изображения.
const nameUser = document.querySelector('.profile__user-name');              // Имя пользователя на странице.
const activityUser = document.querySelector('.profile__user-action');        // Деятельность пользователя на странице.
const nameForInput = document.querySelector('#user-name');                   // Введенное имя пользователя в окне редактирования.
const activityForInput = document.querySelector('#user-activity');           // Введенное работа пользователя в окне редактирования.
const userEditorForm = document.querySelector('#popup-user-edit-container'); // Форма редактирования профиля.
const addCardForm = document.querySelector('#popup-add-card-container');     // Форма добавления новой карточки.
const largeImagePopup = document.querySelector('#popup-view-image');         // Попап просмотра увеличенного изображения.
const cardAddPopup = document.querySelector('#popup-add-card');              // Попап добавления карточки.
const userEditPopup = document.querySelector('#popup-user-editor');          // Попап редактирования профиля.
const cardsList = document.querySelector('.cards__list');                    // Список содержащий карточки.
const titleOfCard = document.querySelector('#card-title');                   // Название карточки.
const srcOfCard = document.querySelector('#card-url');                       // Путь карточки.

// Создание карточек из шаблона
const createCard = (item) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.cards__list-elem').cloneNode(true);
  cardElement.querySelector('.cards__title').textContent = item.name;
  cardElement.querySelector('.cards__image').src = item.link;
  cardElement.querySelector('.cards__image').alt = item.alt;

  cardElement.querySelector('.cards__like').addEventListener('click', function(event) {       // Слушатель каждой карточки на постановку лайка
    event.target.classList.toggle('cards__like_active');
  })

  cardElement.querySelector('.cards__button-bin').addEventListener('click', function(event) { // Слушатель каждой карточки на удаление
    handleDeleteCard(event.target);
  })

  cardElement.querySelector('.cards__image').addEventListener('click', function(event) {      // Слушатель каждой карточки на просмотр увеличенного изображения
    largeImagePopup.classList.add('popup_active');
    handleViewImage(event.target);
  })
  return cardElement;
}

// Открытие попапа
const handleOpenPopup = (popup) => {
  popup.classList.add('popup_active');
}

// Закрытие попапа
const handleClosePopup = (popup) => {
  popup.classList.remove('popup_active');
}

// Открывает редактирование профиля
const handleOpenUserEditor = () => {
  nameForInput.value = nameUser.textContent;          // Вставка в открывающийся popup имени пользователя.
  activityForInput.value = activityUser.textContent;  // Вставка в открывающийся popup деятельность пользователя.
  handleOpenPopup(userEditPopup);
}

// Сохранение введенных данных в форме редактирования профиля
const submitFormProfile = (event, popup) => {
  event.preventDefault();
  nameUser.textContent = nameForInput.value;
  activityUser.textContent = activityForInput.value;
  handleClosePopup(popup);
}

// Закрытие редактирование профиля без сохранения введенных данных
const handleCloseUserEditor = popup => {
  userEditorForm.reset();
  handleClosePopup(popup);
}

// Добавление новой карточки пользователем в начало списка
const submitFormNewCard = (event, popup) => {
  event.preventDefault();
  const card = {
    name: titleOfCard.value,
    link: srcOfCard.value,
    alt: titleOfCard.value
  }
  cardsList.prepend(createCard(card));
  handleClosePopup(popup);
  addCardForm.reset();
}

// Закрытие окна добавления карточки
const handleCloseAddCard = popup => {
  addCardForm.reset();
  handleClosePopup(popup);
}

// Удаление карточки места
const handleDeleteCard = (button) => {
  const card = button.closest('.cards__list-elem');
  card.remove();
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

buttonUserEdit.addEventListener('click', handleOpenUserEditor);
userEditorForm.addEventListener('submit', () => submitFormProfile(event, userEditPopup));
buttonUserEditorClose.addEventListener('click', () => handleCloseUserEditor(userEditPopup));
buttonAddCard.addEventListener('click', () => handleOpenPopup(cardAddPopup));
addCardForm.addEventListener('submit', () => submitFormNewCard(event, cardAddPopup));
buttonAddCardClose.addEventListener('click', () => handleCloseAddCard(cardAddPopup));
buttonCloseViewImage.addEventListener('click', () => handleClosePopup(largeImagePopup));
