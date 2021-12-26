import {createElement} from '../render';

const createLoadingPageTemplate = () => ('p class="trip-events__msg">Loading...</p>');

export default class LoadingPage {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createLoadingPageTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
