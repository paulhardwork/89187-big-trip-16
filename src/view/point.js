import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

const createOffersPointTemplate = (offers) => (
  offers
    .map((value) => (
      `<li class="event__offer">
        <span class="event__offer-title">${value.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${value.price}</span>
      </li>`))
    .join(' ')
);

const calculateDurationEvent = (dateFrom, dateTo) => {
  const duration = dayjs(dateTo).diff(dateFrom, 'minute');
  let formattingDuration = '';
  let days = Math.floor(duration / 1440);
  let hours = Math.floor((duration - (days * 1440)) / 60);
  let minutes = duration - (days * 1440) - (hours * 60);

  if (days < 10) {days = `0${days}`; }
  if (hours < 10) { hours = `0${hours}`; }
  if (minutes < 10) { minutes = `0${minutes}`; }

  if (duration >= 60 && duration < 1440) {
    formattingDuration = `${hours}H ${minutes}M`;
  } else if (duration >= 1440) {
    formattingDuration = `${days}D ${hours}H ${minutes}M`;
  } else { formattingDuration = `${minutes}M`; }

  return formattingDuration;
};

const createPointTemplate = (point) => {
  const {type, dateFrom, dateTo, destination, basePrice, offers, isFavorite} = point;
  const isActive = isFavorite ? '--active' : '';
  const offersListElement = createOffersPointTemplate(offers);
  const durationEvent = calculateDurationEvent(dateFrom, dateTo);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${dayjs(dateFrom).format('MMM D')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(dateFrom).toISOString()}">${dayjs(dateFrom).format('HH:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs(dateTo).toISOString()}">${dayjs(dateTo).format('HH:mm')}</time>
        </p>
        <p class="event__duration">${durationEvent}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers.length === 0 ? '' : offersListElement}
      </ul>
      <button class="event__favorite-btn event__favorite-btn${isActive}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Point extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }
}
