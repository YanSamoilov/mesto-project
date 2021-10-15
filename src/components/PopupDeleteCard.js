import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(selector, api) {
    super(selector);
    this._api = api;
    this._confirmDeleteBtn = document.querySelector('#button-confirm-delete-card');
  }


  open(item, evt) {
    this._item = item;
    this._evt = evt;

    super.open();
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
