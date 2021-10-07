export default class User {
  constructor({profileName, profileDescription, profileAvatar}, getDataFromServer, sendDataToServer) {
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


  getUserInfo() {
    getDataFromServer()
    .then ((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    })
  }


  setUserInfo({name, description}) {
    sendDataToServer(name,description)
    .then ((data) => {
      this._name.textContent = data.name;
      this._description.textContent = data.about;
    })
    .catch((err) => {
      console.log(err);
    })
  }

  setUserAvatar(url) {
    this._avatar.src = url;
  }
}


