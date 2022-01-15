import Point from '../view/point.js';
import EditPoint from '../view/edit-point.js';
import {render, RenderPosition, replace} from '../render.js';

export default class PointPresenter {
  #pointsListContainer = null;
  #pointComponent = null;
  #editPointComponent = null;

  #point = null;

  constructor(pointsListContainer) {
    this.#pointsListContainer = pointsListContainer;
  }

  init = (point) => {
    this.#point = point;

    this.#pointComponent = new Point(point);
    this.#editPointComponent = new EditPoint(point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#editPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editPointComponent.setFormCloseButtonHandler(this.#handleFormSubmit);

    render(this.#pointsListContainer, this.#pointComponent, RenderPosition.BEFOREEND);
  }

  #replacePointToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  }

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  }
}
