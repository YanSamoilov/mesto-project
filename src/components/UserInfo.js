export default class User {
  constructor({profileName, profileDescription, profileAvatar}) {
    this._name = profileName;
    this._description = profileDescription;
    this._avatar = profileAvatar;
  }
  getUser(){
    return {name: this._name.textContent,
      description: this._description.textContent}
  }

  getUserAvatar() {
    return this._avatar.src;
  }

  setUserInfo({name, description}) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  setUserAvatar(url) {
    this._avatar.src = url;
  }
}


