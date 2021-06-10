let buttonEdit = document.querySelector('.profile__user-edit');
let buttonClose = document.querySelector('.popup__close');
let checkActiveUserEdit = document.querySelector('.popup').classList;


buttonEdit.addEventListener('click', function() {
  checkActiveUserEdit.add('popup_active');
})

buttonClose.addEventListener('click', function() {
  checkActiveUserEdit.remove('popup_active');
})
