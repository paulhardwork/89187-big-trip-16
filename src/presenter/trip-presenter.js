import PointsContainer from '../view/points-container.js';
import SortPoints from '../view/sort-points.js';
import ListEmpty from '../view/list-empty.js';
import {RenderPosition, render} from '../render.js';
import PointPresenter from './point-presenter.js';

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
    const pointPresenter = new PointPresenter(this.#pointsListComponent);
    pointPresenter.init(point);
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
