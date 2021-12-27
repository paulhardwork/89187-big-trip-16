import {createElement} from '../render';

const createEmptyPointsListTemplate = () => ('<p class="trip-events__msg">Click New Event to create your first point</p>');

export default class ListEmpty {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createEmptyPointsListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
