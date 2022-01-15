import PointsContainer from '../view/points-container.js';
import SortPoints from '../view/sort-points.js';
import ListEmpty from '../view/list-empty.js';
import {RenderPosition, render} from '../render.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils.js';

export default class TripPresenter {
  #tripListContainer = null;
  #sortComponent = new SortPoints();
  #pointsListComponent = new PointsContainer();
  #listEmptyComponent = new ListEmpty();
  #pointPresenter = new Map();

  #tripPoints = [];

  constructor(tripListContainer) {
    this.#tripListContainer = tripListContainer;
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];
    render(this.#tripListContainer, this.#pointsListComponent, RenderPosition.BEFOREEND);
    this.#renderTripList();
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort = () => {
    render(this.#tripListContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
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

    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoint(this.#tripPoints[i]);
    }
  }

  #clearTripList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
