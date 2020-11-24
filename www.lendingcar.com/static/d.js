window.d = function m(price, daysOfRental) {
  if (daysOfRental === 0) {
    return {
      type: 'lease',
      unit: 'day',
      daysOfRental: 0,
      dailyRent: 0,
      dailyInsurance: 0,
      deposit: 200,
      downpayment: 0,
    };
  }
  const type = 'lease';
  const unit = 'day';
  const deposit = 200;

  const monthsOfRental = Math.floor(daysOfRental / 30);
  const dailyInsurance = Math.round(199.99 / 30);
  const downpayment = Math.round(((20 + ((12 - monthsOfRental) / 2)) / 100) * price * (monthsOfRental / 12));

  const daysDrop50Percent = 7;
  const dailyPriceForTargetProfit = (price * 0.5) / 365;

  var totalRent = 0;

  // let priceForNthDay;
  // start at the first day, and to the last day.
  /*
  for (let i = 1; i <= daysOfRental; ++i) {
    let j = Math.floor((daysOfRental - 1) / daysDrop50Percent);

    priceForNthDay = 0;
    j = Math.min(j, 10);
    for (let k = 0; k < j; ++k) {
      priceForNthDay += daysDrop50Percent * (2 - k * 0.1) * dailyPriceForTargetProfit;
    }

    priceForNthDay += (i - j * daysDrop50Percent) * (2 - 0.1 * j) * dailyPriceForTargetProfit;
    totalRent += priceForNthDay;
  }*/

  var j = Math.floor((daysOfRental - 1) / daysDrop50Percent);
  j = Math.min(j, 10);
  for (var k = 0; k < j; k += 1) {
    totalRent += daysDrop50Percent * (2 - (k * 0.1)) * dailyPriceForTargetProfit;
  }
  totalRent += (daysOfRental - (j * daysDrop50Percent)) * (2 - (0.1 * j)) * dailyPriceForTargetProfit;

  var dailyRent = totalRent / daysOfRental;
  dailyRent = Math.round(dailyRent);
  // dailyRent = dailyRent.toFixed(2);

  return {
    type: type,
    unit: unit,
    daysOfRental: daysOfRental,
    dailyRent: dailyRent,
    dailyInsurance: dailyInsurance,
    deposit: deposit,
    downpayment: downpayment,
  };
};
