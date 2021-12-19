import {createMainMenuTemplate} from './view/main-menu.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createFilterTemplate} from './view/filter-points.js';
import {createSortOffersTemplate} from './view/sort-points.js';
import {createEditPointTemplate} from './view/edit-point.js';
import {createPointTemplate} from './view/point.js';
import {offersList} from './mock/point.js';
import {generatePoint} from './mock/point.js';

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const EVENT_COUNT = 20;

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const points = new Array(EVENT_COUNT).fill().map(() => generatePoint(offersList));

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

const eventsContainer = mainContent.querySelector('.trip-events__list');
renderTemplate(eventsContainer, createEditPointTemplate(points[0]), RenderPosition.BEFOREEND);

for (let i = 1; i < EVENT_COUNT; i++) {
  renderTemplate(eventsContainer, createPointTemplate(points[i]), RenderPosition.BEFOREEND);
}

