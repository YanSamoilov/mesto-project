
export default class Api {
  constructor(token, serverURL) {
    this.token = token;
    this.serverURL = serverURL;
  }

  //Обработка ответа сервера
  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  //Получение информации о пользователе с сервера
  getUser() {
    return fetch(`${this.serverURL}users/me`, {
      method: 'GET',
      headers: {
        authorization: this.token
      }
    })
      .then(this._checkResponse)
  }

  //Получение массива карточек с сервера
  _getCardslist() {
    return fetch(`${this.serverURL}cards`, {
      method: 'GET',
      headers: {
        authorization: this.token
      }
    })
      .then(this._checkResponse)
  }

  getInfoArray() {
    return Promise.all([this.getUser(), this._getCardslist()])
  }

  //Отправить запрос на отмену лайка
  deleteLikeRequest = (cardId) => {
    return fetch(`${this.serverURL}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token
      }
    })
      .then(this._checkResponse)
  }

  //Отправить запрос на постановку лайка
  putLike = (cardId) => {
    return fetch(`${this.serverURL}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.token
      }
    })
      .then(this._checkResponse)
  }

  patchUserProfile(dataUser) {
    return fetch(`${this.serverURL}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: dataUser.userName, //из разметки инпутов
        about: dataUser.userAbout //из разметки инпутов
      })
    })
      .then(this._checkResponse)
  }

  patchUserAvatar(data) {
    return fetch(`${this.serverURL}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.userAvatar,
      })
    })
      .then(this._checkResponse)
  }

  //Добавление новой карточки
  addCard = (data) => {
    return fetch(`${this.serverURL}cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data["card-title"],
        link: data["image-url"]
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this.serverURL}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token
      }
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
  }
}
