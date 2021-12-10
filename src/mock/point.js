import dayjs from 'dayjs';

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

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

export const generatePoint = () => {
  const dateFrom = generateDateFrom();
  const dateTo = generateDateTo(dateFrom);

  return {
    id: getRandomInteger(0, 100),
    type: generateType(),
    basePrice: getRandomInteger(20, 1000),
    dateFrom,
    dateTo,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

