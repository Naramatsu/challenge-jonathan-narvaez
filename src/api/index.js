import data from '../data.json';
import { gradeToRad } from '../utils';

export const findCities = (q = '') => {
  if (q === '') return data;
  if (q.toLocaleUpperCase() === 'FAIL')
    throw new Error('Internal Server Error');
  return data.filter((item) =>
    item.name.toUpperCase().includes(q.toUpperCase())
  );
};

export const calculateDistance = (params) => {
  let { lat1, lon1, city1, lat2, lon2, city2 } = params;
  if (city1.toUpperCase() === 'DIJON' || city2.toUpperCase() === 'DIJON')
    throw new Error('Internal Server Error');
  lat1 = gradeToRad(lat1);
  lon1 = gradeToRad(lon1);
  lat2 = gradeToRad(lat2);
  lon2 = gradeToRad(lon2);

  const EATRH_RAD_IN_KM = 6371;
  const differenceBetweenLongitudes = lon2 - lon1;
  const differenceBetweenLatitudes = lat2 - lat1;

  const a =
    Math.pow(Math.sin(differenceBetweenLatitudes / 2.0), 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.pow(Math.sin(differenceBetweenLongitudes / 2.0), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (EATRH_RAD_IN_KM * c).toFixed(2);
};
