import AbstractView from './abstract-view.js';

const createPointsContainerTemplate = () => ('<ul class="trip-events__list"></ul>');

export default class PointsContainer extends AbstractView {
  get template() {
    return createPointsContainerTemplate();
  }
}
