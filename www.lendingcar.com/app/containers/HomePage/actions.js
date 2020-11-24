/*
 *
 * HomePage actions
 *
 */

 import {
   INVENTORY_LOAD,
   INVENTORY_LOAD_SUCCESS,
   INVENTORY_LOAD_FAIL,
 } from './constants';

 export function loadHomeShowcaseCarsAction() {
   return {
     type: INVENTORY_LOAD,
   };
 }

 export function loadHomeShowcaseCarsSuccessAction(inventoriesObject) {
   return {
     type: INVENTORY_LOAD_SUCCESS,
     inventoriesObject,
   };
 }

 export function loadHomeShowcaseCarsFailAction(error) {
   return {
     type: INVENTORY_LOAD_FAIL,
     error,
   };
 }
