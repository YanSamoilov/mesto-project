export default class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);

  }

  _handleClosePopupOverlay = (evt) => {
    if (evt.target.classList.contains('popup_active'))
      this.close();
  }

  _handleClosePopupEsc = (evt) => {
    if (evt.key === 'Escape')
      this.close();
  }

  open() {
    this.popup.classList.add('popup_active');
    document.addEventListener('keydown', this._handleClosePopupEsc);
  }


  close() {
    this.popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleClosePopupEsc);
  }

  setEventListeners() {
    this.popup.querySelector('.popup__close').addEventListener('click', () => this.close());
    this.popup.addEventListener('click', this._handleClosePopupOverlay.bind(this));
  }
}
