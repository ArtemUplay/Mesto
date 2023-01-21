export default class Section {
  constructor( { data, renderer }, selector) {
    this._renderedItems = data;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._renderedItems.forEach(element => {
      this._renderer(element);
    });
  }

  setItem(element) {
    this._container.append(element);
  }
}
