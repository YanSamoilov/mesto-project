export default class User {
  constructor(dataUser) {
    this._name = document.querySelector(dataUser.name);
    this._description = document.querySelector(dataUser.description);
    this._avatar = document.querySelector(dataUser.avatar);
  }
  //Инициализация значений данных о юзере для предзаполнения полей данных
  getUser(){
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }

  getUserAvatar() {
    return this._avatar.src;
  }

  //Инициализация значений данных о юзере на странице (рендеринг данных из сервера)
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.description;
    this._avatar.src = data.avatar;
    this._avatar.alt = data.name;
  }
}

