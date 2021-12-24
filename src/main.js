import {createMainMenuTemplate} from './view/main-menu.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createFilterTemplate} from './view/filter-points.js';
import {createSortOffersTemplate} from './view/sort-points.js';
import {createEditPointTemplate} from './view/edit-point.js';
import {createPointTemplate} from './view/point.js';
import {generatePoint} from './mock/point.js';
import {RenderPosition, render, renderTemplate} from './render.js';
import PointsContainer from './view/points-container.js';

const EVENT_COUNT = 20;

const points = Array.from({length: EVENT_COUNT}, generatePoint);

const siteHeader = document.querySelector('.page-header');
const mainTripInfoContainer = siteHeader.querySelector('.trip-main');
const menuContainer = mainTripInfoContainer.querySelector('.trip-controls__navigation');
const filterContainer = mainTripInfoContainer.querySelector('.trip-controls__filters');
const mainContent = document.querySelector('.page-main');
const sortContainer = mainContent.querySelector('.trip-events');

renderTemplate(mainTripInfoContainer, createTripInfoTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(menuContainer, createMainMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filterContainer, createFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(sortContainer, createSortOffersTemplate(), RenderPosition.BEFOREEND);
render(sortContainer, new PointsContainer().element, RenderPosition.BEFOREEND);

const eventsContainer = mainContent.querySelector('.trip-events__list');
renderTemplate(eventsContainer, createEditPointTemplate(points[0]), RenderPosition.BEFOREEND);

for (let i = 1; i < EVENT_COUNT; i++) {
  renderTemplate(eventsContainer, createPointTemplate(points[i]), RenderPosition.BEFOREEND);
}

