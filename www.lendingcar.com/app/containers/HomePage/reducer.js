/*
 *
 * HomePage reducer
 *
 */

 import { fromJS } from 'immutable';
 import {
   INVENTORY_LOAD,
   INVENTORY_LOAD_SUCCESS,
   INVENTORY_LOAD_FAIL,
 } from './constants';

 const initialState = fromJS({
   showcaseCars: {},
 });

 function homePageReducer(state = initialState, action) {
   switch (action.type) {
     case INVENTORY_LOAD:
       return state;
     case INVENTORY_LOAD_SUCCESS:
       {
         return state.set('inventories', fromJS(action.inventoriesObject));
       }
     case INVENTORY_LOAD_FAIL:
       return state;
     default:
       return state;
   }
 }


 export default homePageReducer;
