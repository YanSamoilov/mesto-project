import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor (selector) {
    super(selector);
  }

  open(name, link, alt) {
    const largerImage = document.querySelector('.popup__larger-image');
    const figCaption = document.querySelector('.popup__figcaption');
    largerImage.setAttribute('src', link);
    largerImage.setAttribute('alt', alt);
    figCaption.textContent = name;

    this._popup.classList.add('popup_active');
    this._setEventListeners();
  }
}
