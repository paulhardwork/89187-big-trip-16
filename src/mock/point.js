import dayjs from 'dayjs';

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const destinations = ['Amsterdam', 'Geneva', 'Chamonix'];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
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
  const maxMinuteGap = 1440;
  const diffCurrentTime = getRandomInteger(minMinuteGap, maxMinuteGap);
  const finalDate = dayjs(startDate).add(diffCurrentTime, 'minute').toDate();
  return finalDate;
};

const generateDestination = () => {

  const generateDescription = () => {
    const descriptionSentences = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
      'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
      'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
      'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
      'Sed sed nisi sed augue convallis suscipit in sed felis.',
      'Aliquam erat volutpat.',
      'Nunc fermentum tortor ac porta dapibus.',
      'In rutrum ac purus sit amet tempus.'
    ];
    let leftBorder = getRandomInteger(0, descriptionSentences.length - 1);
    let rightBorder = getRandomInteger(0, descriptionSentences.length - 1);
    let temp = 0;

    if (leftBorder > rightBorder) {
      temp = rightBorder;
      rightBorder = leftBorder;
      leftBorder = temp;
    }

    if (leftBorder === rightBorder) { rightBorder++; }

    return descriptionSentences.slice(leftBorder, rightBorder).join(' ');
  };

  const generatePicturesList = () => {
    const picturesDescriptions = ['Chamonix parliament building', 'Amsterdam church', 'Geneva airport'];
    return new Array(getRandomInteger(1, 3)).fill().map(() =>
      ( {src: `http://picsum.photos/300/200?r=${Math.random()}`, description: picturesDescriptions[getRandomInteger(0, picturesDescriptions.length - 1)]} ) );
  };

  const name = destinations[getRandomInteger(0, destinations.length - 1)];

  return {
    description: generateDescription(),
    name,
    pictures: generatePicturesList(),
  };
};

const generateOffersList = () => {
  const offerTitles = ['Order Uber', 'Switch to comfort class', 'Add meal', 'Add luggage', 'Choose seats'];

  return new Array(POINT_TYPES.length)
    .fill()
    .map((value, index) =>
      ( { type: POINT_TYPES[index], offers: new Array(getRandomInteger(0, 5))
        .fill()
        .map((val, ind) =>
          ( { id: ind + 1, title: offerTitles[getRandomInteger(0, offerTitles.length - 1)], price: getRandomInteger(10, 100) } )),
      } ));
};

export const offersList = generateOffersList();

export const generatePoint = (features) => {
  const dateFrom = generateDateFrom();
  const dateTo = generateDateTo(dateFrom);
  const type = generateType();
  let offersNumber;

  features.forEach((value, index) => {
    if (type === value.type) {
      offersNumber = index;
    }
  });

  return {
    id: getRandomInteger(0, 100),
    type,
    basePrice: getRandomInteger(20, 1000),
    destination: generateDestination(),
    dateFrom,
    dateTo,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: features[offersNumber].offers
  };
};

