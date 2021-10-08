export default class User {
  constructor(dataUser) {
    this._name = document.querySelector(dataUser.name);
    this._about = document.querySelector(dataUser.about);
    this._avatar = document.querySelector(dataUser.avatar);
  }
  //Инициализация значений данных о юзере для предзаполнения полей данных
  getUser(){
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  getUserAvatar() {
    return this._avatar.src;
  }

  //Инициализация значений данных о юзере на странице (рендеринг данных из сервера)
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
    this._avatar.alt = data.name;
  }
}

