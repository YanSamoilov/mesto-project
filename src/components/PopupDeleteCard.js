import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(selector) {
    super(selector);
    this._confirmDeleteBtn = document.querySelector('#button-confirm-delete-card');
  }


  open(api, item, evt) {
    this._api = api;
    this._item = item;
    this._evt = evt;

    super.open();
  }

  _handleSubmitDelete = (evt) => {
    evt.preventDefault();
    this._renderLoading(true);
    const cardTarget = this._evt.target.closest('.cards__list-elem');
    this._api.deleteCard(this._item._id)
      .then(() => {
        cardTarget.remove();
        this.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this._renderLoading(false);
      });
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._confirmDeleteBtn.textContent = 'Подождите...';
      this._confirmDeleteBtn.setAttribute("disabled", "disabled");
    } else {
      this._confirmDeleteBtn.textContent = 'Да';
      this._confirmDeleteBtn.removeAttribute("disabled");
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmDeleteBtn.addEventListener('click', this._handleSubmitDelete);
  }
}
