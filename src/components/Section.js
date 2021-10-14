export default class Section {
constructor ({items, renderer}, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
		this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.append(element);
  }

  addSingleItem(element) {
    this._container.prepend(element);
  }

  renderedItems() {
    if (this._renderedItems.length > 1) {
      this._renderedItems.forEach(element => {
        this._renderer(element);
      });
    }
    else {
      this._renderer(this._renderedItems);
    }

  }
}
