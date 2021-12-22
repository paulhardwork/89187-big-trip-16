import dayjs from 'dayjs';

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const destinations = ['Amsterdam', 'Geneva', 'Chamonix'];
const offerTitles = ['Order Uber', 'Switch to comfort class', 'Add meal', 'Add luggage', 'Choose seats'];
const textForDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';
const picturesDescriptions = ['Chamonix parliament building', 'Amsterdam church', 'Geneva airport'];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (array) => (array[getRandomInteger(0, array.length)]);

const shuffleArray = (array) => {
  const resultArray = [];

  while (array.length > 0) {
    const randomElement = getRandomInteger(0, array.length - 1);
    const currentElement = array.splice(randomElement, 1)[0];
    resultArray.push(currentElement);
  }

  return resultArray;
};

const generateType = () => {
  const number = getRandomInteger(0, POINT_TYPES.length - 1);

  return POINT_TYPES[number];
};

const generateDateFrom = () => {
  const maxHoursGap = 48;
  const diffCurrentTime = getRandomInteger(0, maxHoursGap);
  const startDate = dayjs().add(diffCurrentTime, 'hour').toDate();
  return startDate;
};

const generateDateTo = (startDate) => {
  const minMinuteGap = 10;
  const maxMinuteGap = 1920;
  const diffCurrentTime = getRandomInteger(minMinuteGap, maxMinuteGap);
  const finalDate = dayjs(startDate).add(diffCurrentTime, 'minute').toDate();
  return finalDate;
};

const generateDescription = () => {
  const descriptionSentences = textForDescription.split('.')
    .map( (value) => (`${value}.`));

  return shuffleArray(descriptionSentences).slice(0, getRandomInteger(1, 5)).join('');
};

const generatePicturesList = () => {
  const descriptionPicture = getRandomArrayElement(picturesDescriptions);

  return new Array(getRandomInteger(1, 3)).fill().map(() =>
    ( { src: `http://picsum.photos/300/200?r=${Math.random()}`, description: descriptionPicture } ) );
};

const generateDestination = () => {
  const name = getRandomArrayElement(destinations);

  return {
    description: generateDescription(),
    name,
    pictures: generatePicturesList(),
  };
};

const generateTypeOffers = () => (
  new Array(getRandomInteger(0, offerTitles.length))
    .fill()
    .map((value, index) => ( { id: index + 1, title: offerTitles[index], price: getRandomInteger(10, 100) } ))
);

const generatePointOffers = (offers, type) => {
  const offersForType = offers.find((item) => item.type === type );
  const offersCount = getRandomInteger(0, 5);

  if (offersCount === 0) { return []; }
  else {
    return offersForType.offers.slice(0, offersCount);
  }
};

export const offersList = new Array(POINT_TYPES.length)
  .fill()
  .map((value, index) => ( { type: POINT_TYPES[index], offers: generateTypeOffers() } ));

export const generatePoint = () => {
  const dateFrom = generateDateFrom();
  const dateTo = generateDateTo(dateFrom);
  const type = generateType();

  return {
    id: getRandomInteger(100, 100000),
    type,
    basePrice: getRandomInteger(20, 1000),
    destination: generateDestination(),
    dateFrom,
    dateTo,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: generatePointOffers(offersList, type)
  };
};


