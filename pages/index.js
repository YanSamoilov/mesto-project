let buttonEdit = document.querySelector('.profile__user-edit');
let buttonClose = document.querySelector('.user-edit__close');
let checkActiveUserEdit = document.querySelector('.user-edit').classList;


buttonEdit.addEventListener('click', function() {
  checkActiveUserEdit.add('user-edit_active');
})

buttonClose.addEventListener('click', function() {
  checkActiveUserEdit.remove('user-edit_active');
})
