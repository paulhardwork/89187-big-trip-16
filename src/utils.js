export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (array) => (array[getRandomInteger(0, array.length - 1)]);

export const shuffleArray = (array) => {
  const resultArray = [];

  while (array.length > 0) {
    const randomElement = getRandomInteger(0, array.length - 1);
    const currentElement = array.splice(randomElement, 1)[0];
    resultArray.push(currentElement);
  }

  return resultArray;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
