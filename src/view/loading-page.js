import AbstractView from './abstract-view.js';

const createLoadingPageTemplate = () => ('p class="trip-events__msg">Loading...</p>');

export default class LoadingPage extends AbstractView {
  get template() {
    return createLoadingPageTemplate();
  }
}
