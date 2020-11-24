/*
 *
 * LandingPage reducer
 *
 */

 import { fromJS } from 'immutable';
 import {
   LENDING_LOAD_CARS,
   LENDING_LOAD_FAIL,
   LENDING_LOAD,
 } from './constants';

 const initialState = fromJS({
 });

 function LandingPageReducer(state = initialState, action) {
   switch (action.type) {
     case LENDING_LOAD:
       return state;
     case LENDING_LOAD_CARS:
       {
         return state.set('car', fromJS(action.carInfo));
       }
     case LENDING_LOAD_FAIL:
       return state;
     default:
       return state;
   }
 }


 export default LandingPageReducer;
