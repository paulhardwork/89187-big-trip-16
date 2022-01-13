import {generatePoint} from './mock/point.js';
import {RenderPosition, render} from './render.js';
import MainMenu from './view/main-menu.js';
import FilterPoints from './view/filter-points.js';
import TripPresenter from './presenter/trip-presenter.js';

const EVENT_COUNT = 20;

const points = Array.from({length: EVENT_COUNT}, generatePoint);

const siteHeader = document.querySelector('.page-header');
const mainTripInfoContainer = siteHeader.querySelector('.trip-main');
const menuContainer = mainTripInfoContainer.querySelector('.trip-controls__navigation');
const filterContainer = mainTripInfoContainer.querySelector('.trip-controls__filters');
const mainContent = document.querySelector('.page-main');
const tripListContainer = mainContent.querySelector('.trip-events');
const tripPresenter = new TripPresenter(tripListContainer);

render(menuContainer, new MainMenu(), RenderPosition.BEFOREEND);
render(filterContainer, new FilterPoints(), RenderPosition.BEFOREEND);

tripPresenter.init(points);
