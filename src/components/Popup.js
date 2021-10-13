export default class Popup {
  constructor (selector) {
    this.popup = document.querySelector(selector);
  }

  open() {
    this.popup.classList.add('popup_active');
    this.setEventListeners();
  }

  close() {
    this.popup.classList.remove('popup_active');
    this._removeEventListeners();
  }

  setEventListeners () {
    this.popup.addEventListener('click', this._handleClosePopupOverlay);
    this.popup.querySelector('.popup__close').addEventListener('click', this._handleClosePopupButton);
    document.addEventListener('keydown', this._handleClosePopupEsc);
  }

  _removeEventListeners () {
    document.removeEventListener('keydown', this._handleClosePopupEsc);
    this.popup.removeEventListener('click', this._handleClosePopupOverlay);
    this.popup.querySelector('.popup__close').removeEventListener('click', this._handleClosePopupButton);
  }

  _handleClosePopupButton = () => {
    this.close();
  }

  _handleClosePopupOverlay = (evt) => {
    if(evt.target.classList.contains('popup'))
      this.close();
  }

  _handleClosePopupEsc = (evt) => {
    if(evt.key === 'Escape')
    this.close();
  }

}
