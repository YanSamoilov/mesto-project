import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(selector, api, item, evt) {
    super(selector);
    this._api = api;
    this._item = item;
    this._evt = evt;
    this._confirmDeleteBtn = document.querySelector('#button-confirm-delete-card');
  }

  setEventListeners () {
    super.setEventListeners();

    this._confirmDeleteBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      const cardTarget = this._evt.target.closest('.cards__list-elem');
        this._api.deleteCard(this._item._id)
        .then(() => {
          cardTarget.remove();
          this.close();
        })
        .catch((err) => {
          console.log(err);
        })
    })
  }
}
