
export default class Card {
  constructor({ name, link, likes, owner, _id }, userId, api, selector, handleCardClick, handleDeleteBtnClick) {
    this.name = name;           //Название карточки
    this.link = link;           //Ссылка на картинку
    this.likes = likes;         //Массив с лайками
    this.selector = selector;   //Селектор шаблона
    this.userId = userId;       //Id активного юзера
    this.owner = owner._id;     //Id хозяина карточки для постановки корзины, потом понадобится
    this.api = api;
    this._id = _id;             //Id карточки для лайка
    this.handleCardClick = handleCardClick;
    this.handleDeleteBtnClick = handleDeleteBtnClick;
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
    this._toggleCardsBin();

    this._element.querySelector('.cards__title').textContent = this.name;
    this._element.querySelector('.cards__image').src = this.link;
    this._element.querySelector('.cards__like-num').textContent = this.likes.length;

    return this._element;
  }

  _handleClickLikeCard() {
    const likeImage = this._element.querySelector('.cards__like');
    const likeCount = this._element.querySelector('.cards__like-num');

    if (!likeImage.classList.contains('cards__like_active')) {
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

  _toggleCardsBin() {
    if (this.userId !== this.owner) {
      this._element.querySelector('.cards__button-bin').classList.add('cards__button-bin_inactive');
    }
  }

  _markLikedCard() {
    const likeElem = this._element.querySelector('.cards__like');
    if (this.likes.some(like => like._id === this.userId)) {
      likeElem.classList.add('cards__like_active');
    }
  }

  _setEventListeners() {
    this._element.querySelector('.cards__like').addEventListener('click', () => {
      this._handleClickLikeCard();
    })

    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this.handleCardClick();
    })

    this._element.querySelector('.cards__button-bin').addEventListener('click', (evt) => {
      this.handleDeleteBtnClick(evt);
    })
  }
}
