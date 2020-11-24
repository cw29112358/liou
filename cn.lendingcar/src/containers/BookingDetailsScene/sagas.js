/*
 *
 * BookingDetailsScene sagas
 *
 */
import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';
import { executeFunction } from 'utils/helpers';

import { updateMembershipAction } from 'containers/AppRouter/actions';
import { loadInventoryAction } from 'containers/InventoryScene/actions';
import { loadTripAction } from 'containers/TripScene/actions';

import { MAKING_BOOKING } from './constants';
import { makeBookingSuccessAction, makeBookingFailAction } from './actions';

export function* makingBooking(action) {
  try {
    const { formObject, onSuccess } = action;
    const results = yield call(formObject.leaseType === 'rent' ? StrapiApi.makeRentBookingAPI : StrapiApi.makeBookingAPI, formObject); // 传入车信息获取预定结果
    yield put(makeBookingSuccessAction(results)); // 修改store的 done 和 msg的值

    executeFunction(onSuccess); // 执行onSuccess
    yield put(updateMembershipAction()); // 更新设置是否为会员
    yield put(loadInventoryAction({ forceReload: true })); // 重新获取 库存 ，保存在 inventoryScene 的 inventories 中
    yield put(loadTripAction({ forceReload: true })); // 加载booking接口获取结果并存入tripScene 的 trips 中
  } catch (err) {
    yield put(makeBookingFailAction(err));
  }
}
export function* watchMakingBooking() {
  yield takeLatest(MAKING_BOOKING, makingBooking);
}
export default [
  {
    key: 'watchMakingBooking',
    saga: watchMakingBooking,
    mode: DAEMON,
  },
];
