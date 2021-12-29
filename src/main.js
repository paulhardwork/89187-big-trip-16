import {generatePoint} from './mock/point.js';
import {RenderPosition, render} from './render.js';
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

  render(container, pointComponent.element, RenderPosition.BEFOREEND);
  pointComponent.setEditClickHandler(() => {
    container.replaceChild(editPointComponent.element, pointComponent.element);
  });

  editPointComponent.setFormSubmitHandler(() => {
    container.replaceChild(pointComponent.element, editPointComponent.element);
  });
};

const siteHeader = document.querySelector('.page-header');
const mainTripInfoContainer = siteHeader.querySelector('.trip-main');
const menuContainer = mainTripInfoContainer.querySelector('.trip-controls__navigation');
const filterContainer = mainTripInfoContainer.querySelector('.trip-controls__filters');
const mainContent = document.querySelector('.page-main');
const sortContainer = mainContent.querySelector('.trip-events');

render(menuContainer, new MainMenu().element, RenderPosition.BEFOREEND);
render(filterContainer, new FilterPoints().element, RenderPosition.BEFOREEND);
render(sortContainer, new SortPoints().element, RenderPosition.BEFOREEND);
render(sortContainer, new PointsContainer().element, RenderPosition.BEFOREEND);

const pointsContainer = mainContent.querySelector('.trip-events__list');

for (let i = 0; i < EVENT_COUNT; i++) {
  renderPoint(pointsContainer, points[i]);
}

