import PointsContainer from '../view/points-container.js';
import SortPoints from '../view/sort-points.js';
import Point from '../view/point.js';
import EditPoint from '../view/edit-point.js';
import ListEmpty from '../view/list-empty.js';
import {RenderPosition, render, replace} from '../render.js';

const EVENT_COUNT = 20;

export default class TripPresenter {
  #tripListContainer = null;
  #sortComponent = new SortPoints();
  #pointsListComponent = new PointsContainer();
  #listEmptyComponent = new ListEmpty();

  #tripPoints = [];

  constructor(tripListContainer) {
    this.#tripListContainer = tripListContainer;
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];
    render(this.#tripListContainer, this.#pointsListComponent, RenderPosition.BEFOREEND);
    this.#renderTripList();
  }

  #renderSort = () => {
    render(this.#tripListContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointComponent = new Point(point);
    const editPointComponent = new EditPoint(point);

    const replaceFormToPoint = () => {
      replace(pointComponent, editPointComponent);
    };

    const replacePointToForm = () => {
      replace(editPointComponent, pointComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this.#pointsListComponent, pointComponent, RenderPosition.BEFOREEND);
  }

  #renderListEmpty = () => {
    render(this.#pointsListComponent, this.#listEmptyComponent, RenderPosition.AFTERBEGIN);
  }

  #renderTripList = () => {
    if (this.#tripPoints.length === 0) {
      this.#renderListEmpty();
      return;
    }
    this.#renderSort();

    for (let i = 0; i < EVENT_COUNT; i++) {
      this.#renderPoint(this.#tripPoints[i]);
    }
  }
}
