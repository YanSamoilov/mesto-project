const buttonUserEdit = document.querySelector('.profile__user-edit');       // Кнопка открытия редактирования профиля.
const buttonUserEditorClose = document.querySelector('#user-editor-close'); // Кнопка закрытия редактирования профиля.
const buttonSubmit = document.querySelector('.popup__button-save');         // Кнопка подтверждения редактирования профиля.

const buttonAddCard = document.querySelector('.profile__add-card');         // Кнопка добавления карточки.

const buttonAddCardClose = document.querySelector('#add-card-close');       // Кнопка закрытия окна добавления изображения.

const buttonDeleteCard = document.querySelector('.cards__button-bin');      // Кнопка удаления изображения.

const buttonCloseViewImage = document.querySelector('#close-larger-image'); // Кнопка закрытия окна просмотра изображения.

const nameForInput = document.querySelector('#user-name');                  // Введенное имя полльзователя в окне редактирования.
const activityForInput = document.querySelector('#user-activity');          // Введенное работа полльзователя в окне редактирования.


const userEditorForm = document.querySelector('#popup-user-edit-container'); // Форма редактирования профиля.
const addCardForm = document.querySelector('#popup-add-card-container');    // Форма добавления новой карточки.

const cardsList = document.querySelector('.cards__list');                   // Список содержащий карточки.

const userEditClassList = document.querySelector('#popup-user-editor').classList;
const cardAddPopupClassList = document.querySelector('#popup-add-card').classList;

// Массив стартовых карточек
const initialCards = [
  {
    name: 'Большая голубая дыра',
    link: './images/bigBlue.jpg',
    alt: 'Темное круглое пятно в океане, означающее, что там глубоко.'
  },
  {
    name: 'Антарктида',
    link: './images/antarctica.jpg',
    alt: 'Океан омывает ледяные горы.'
  },
  {
    name: 'Мадагаскар',
    link: './images/madagaskar.jpg',
    alt: 'Темнокожие женщины идут по проселочной дороге на фоне африканские деревья.'
  },
  {
    name: 'Амазонка',
    link: './images/amazonka.jpg',
    alt: 'Из самолета видно извилистое русло реки в джунглях.'
  },
  {
    name: 'Большой барьерный риф',
    link: './images/Great-Barrier-Reef.jpg',
    alt: 'Извилистая длинная полоса рифов в воде окенана.'
  },
  {
    name: 'Под водой',
    link: './images/underwater.jpg',
    alt: 'Коралл под водой.'
  }
]



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
    deleteCard(event.target);
  })

  cardElement.querySelector('.cards__image').addEventListener('click', function(event) {      // Слушатель каждой карточки на просмотр увеличенного изображения
    document.querySelector('#popup-view-image').classList.add('popup_active');
    viewImage(event.target);
  })
  return cardElement;
}

// Открывает редактирование профиля
const openUserEditor = () => {
  nameForInput.setAttribute('placeholder', document.querySelector('.profile__user-name').textContent);          // Вставка в открывающийся popup имени пользователя.
  activityForInput.setAttribute('placeholder', document.querySelector('.profile__user-action').textContent);    // Вставка в открывающийся popup деятельность пользователя.
  userEditClassList.add('popup_active');
}

// Сохранение введенных данных в форме редактирования профиля
const formSubmitHandler = event => {
  event.preventDefault();
  const nameSubmitted = document.querySelector('.profile__user-name');
  const activitySubmitted = document.querySelector('.profile__user-action');
  nameSubmitted.textContent = nameForInput.value;
  activitySubmitted.textContent = activityForInput.value;
  userEditClassList.remove('popup_active');
}

// Закрытие редактирование профиля без сохранения введенных данных
const closeUserEditor = () => {
  userEditorForm.reset();
  userEditClassList.remove('popup_active');
}

// Открытие окна добавления карточки
const openAddCard = () => {
  cardAddPopupClassList.add('popup_active');
}

// Добавление новой карточки пользователем в начало списка
const addNewCard = event => {
  event.preventDefault();
  const card = {
    name: document.querySelector('#card-title').value,
    link: document.querySelector('#card-url').value,
    alt: ''
  }
  cardsList.prepend(createCard(card));
  cardAddPopupClassList.remove('popup_active');
  addCardForm.reset();
}

// Закрытие окна добавления карточки
const closeAddCard = () => {
  addCardForm.reset();
  cardAddPopupClassList.remove('popup_active');
}

// Удаление карточки места
const deleteCard = (button) => {
  const card = button.closest('.cards__list-elem');
  card.remove();
}

// Открытие увеличенного просмотра изображения места
const viewImage = (image) => {
  const largerImage = document.querySelector('.popup__larger-image');
  const figCaption = document.querySelector('.popup__figcaption');
  const elemList = image.closest('.cards__list-elem');
  largerImage.setAttribute('src', image.getAttribute('src'));
  largerImage.setAttribute('alt', image.getAttribute('alt'));
  figCaption.textContent = elemList.querySelector('.cards__title').textContent;
}

// Закрытие окна увеличенного просмотра изображений
const closeLargerImage = () => {
  document.querySelector('#popup-view-image').classList.remove('popup_active');
}

initialCards.forEach(item => {                                              // Расстановка стартовых карточек.
  cardsList.append(createCard(item));
})

const buttonLike = document.querySelector('.cards__list');                  // Кнопка лайк изображения.

buttonUserEdit.addEventListener('click', openUserEditor);
userEditorForm.addEventListener('submit', formSubmitHandler);
buttonUserEditorClose.addEventListener('click', closeUserEditor);

buttonAddCard.addEventListener('click', openAddCard);
addCardForm.addEventListener('submit', addNewCard);
buttonAddCardClose.addEventListener('click', closeAddCard);

buttonCloseViewImage.addEventListener('click', closeLargerImage);
