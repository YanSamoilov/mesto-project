export {setUserInfo, setNewUserInfo, setNewAvatar};
import {patchUserProfile, patchAvatar} from './api.js';
import {closePopup} from './modal.js';
import {changeAvatarForm} from '../pages/index.js';
import {setButtonSubmitCondition} from './util.js';

//Отображение данных пользователя
const setUserInfo = (nameArea, activityArea, userAvatar, data) => {
  nameArea.textContent = data.name;
  activityArea.textContent = data.about;
  userAvatar.src = data.avatar;
}

//Обновление данных о пользователе
const setNewUserInfo = (newUserName, newUserActivity, nameArea, activityArea, userAvatar, popup) => {
  const actualButton = popup.querySelector('.popup__button-save');
  setButtonSubmitCondition(actualButton, false);
  patchUserProfile(newUserName, newUserActivity)
  .then ((data) => {
    closePopup(popup);
    setUserInfo(nameArea, activityArea, userAvatar, data);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setButtonSubmitCondition(actualButton, true);
  })
}

// Обновление аватара пользователя
const setNewAvatar = (avatarURL, popup, avatar) => {
  const actualButton = popup.querySelector('.popup__button-save');
  setButtonSubmitCondition(actualButton, false);
  patchAvatar(avatarURL)
  .then((data) => {
    avatar.src = data.avatar;
    closePopup(popup);
    changeAvatarForm.reset();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setButtonSubmitCondition(actualButton, true);
  })
}
