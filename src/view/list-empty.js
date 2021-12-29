import AbstractView from './abstract-view.js';

const createEmptyPointsListTemplate = () => ('<p class="trip-events__msg">Click New Event to create your first point</p>');

export default class ListEmpty extends AbstractView {
  get template() {
    return createEmptyPointsListTemplate();
  }
}
