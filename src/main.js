import {generatePoint} from './mock/point.js';
import {RenderPosition, render, replace} from './render.js';
import PointsContainer from './view/points-container.js';
import SortPoints from './view/sort-points.js';
import Point from './view/point.js';
import EditPoint from './view/edit-point.js';
import MainMenu from './view/main-menu.js';
import FilterPoints from './view/filter-points.js';

const EVENT_COUNT = 20;

const points = Array.from({length: EVENT_COUNT}, generatePoint);

const renderPoint = (container, point) => {
  const pointComponent = new Point(point);
  const editPointComponent = new EditPoint(point);

  pointComponent.setEditClickHandler(() => {
    replace(editPointComponent, pointComponent);
  });

  editPointComponent.setFormSubmitHandler(() => {
    replace(pointComponent, editPointComponent);
  });

  render(container, pointComponent, RenderPosition.BEFOREEND);
};

const siteHeader = document.querySelector('.page-header');
const mainTripInfoContainer = siteHeader.querySelector('.trip-main');
const menuContainer = mainTripInfoContainer.querySelector('.trip-controls__navigation');
const filterContainer = mainTripInfoContainer.querySelector('.trip-controls__filters');
const mainContent = document.querySelector('.page-main');
const tripListContainer = mainContent.querySelector('.trip-events');

render(menuContainer, new MainMenu(), RenderPosition.BEFOREEND);
render(filterContainer, new FilterPoints(), RenderPosition.BEFOREEND);
render(tripListContainer, new SortPoints(), RenderPosition.BEFOREEND);
render(tripListContainer, new PointsContainer(), RenderPosition.BEFOREEND);

const pointsContainer = mainContent.querySelector('.trip-events__list');

for (let i = 0; i < EVENT_COUNT; i++) {
  renderPoint(pointsContainer, points[i]);
}

