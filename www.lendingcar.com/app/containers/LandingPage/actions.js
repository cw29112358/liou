/*
 *
 * LandingPage actions
 *
 */

 import {
   LENDING_LOAD_CARS,
   LENDING_LOAD_FAIL,
   LENDING_LOAD,
 } from './constants';

 export function loadLendingShowCarsAction(carInfo) {
   return {
     type: LENDING_LOAD_CARS,
     carInfo,
   };
 }

 export function loadLendingShowAction() {
   return {
     type: LENDING_LOAD,
   };
 }

 export function loadLendingDataFailAction(err) {
   return {
     type: LENDING_LOAD_FAIL,
     err,
   };
 }
