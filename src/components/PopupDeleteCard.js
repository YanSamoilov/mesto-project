import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(selector, formSubmitCallback) {
    super(selector);
    this._formSubmit = formSubmitCallback;
    this.confirmDeleteBtn = document.querySelector('#button-confirm-delete-card');
  }

  setEventListeners () {
    super.setEventListeners();

    this.confirmDeleteBtn.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit();
    })
  }
}
