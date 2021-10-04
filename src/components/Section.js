export {Section}

class Section {
  constructor({items, renderer}, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
		this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.append(element);
  }

  renderedItems() {
    this._renderedItems.forEach(element => {
      this._renderer(element);
    });
  }
}
