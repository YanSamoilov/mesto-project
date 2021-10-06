class Popup {
  constructor (selector) {
    this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add('popup_active');
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_active');
    this._removeEventListeners();
  }

  _setEventListeners () {
    this._popup.querySelector('.popup__close').addEventListener('click', () => { this.close()});
    this._popup.addEventListener('click', () => {
			this._handleOverlayClose();
		});
    this._popup.addEventListener('keydown', () => {
      this._handleEscClose();
    });
  }

  _removeEventListeners () {
    this._popup.removeEventListener('click', () => {
			this._handleOverlayClose();
		});
    this._popup.removeEventListener('keydown', () => {
      this._handleEscClose();
    });
  }

  _handleOverlayClose (evt) {
    if(evt.target.classList.contains('popup'))
      this.close();
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape')
    this.close();
  }
}

export default Popup
