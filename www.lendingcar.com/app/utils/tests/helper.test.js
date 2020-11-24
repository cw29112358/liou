import { calculatePrice } from '../helper';

describe('calculatePrice', () => {
  it('rent a car for 2 days', () => {
    const mockupPrice = 10000;
    const mockupDaysOfRental = 2;

    /*
    type,
    monthly_rent,
    dailyRent,
    deposit,
    downpayment,
    dailyInsurance
    */
    const expectedObject = {
      unit: 'day',
      type: 'rental',
      daysOfRental: 2,
      dailyRent: 36,
      deposit: 800,
      downpayment: 0,
      dailyInsurance: 20,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });

/*
  it('rent a car for 4 months', () => {
    const priceState = fromJS({
      car: {
        price: 10000,
      },
      userConfig: {
        discount: 0.8,
      }
    });
    const expectedPrice = 8000;
    expect(selectPrice(priceState)).toEqual(expectedPrice);
  });
  */
  it('rent a car for 4 months', () => {
    const mockupPrice = 10000;
    const mockupDaysOfRental = 120;

    const expectedObject = {
      unit: 'day',
      type: 'lease',
      daysOfRental: 120,
      dailyRent: 9,
      deposit: 0,
      downpayment: 800,
      dailyInsurance: 7,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });

  it('rent a car for 1 month', () => {
    const mockupPrice = 5000;
    const mockupDaysOfRental = 78;

    const expectedObject = {
      unit: 'day',
      type: 'lease',
      daysOfRental: 78,
      dailyRent: 5,
      deposit: 0,
      downpayment: 208,
      dailyInsurance: 7,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });
});


describe('Actual Cars', () => {
  it('rent a car from the actual car array for 2 months', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 60;
    /*
    type,
    monthly_rent,
    dailyRent,
    deposit,
    downpayment,
    dailyInsurance
    */
    const expectedObject = {
      unit: 'day',
      type: 'lease',
      daysOfRental: 60,
      dailyRent: 19,
      deposit: 0,
      downpayment: 846,
      dailyInsurance: 7,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });

  it('rent a car from the actual car array for 5 months', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 150;
    /*
    type,
    monthly_rent,
    dailyRent,
    deposit,
    downpayment,
    dailyInsurance
    */
    const expectedObject = {
      unit: 'day',
      type: 'lease',
      daysOfRental: 150,
      dailyRent: 18,
      deposit: 0,
      downpayment: 1988,
      dailyInsurance: 7,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });


  it('rent a car of 24056.25 dollars for 5 months', () => {
    const mockupPrice = 24056.25;
    const mockupDaysOfRental = 150;

    /*
    type,
    monthly_rent,
    dailyRent,
    deposit,
    downpayment,
    dailyInsurance
    */
    const expectedObject = {
      unit: 'day',
      type: 'lease',
      daysOfRental: 150,
      dailyRent: 21,
      deposit: 0,
      downpayment: 2356,
      dailyInsurance: 7,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });
});

describe('Edge cases', () => {
  it('rent a car for 29 days', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 29;
    /*
    type,
    monthly_rent,
    dailyRent,
    deposit,
    downpayment,
    dailyInsurance
    */
    const expectedObject = {
      unit: 'day',
      type: 'lease',
      daysOfRental: 29,
      dailyRent: 19,
      deposit: 0,
      downpayment: Math.round(431.5),
      dailyInsurance: 7,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });


  it('rent a car for 28 days', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 28;
    /*
    type,
    monthly_rent,
    dailyRent,
    deposit,
    downpayment,
    dailyInsurance
    */
    const expectedObject = {
      unit: 'day',
      type: 'rental',
      daysOfRental: 28,
      dailyRent: Math.round((0.063 * 20306.25) / 28),
      deposit: 800,
      downpayment: 0,
      dailyInsurance: 20,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });

  it('rent a car for 26 days', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 26;

    const expectedObject = {
      unit: 'day',
      type: 'rental',
      daysOfRental: 26,
      dailyRent: 49,
      deposit: 800,
      downpayment: 0,
      dailyInsurance: 20,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });


  it('rent a car for 21 days', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 21;

    const expectedObject = {
      unit: 'day',
      type: 'rental',
      daysOfRental: 21,
      dailyRent: 57,
      deposit: 800,
      downpayment: 0,
      dailyInsurance: 20,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });

  it('rent a car for 20 days', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 20;

    const expectedObject = {
      unit: 'day',
      type: 'rental',
      daysOfRental: 20,
      dailyRent: 55,
      deposit: 800,
      downpayment: 0,
      dailyInsurance: 20,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });

  it('rent a car for 18 days', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 18;

    const expectedObject = {
      unit: 'day',
      type: 'rental',
      daysOfRental: 18,
      dailyRent: 58,
      deposit: 800,
      downpayment: 0,
      dailyInsurance: 20,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });


  it('rent a car for 14 days', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 14;

    const expectedObject = {
      unit: 'day',
      type: 'rental',
      daysOfRental: 14,
      dailyRent: 64,
      deposit: 800,
      downpayment: 0,
      dailyInsurance: 20,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });

  it('rent a car for 13 days', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 13;

    const expectedObject = {
      unit: 'day',
      type: 'rental',
      daysOfRental: 13,
      dailyRent: 61,
      deposit: 800,
      downpayment: 0,
      dailyInsurance: 20,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });

  it('rent a car for 10 days', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 10;

    const expectedObject = {
      unit: 'day',
      type: 'rental',
      daysOfRental: 10,
      dailyRent: 65,
      deposit: 800,
      downpayment: 0,
      dailyInsurance: 20,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });

  it('rent a car for 9 days', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 9;

    const expectedObject = {
      unit: 'day',
      type: 'rental',
      daysOfRental: 9,
      dailyRent: 66,
      deposit: 800,
      downpayment: 0,
      dailyInsurance: 20,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });

  it('rent a car for 7 days', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 7;

    const expectedObject = {
      unit: 'day',
      type: 'rental',
      daysOfRental: 7,
      dailyRent: 69,
      deposit: 800,
      downpayment: 0,
      dailyInsurance: 20,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });


  it('rent a car for 6 days', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 6;

    const expectedObject = {
      unit: 'day',
      type: 'rental',
      daysOfRental: 6,
      dailyRent: 68,
      deposit: 800,
      downpayment: 0,
      dailyInsurance: 20,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });

  it('rent a car for 4 days', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 4;

    const expectedObject = {
      unit: 'day',
      type: 'rental',
      daysOfRental: 4,
      dailyRent: 71,
      deposit: 800,
      downpayment: 0,
      dailyInsurance: 20,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });

  it('rent a car for 1 days', () => {
    const mockupPrice = 20306.25;
    const mockupDaysOfRental = 1;

    const expectedObject = {
      unit: 'day',
      type: 'rental',
      daysOfRental: 1,
      dailyRent: 74,
      deposit: 800,
      downpayment: 0,
      dailyInsurance: 20,
    };
    expect(calculatePrice(mockupPrice, mockupDaysOfRental)).toEqual(expectedObject);
  });

/*
    it('rent a car for 0 days', () => {
      const priceState = fromJS({
        car: {
          price: 20306.25,
        },
        userConfig: {
          daysOfRental: 0,
        }
      });

      const expectedObject = fromJS({
        type: "rental",
        daysOfRental: 0,
        dailyRent: 68,
        deposit: 800,
        downpayment: 0,
        dailyInsurance: 20,
      });
      expect(selectPrice(priceState)).toEqual(expectedObject);
    });
    */
});
