import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this.largerImage = this.popup.querySelector('.popup__larger-image');
    this.figCaption = this.popup.querySelector('.popup__figcaption');
  }

  open(item) {
    super.open();

    this.largerImage.setAttribute('src', item.link);
    this.figCaption.textContent = item.name;
  }
}
