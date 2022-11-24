export const areThereDuplicatedItems = (
  obj,
  item,
  value,
  intermediate = []
) => {
  if (value === 'originCity') {
    if (obj?.destinationCity?.name === item.name) return true;
    return false;
  }
  if (value === 'destinationCity') {
    if (obj?.originCity?.name === item.name) return true;
    return false;
  }
  if (value === 'intermediateCity') {
    if (areThereDuplicatedItems(obj, item, 'originCity')) return true;
    if (areThereDuplicatedItems(obj, item, 'destinationCity')) return true;
    return intermediate.some(({ name }) => name === item.name);
  }
};

export const gradeToRad = (grados) => {
  return (grados * Math.PI) / 180;
};

export const isEmpty = (field) => {
  if (!field || field === null || !field.length) {
    return true;
  }
  return false;
};

export const isValidCity = (obj = {}, value, onChange) => {
  if (isEmpty(obj[value].name)) {
    onChange({
      ...obj,
      [value]: {
        error: 'This field is required, please select a city.',
      },
    });
    return false;
  }
  return true;
};

export const formatDate = (date) =>
  `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
