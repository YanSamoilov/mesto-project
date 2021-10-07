export default class User {
  constructor(userSelect) {
    this._name = userSelect.name;
    this._description = userSelect.description;
    this._avatar = userSelect.avatar;
  }
  //Инициализация значений данных о юзере для предзаполнения полей данных
  getUser(){
    this._userData = {
      name: this._name.textContent,
      description: this._description.textContent
    }
    return this._userData;
  }

  getUserAvatar() {
    return this._avatar.src;
  }
  //Инициализация значений данных о юзере на странице (рендеринг данных из сервера)
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.description;
    this._setUserAvatar(data)
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}

