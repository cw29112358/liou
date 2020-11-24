const pomotionAdjust = 100;

const priceTable = {
  special: {
    1: { priceRate: 122, depositRate: 100 },
    2: { priceRate: 120, depositRate: 100 },
    3: { priceRate: 118, depositRate: 100 },
    4: { priceRate: 116, depositRate: 100 },
    5: { priceRate: 114, depositRate: 100 },
    6: { priceRate: 112, depositRate: 100 },
    7: { priceRate: 110, depositRate: 100 },
    8: { priceRate: 108, depositRate: 100 },
    9: { priceRate: 106, depositRate: 100 },
    10: { priceRate: 104, depositRate: 100 },
    11: { priceRate: 102, depositRate: 100 },
    12: { priceRate: 100, depositRate: 100 },
  },
  luxury: {
    1: { price: 600, deposit: 600 },
    2: { price: 588, deposit: 600 },
    3: { price: 576, deposit: 600 },
    4: { price: 564, deposit: 700 },
    5: { price: 552, deposit: 700 },
    6: { price: 540, deposit: 700 },
    7: { price: 534, deposit: 800 },
    8: { price: 522, deposit: 800 },
    9: { price: 510, deposit: 800 },
    10: { price: 492, deposit: 850 },
    11: { price: 480, deposit: 850 },
    12: { price: 474, deposit: 850 },
  },
  executive: {
    1: { price: 520, deposit: 575 },
    2: { price: 510, deposit: 575 },
    3: { price: 499, deposit: 575 },
    4: { price: 489, deposit: 675 },
    5: { price: 478, deposit: 675 },
    6: { price: 468, deposit: 675 },
    7: { price: 458, deposit: 775 },
    8: { price: 447, deposit: 775 },
    9: { price: 437, deposit: 775 },
    10: { price: 426, deposit: 825 },
    11: { price: 416, deposit: 825 },
    12: { price: 406, deposit: 825 },
  },
  comfort: {
    1: { price: 471, deposit: 550 },
    2: { price: 462, deposit: 550 },
    3: { price: 452, deposit: 550 },
    4: { price: 443, deposit: 625 },
    5: { price: 433, deposit: 625 },
    6: { price: 424, deposit: 625 },
    7: { price: 414, deposit: 725 },
    8: { price: 405, deposit: 725 },
    9: { price: 396, deposit: 725 },
    10: { price: 386, deposit: 800 },
    11: { price: 377, deposit: 800 },
    12: { price: 367, deposit: 800 },
  },
  freedom: {
    1: { price: 325, deposit: 525 },
    2: { price: 319, deposit: 525 },
    3: { price: 312, deposit: 525 },
    4: { price: 306, deposit: 600 },
    5: { price: 299, deposit: 600 },
    6: { price: 293, deposit: 600 },
    7: { price: 286, deposit: 675 },
    8: { price: 280, deposit: 675 },
    9: { price: 273, deposit: 675 },
    10: { price: 266, deposit: 775 },
    11: { price: 260, deposit: 775 },
    12: { price: 253, deposit: 775 },
  },
  everyone: {
    1: { price: 277, deposit: 500 },
    2: { price: 277, deposit: 500 },
    3: { price: 277, deposit: 500 },
    4: { price: 254, deposit: 575 },
    5: { price: 254, deposit: 575 },
    6: { price: 254, deposit: 575 },
    7: { price: 239, deposit: 625 },
    8: { price: 239, deposit: 625 },
    9: { price: 239, deposit: 625 },
    10: { price: 232, deposit: 700 },
    11: { price: 232, deposit: 700 },
    12: { price: 232, deposit: 700 },
  },
};

window.m = function monthlyRate(vehicleClass, term, priceAdjust, leasePrice = null, leaseDeposit = null, occupancy = 4) {
  if (Number(term) === 0) {
    return {
      type: 'lease',
      unit: 'month',
      daysOfRental: 0,
      dailyRent: 0,
      dailyInsurance: 0,
      deposit: 0,
      downpayment: 0,
    };
  }

  let carClass = vehicleClass;

  if (carClass === 'special' && leasePrice && leaseDeposit) {
    const currRate = priceTable[carClass][term];
    return {
      type: 'lease',
      unit: 'month',
      daysOfRental: 0,
      // dailyRent: parseFloat(Number(curr.price) / 30).toFixed(2),
      dailyRent: parseFloat((((Number(currRate.priceRate) / 100) * Number(leasePrice)) * ((priceAdjust / 100) * (pomotionAdjust / 100))) / 30).toFixed(2),
      dailyInsurance: 0,
      deposit: parseFloat((Number(currRate.depositRate) / 100) * Number(leaseDeposit)).toFixed(2),
      downpayment: 0,
    };
  }

  if (leasePrice && leaseDeposit) {
    const currRate = priceTable.special[term];
    return {
      type: 'lease',
      unit: 'month',
      daysOfRental: 0,
      // dailyRent: parseFloat(Number(curr.price) / 30).toFixed(2),
      dailyRent: parseFloat((((Number(currRate.priceRate) / 100) * Number(leasePrice)) * ((priceAdjust / 100) * (pomotionAdjust / 100))) / 30).toFixed(2),
      dailyInsurance: 0,
      deposit: parseFloat((Number(currRate.depositRate) / 100) * Number(leaseDeposit)).toFixed(2),
      downpayment: 0,
    };
  }

  if (carClass === 'special' && (!leasePrice || !leaseDeposit)) {
    return {
      type: 'lease',
      unit: 'month',
      daysOfRental: 0,
      dailyRent: 0,
      dailyInsurance: 0,
      deposit: 0,
      downpayment: 0,
    };
  }

  // let carClass = vehicleClass;

  if (!vehicleClass) carClass = 'comfort';

  const curr = priceTable[carClass][term];
  // console.log(curr);

  let passengers = 4;
  if (occupancy < 4) passengers = 4;
  else passengers = Number(occupancy);

  const passengersRatio = carClass === 'special' ? 1 : passengers / 4;

  return {
    type: 'lease',
    unit: 'month',
    daysOfRental: 0,
    // dailyRent: parseFloat(Number(curr.price) / 30).toFixed(2),
    dailyRent: parseFloat(((Number(curr.price) * (priceAdjust / 100) * (pomotionAdjust / 100)) / 30) * passengersRatio).toFixed(2),
    dailyInsurance: 0,
    deposit: parseFloat(curr.deposit).toFixed(2),
    downpayment: 0,
  };
};

// console.log(monthlyRate('luxury', '12'));
