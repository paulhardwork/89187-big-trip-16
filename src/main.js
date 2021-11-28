import {createMainMenuTemplate} from "./view/main-menu.js";
import {createTripInfoTemplate} from "./view/trip-info.js";

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector('.page-header');
const mainTripInfoContainer = siteHeader.querySelector('.trip-main');
const menuContainer = mainTripInfoContainer.querySelector('.trip-controls__navigation');

renderTemplate(mainTripInfoContainer, createTripInfoTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(menuContainer, createMainMenuTemplate(), RenderPosition.BEFOREEND);
