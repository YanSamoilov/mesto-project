export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderedItems(cardList) {
    if (cardList.length > 1) {
      for (let i = cardList.length - 1; i >= 0; i--) {
        this._renderer(cardList[i]);
      }
    }
    else {
      this._renderer(cardList);
    }
  }
}
