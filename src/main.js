import {generatePoint} from './mock/point.js';
import {RenderPosition, render} from './render.js';
import PointsContainer from './view/points-container.js';
import SortPoints from './view/sort-points.js';
import Point from './view/point.js';
import EditPoint from './view/edit-point.js';
import MainMenu from './view/main-menu.js';
import Filters from './view/filter-points.js';

const EVENT_COUNT = 20;

const points = Array.from({length: EVENT_COUNT}, generatePoint);

const siteHeader = document.querySelector('.page-header');
const mainTripInfoContainer = siteHeader.querySelector('.trip-main');
const menuContainer = mainTripInfoContainer.querySelector('.trip-controls__navigation');
const filterContainer = mainTripInfoContainer.querySelector('.trip-controls__filters');
const mainContent = document.querySelector('.page-main');
const sortContainer = mainContent.querySelector('.trip-events');

render(menuContainer, new MainMenu().element, RenderPosition.BEFOREEND);
render(filterContainer, new Filters().element, RenderPosition.BEFOREEND);
render(sortContainer, new SortPoints().element, RenderPosition.BEFOREEND);
render(sortContainer, new PointsContainer().element, RenderPosition.BEFOREEND);

const eventsContainer = mainContent.querySelector('.trip-events__list');
render(eventsContainer, new EditPoint(points[0]).element, RenderPosition.BEFOREEND);

for (let i = 1; i < EVENT_COUNT; i++) {
  render(eventsContainer, new Point(points[i]).element, RenderPosition.BEFOREEND);
}

