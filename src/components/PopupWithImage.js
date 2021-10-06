import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector, src, name) {
    super(selector);
    this.src = src;
    this.name = name;

    this.largerImage = document.querySelector('.popup__larger-image');
    this.figCaption = document.querySelector('.popup__figcaption');
  }

  open() {
    super.open();

    this.largerImage.setAttribute('src', this.src);
    this.figCaption.textContent = this.name;
  }
}
