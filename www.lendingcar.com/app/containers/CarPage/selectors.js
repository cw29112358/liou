import { createSelector } from 'reselect';
import { createGetSelector } from 'reselect-immutable-helpers';
import { isNil, lowerCase, toNumber, filter, slice, inRange, map } from 'lodash';
import moment from 'moment';
import { fromJS, Map } from 'immutable';
// import { getDaysByStartDate } from 'utils/helpers';
import { selectArea, selectDate, selectTerm, selectAreaConfig } from 'containers/App/selectors';
import {
  selectSelectedInventory,
} from 'containers/InventoryPage/selectors';

export const selectCarPageDomain = (state) => state.get('carPage', Map());
export const selectCarPage = createSelector(
  selectCarPageDomain,
  (substate) => substate.toJS()
);
export const selectCarId = createGetSelector(
  selectCarPageDomain,
  'carId'
);
export const selectCurPlanCategory = createGetSelector(
  selectCarPageDomain,
  'curPlanCategory'
);
export const selectCurPlanType = createGetSelector(
  selectCarPageDomain,
  'curPlanType'
);
export const selectIsLoading = createGetSelector(
  selectCarPageDomain,
  'isLoading'
);
export const selectSelectedCarFromLocal = createGetSelector(
  selectCarPageDomain,
  'carObject',
  Map(),
);

export const selectSelectedCarFromInventory = createSelector(
  selectCarId,
  selectSelectedInventory,
  (carId, inventory) => {
    if (!carId) {
      return Map();
    }
    if (inventory.has(carId)) {
      return inventory.get(carId);
    }
    return Map();
  }
);
export const selectSelectedCar = createSelector(
  selectSelectedCarFromInventory,
  selectSelectedCarFromLocal,
  (carFromInventory, carFromLocal) => carFromInventory.merge(carFromLocal)
);
export const selectCalculatedCar = createSelector(
  selectSelectedCar,
  selectDate,
  selectTerm,
  (car, date, term) => handleCalculatePrice(car, date, term)
);
function handleCalculatePrice(car, date, term) {
  if (car.size === 0) {
    return car.merge(fromJS({
      plan: {
        type: 'lease',
        unit: 'month',
        daysOfRental: 0,
        dailyRent: 0,
        dailyInsurance: 0,
        deposit: 200,
        downpayment: 0,
      } }));
  }
  const priceAdjust = isNil(car.get('priceAdjust')) || Number(car.get('priceAdjust')) === 0 ? 100 : Number(car.get('priceAdjust'));
  // const price = Number(car.get('price')) * (priceAdjust / 100);
  // const days = Number(getDaysByStartDate(date, term));
  // const plan = window.d(price, days);

  const carClass = car.get('carClass');
  const leasePrice = car.get('leasePrice') ? car.get('leasePrice') : null;
  const leaseDeposit = car.get('leaseDeposit') ? car.get('leaseDeposit') : null;
  const occupancy = car.get('occupancy') ? Number(car.get('occupancy')) : 4;
  const plan = window.m(carClass, term, priceAdjust, leasePrice, leaseDeposit, occupancy);

  return car.set('plan', fromJS(plan));
}
export const selectSelectedCarImages = createSelector(
  selectSelectedCar,
  (car) => {
    if (!car) return fromJS([]);
    const images = car.get('images', []);
    const res = images.map((url) => ({
      url,
    }));
    // const res = car ? Array.from(Array(car.get('imageNum'))).map((v, i) => ({
    //   url: `${car.get('id')}/${_.padStart(i + 1, 2, 0)}.jpg`,
    // })) : [];
    return fromJS(res);
  }
);

export const selectSelectedCarCurPlan = createSelector(
  selectSelectedCar,
  selectCurPlanType,
  (car, curPlanType) => {
    if (!car) return fromJS({});
    const plans = car.get('plans', []);
    return plans.find((plan) => plan.get('type') === curPlanType);
  }
);

export const selectRecommendationFromInventory = createSelector(
  selectCarId,
  selectSelectedInventory,
  selectDate,
  selectTerm,
  (carId, inventory, date, term) => handleRecommendation(carId, inventory, date, term)
);

function handleRecommendation(carId, inventory, date, term) {
  const inventoryArray = inventory.toJS();
  const currentCar = inventoryArray[carId];
  if (!carId || isNil(currentCar)) {
    return [];
  }
  const currentCarType = lowerCase(!isNil(currentCar.carType) ? currentCar.carType : '');
  const currentPrice = toNumber(currentCar.price) || 0;
  const deltaPricee = currentPrice * 0.2;
  const lowerPrice = currentPrice - deltaPricee;
  const upperPrice = currentPrice + deltaPricee;
  const recommendedCars = slice(filter(inventoryArray, (car) =>
    car.id !== carId
    && car.availability === 'available'
    && lowerCase(car.carType) === currentCarType
    && inRange(car.price, lowerPrice, upperPrice)), 0, 3);
  const recommendedCarsWithRentalPrice = map(recommendedCars, (car) => (handleCalculatePrice(fromJS(car), date, term)).toJS());
  return recommendedCarsWithRentalPrice;
}

export const selectBookingDetails = createSelector(
  selectCalculatedCar,
  selectDate,
  selectTerm,
  selectArea,
  selectAreaConfig,
  (car, date, term, area, areaConfig) => {
    const pickupDate = moment(new Date(date)).format('YYYY-MM-DD');
    const returnDate = moment(pickupDate).add(Number(term), 'months').format('YYYY-MM-DD');

    const carInfo = car.toJS();
    const needPreOrder = carInfo.needPreOrder;

    const regularBookingFee = 50;
    const preOrderBookingFee = 200;
    const testBookingFee = 1;

    let bookingFee = needPreOrder ? preOrderBookingFee : regularBookingFee;
    if (location.host === 'beta.lendingcar.com') bookingFee = testBookingFee;

    const unit = carInfo.plan.unit;
    let rate;
    let totalDueWithoutTaxs;
    if (unit === 'month') {
      rate = Math.round(carInfo.plan.dailyRent * 30);
      totalDueWithoutTaxs = parseFloat(rate * Number(term)).toFixed(2);
    } else if (unit === 'day') {
      rate = Math.round(carInfo.plan.dailyRent);
      const days = moment(returnDate).diff(moment(pickupDate), 'days');
      totalDueWithoutTaxs = parseFloat(rate * Number(days)).toFixed(2);
    }
    // const taxs = parseFloat(totalDueWithoutTaxs * 0.09).toFixed(2);
    // const totalDue = (Number(totalDueWithoutTaxs) + Number(taxs)).toFixed(2);
    const totalDue = totalDueWithoutTaxs;
    const deposit = Math.round(carInfo.plan.deposit);
    const address = areaConfig.get(area, Map()).set('area', area);

    const form = Map()
                .set('term', term)
                .set('pickupDate', pickupDate)
                .set('returnDate', returnDate)
                .set('rate', rate)
                .set('unit', unit)
                .set('deposit', deposit)
                .set('totalDue', totalDue)
                .set('bookingFee', bookingFee)
                .set('type', 'booking')
                .merge(address);
    return form;
  }
);
