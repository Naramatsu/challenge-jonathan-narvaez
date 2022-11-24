const { findCities, calculateDistance } = require('./index');
const data = require('../data.json');

describe('FindCities function', () => {
  it('Should get all cities', () => {
    const expected = data;
    const result = findCities();
    expect(result).toBe(expected);
  });

  it('Should get a list of cities by keydown', () => {
    const q = 'paris';
    const expected = data.filter((item) =>
      item.name.toUpperCase().includes(q.toUpperCase())
    );
    const result = findCities(q);
    expect(result).toStrictEqual(expected);
  });

  it('Should get an Error', () => {
    const q = 'fail';
    try {
      const result = findCities(q);
      const expected = new Error('Internal Server Error');
      expect(result).toThrow(expected);
    } catch (error) {}
  });
});

describe('calculateDistance function', () => {
  it('Should calculate the distance between 2 cities', () => {
    const params = {
      city1: 'Paris',
      lat1: 48.856614,
      lon1: 2.352222,
      city2: 'Marseille',
      lat2: 43.296482,
      lon2: 5.36978,
    };
    const expected = '660.48';
    const result = calculateDistance(params);
    expect(result).toBe(expected);
  });

  it('Should get an error', () => {
    const params = {
      city1: 'Dijon',
      lat1: 48.856614,
      lon1: 2.352222,
      city2: 'Marseille',
      lat2: 43.296482,
      lon2: 5.36978,
    };
    try {
      const expected = new Error('Internal Server Error');
      const result = calculateDistance(params);
      expect(result).toThrow(expected);
    } catch (error) {}
  });
});
