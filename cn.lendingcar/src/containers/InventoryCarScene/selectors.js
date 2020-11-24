import { createSelector } from 'reselect';
import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable, { fromJS } from 'immutable';
import split from 'lodash/split';

import {
  selectRootInventory,
  getCalculatedItem,
} from 'containers/InventoryScene/selectors';

import {
  CAR_INFO_KEYS,
  CAR_FEATURES_KEYS,
} from './constants';

export const selectInventoryCar = (state) => state.get('inventoryCarScene',
  Immutable.Map());
export const selectGetCarId = createGetSelector(selectInventoryCar, 'carId');
export const selectGetCarIdKey = createGetSelector(selectInventoryCar, 'key');
export const selectGetSingleCar = createGetSelector(selectInventoryCar, 'singleCar', Immutable.Map());
export const selectGetCarInfoGroup = createGetSelector(selectInventoryCar, 'carInfoGroup', Immutable.List());
export const selectIsLoading = createGetSelector(selectInventoryCar, 'isLoading');
export const selectIsFavouriteError = createGetSelector(selectInventoryCar, 'favouriteError', false);

export const selectGetCarInfo = createSelector(
  selectGetSingleCar,
  (singleCar) => getCalculatedItem(singleCar)
);

export const selectCarConfiguration = createSelector(
  selectGetCarInfo,
  (carInfo) => carConfiguration(carInfo, CAR_INFO_KEYS)
);
export const selectCarFeaturesList = createSelector(
  selectGetCarInfo,
  (carInfo) => carConfiguration(carInfo, CAR_FEATURES_KEYS)
);
// TODO: immutable js 方法
export const carConfiguration = (carInfo, configurationKeys) => {
  let configuration = Immutable.List();
  configurationKeys.map((key) => {
    if (carInfo && carInfo.get(key)) {
      configuration = configuration.push({
        label: key,
        value: carInfo.get(key),
      });
    }
    return configuration;
  });
  return configuration;
};

export const selectCarFeatures = createSelector(
  selectGetCarInfo,
  (carInfo) => {
    const featuresZH = carInfo.get('featureZH') || null;
    const features = featuresZH ? split(featuresZH, '，') : [];

    return fromJS(features).filter((value) => value && value.trim());
  }
);
export const selectCarDetails = createSelector(
  selectCarFeaturesList,
  selectCarFeatures,
  (configuration, features) => configuration.concat(features)
);

export const selectSimilarCars = createSelector(
  selectRootInventory,
  selectGetCarInfo,
  selectGetCarId,
  (inventories, carInfo, carId) => {
    const similarCars = inventories
      .filter((value) => value.get('carType') === carInfo.get('carType') && value.get('area') === carInfo.get('area') && value.get('id') !== carInfo.get('id') && !carId.has(value.get('id')));
    const similarCarsLength = similarCars.size;
    if (similarCarsLength <= 4) return similarCars;

    let pickResult = Immutable.Map();
    for (let i = 0; i < 4; i += 1) {
      const key = Math.round(Math.random() * (similarCarsLength - 1));
      if (pickResult.has(key)) {
        i -= 1;
      } else {
        pickResult = pickResult.set(key, similarCars.get(key));
      }
    }
    return pickResult.valueSeq();
  }
);

export const selectSingleCar = createSelector(
  selectGetCarInfo,
  selectCarDetails,
  selectSimilarCars,
  selectCarConfiguration,
  (carInfo, carDetails, similarCars, singleCarConfiguration) => {
    const newCarInfo = carInfo.set('carDetails', carDetails)
      .set('similarCars', similarCars)
      .set('carConfiguration', singleCarConfiguration);
    return newCarInfo;
  }
);

export const selectCarInfoGroup = createSelector(
  selectGetCarInfoGroup,
  selectSingleCar,
  selectGetCarIdKey,
  (carInfoGroup, carInfo, key) => {
    const newGroup = carInfoGroup.set(key, Immutable.Map({ [carInfo.get('carId')]: carInfo }));
    return newGroup;
  }
);
