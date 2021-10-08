export {Api}

class Api {
  constructor(token, serverURL) {
    this.token = token;
    this.serverURL = serverURL;
  }

  //Обработка ответа сервера
  _checkResponse = (res) => {
    if(res.ok) {
      return res.json();
    }
    else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  //Получение информации о пользователе с сервера
  _getUserInfo() {
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
    return Promise.all([this._getUserInfo(), this._getCardslist()])
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

  patchUserProfile (dataUser) {
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

  patchUserAvatarToServer(data) {
  return fetch(`${this.serverURL}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: this.token,
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({data})
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
}

// export {getCardslist, addCard, deleteCard, getUserInfo, patchUserProfile, getInfoArray, putLike, deleteLikeRequest, patchAvatar};

// const token = '981a6ce5-6623-4e6e-80d4-27c651744329';
// const serverURL = 'https://nomoreparties.co/v1/plus-cohort-1/'

// //Обработка ответа сервера
// const checkResponse = (res) => {
//   if(res.ok) {
//     return res.json();
//   }
//   else {
//     return Promise.reject(`Ошибка ${res.status}`);
//   }
// }

// // Запрос на отправку смены аватара
// const patchAvatar = (avatarURL) => {
//   return fetch(`${serverURL}users/me/avatar`, {
//     method: 'PATCH',
//     headers: {
//       authorization: token,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       avatar: avatarURL
//     })
//   })
//     .then(checkResponse)
// }

// //Отправить запрос на отмену лайка
// const deleteLikeRequest = (cardId) => {
//   return fetch(`${serverURL}cards/likes/${cardId}`, {
//     method: 'DELETE',
//     headers: {
//       authorization: token
//     }
//   })
//     .then(checkResponse)
// }

// //Отправить запрос на постановку лайка
// const putLike = (cardId) => {
//   return fetch(`${serverURL}cards/likes/${cardId}`, {
//     method: 'PUT',
//     headers: {
//       authorization: token
//     }
//   })
//     .then(checkResponse)
// }

// const getInfoArray = () => {
//   // showPreloader(mainContainer);
//   return Promise.all([getUserInfo(), getCardslist()])
// }

// //Получение информации о пользователе с сервера
// const getUserInfo = () => {
//   return fetch(`${serverURL}users/me`, {
//     headers: {
//       authorization: token
//     }
//   })
//     .then(checkResponse)
// }

// //Получение массива карточек с сервера
// const getCardslist = () => {
//   return fetch(`${serverURL}cards`, {
//     headers: {
//       authorization: token
//     }
//   })
//     .then(checkResponse)
// }

// //Редактирование профиля
// const patchUserProfile = (newUserName, newUserActivity) => {
//   return fetch(`${serverURL}users/me`, {
//     method: 'PATCH',
//     headers: {
//       authorization: token,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: newUserName,
//       about: newUserActivity
//     })
//   })
//     .then(checkResponse)
// }

// //Добавление новой карточки
// const addCard = (nameCard, linkCard) => {
//   return fetch(`${serverURL}cards`, {
//     method: 'POST',
//     headers: {
//       authorization: token,
//       'Content-Type': 'application/json'
//       },
//     body: JSON.stringify({
//       name: nameCard,
//       link: linkCard
//     })
//   })
//     .then(checkResponse)
// }

// //Удаление карточки
// const deleteCard = (cardId) => {
//   return fetch(`${serverURL}cards/${cardId}`, {
//     method: 'DELETE',
//     headers: {
//       authorization: token
//     }
//   })
//     .then((res) => {
//       if(!res.ok) {
//         return Promise.reject(`Ошибка ${res.status}`);
//       }
//     })
// }
