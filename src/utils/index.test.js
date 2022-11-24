const { areThereDuplicatedItems, isEmpty, isValidCity } = require('./index');

describe('areThereDuplicatedItems function', () => {
  describe('originCity field', () => {
    const obj = {
      destinationCity: {
        name: 'Paris',
        latitude: 48.856614,
        longitude: 2.352222,
      },
    };
    const item = { name: 'Paris', latitude: 48.856614, longitude: 2.352222 };
    const value = 'originCity';

    it('Should return true. There are duplicated city', () => {
      const expected = true;
      const result = areThereDuplicatedItems(obj, item, value);
      expect(result).toBe(expected);
    });

    it('Should return false. There are not duplicated city', () => {
      obj.destinationCity.name = 'Lyon';
      const expected = false;
      const result = areThereDuplicatedItems(obj, item, value);
      expect(result).toBe(expected);
    });
  });

  describe('destinationCity field', () => {
    const obj = {
      originCity: {
        name: 'Paris',
        latitude: 48.856614,
        longitude: 2.352222,
      },
    };
    const item = { name: 'Paris', latitude: 48.856614, longitude: 2.352222 };
    const value = 'destinationCity';

    it('Should return true. There are duplicated city', () => {
      const expected = true;
      const result = areThereDuplicatedItems(obj, item, value);
      expect(result).toBe(expected);
    });

    it('Should return false. There are not duplicated city', () => {
      obj.originCity.name = 'Lyon';
      const expected = false;
      const result = areThereDuplicatedItems(obj, item, value);
      expect(result).toBe(expected);
    });
  });

  describe('intermediateCity field', () => {
    const obj = {
      originCity: {
        name: 'Paris',
        latitude: 48.856614,
        longitude: 2.352222,
      },
      destinationCity: {
        name: 'Lyon',
        latitude: 48.856614,
        longitude: 2.352222,
      },
    };
    const item = { name: 'Paris', latitude: 48.856614, longitude: 2.352222 };
    const intermediate = [];
    const value = 'intermediateCity';

    it('Should return true. There are duplicated Origincity', () => {
      const expected = true;
      const result = areThereDuplicatedItems(obj, item, value, intermediate);
      expect(result).toBe(expected);
    });

    it('Should return true. There are duplicated destinationCity', () => {
      obj.originCity.name = 'Nice';
      obj.destinationCity.name = 'Paris';
      const expected = true;
      const result = areThereDuplicatedItems(obj, item, value, intermediate);
      expect(result).toBe(expected);
    });

    it('Should return true. There are a duplicated cities in intermediate list', () => {
      obj.originCity.name = 'Nice';
      obj.destinationCity.name = 'Nantes';
      intermediate.push(item);
      const expected = true;
      const result = areThereDuplicatedItems(obj, item, value, intermediate);
      expect(result).toBe(expected);
    });

    it('Should return false. There are not duplicated cities', () => {
      const obj = {
        originCity: {
          name: 'Paris',
          latitude: 48.856614,
          longitude: 2.352222,
        },
        destinationCity: {
          name: 'Lyon',
          latitude: 48.856614,
          longitude: 2.352222,
        },
      };
      const item = { name: 'Nice', latitude: 48.856614, longitude: 2.352222 };
      const intermediate = [];
      const expected = false;
      const result = areThereDuplicatedItems(obj, item, value, intermediate);
      expect(result).toBe(expected);
    });
  });

  it('Should no return any, unknow type', () => {
    const obj = {};
    const item = {};
    const value = '';

    const result = areThereDuplicatedItems(obj, item, value);
    expect(result).toBeUndefined();
  });
});

describe('isEmpty function', () => {
  it('Should return true, it is empty', () => {
    const field = '';
    const expected = true;
    const result = isEmpty(field);
    expect(result).toBe(expected);
  });

  it('Should return false, it is not empty', () => {
    const field = 'some';
    const expected = false;
    const result = isEmpty(field);
    expect(result).toBe(expected);
  });
});

describe('isValidCity function', () => {
  const obj = {
    originCity: {
      name: 'Paris',
      latitude: 48.856614,
      longitude: 2.352222,
    },
    destinationCity: {
      name: 'Lyon',
      latitude: 48.856614,
      longitude: 2.352222,
    },
  };
  let value = '';
  const onChange = jest.fn();

  describe('originCity validation', () => {
    value = 'originCity';

    it('Should return true, it is a valid originCity', () => {
      const expected = true;
      const result = isValidCity(obj, value, onChange);
      expect(result).toBe(expected);
    });

    it('Should return false, it is not a valid originCity', () => {
      const obj = {
        originCity: {},
        destinationCity: {
          name: 'Lyon',
          latitude: 48.856614,
          longitude: 2.352222,
        },
      };
      const expected = false;
      const result = isValidCity(obj, value, onChange);
      expect(result).toBe(expected);
    });
  });
});
