import {createMainMenuTemplate} from './view/main-menu.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createFilterTemplate} from './view/filter-events.js';
import {createSortOffersTemplate} from './view/sort-events.js';
import {createEditEventTemplate} from './view/edit-event.js';
import {createEventTemplate} from './view/event.js';
import {generatePoint} from './mock/point.js';

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const EVENT_COUNT = 3;

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

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

const eventsContainer = mainContent.querySelector('.trip-events__list');
renderTemplate(eventsContainer, createEditEventTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < EVENT_COUNT; i++) {
  renderTemplate(eventsContainer, createEventTemplate(points[i]), RenderPosition.BEFOREEND);
}

