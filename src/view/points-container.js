import {createElement} from '../render';

const createPointsContainerTemplate = () => ('<ul class="trip-events__list"></ul>');

export default class PointsContainer {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createPointsContainerTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
