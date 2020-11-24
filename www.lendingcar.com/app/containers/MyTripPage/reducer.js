/*
 *
 * MyTripPage reducer
 *
 */

 import { fromJS } from 'immutable';
 import {
   tripTypes,
   MYTRIP_LOAD,
   MYTRIP_LOAD_SUCCESS,
   MYTRIP_LOAD_FAIL,
   MYTRIP_NOTLATEST,
   USER_LOGOUT_MYTIRP,
 } from './constants';
 const initialState = fromJS({
   trips: [],
   tripTypes,
   isLatest: false,
   isLoading: true,
 });

 function myTripPageReducer(state = initialState, action) {
   switch (action.type) {
     case MYTRIP_LOAD:
       return state.set('isLoading', true);
     case MYTRIP_LOAD_SUCCESS:
       return state
               .set('trips', fromJS(action.tripsObject))
               .set('isLoading', false)
               .set('isLatest', true);
     case MYTRIP_LOAD_FAIL:
       return state
              .set('trips', fromJS([]))
              .set('isLoading', false);
     case MYTRIP_NOTLATEST:
       return state.set('isLatest', false);
     case USER_LOGOUT_MYTIRP:
       return initialState;
     default:
       return state;
   }
 }

 export default myTripPageReducer;
