/*
 *
 * ProjectDetailScene actions
 *
 */

import {
  SETUP_VIEW_COUNT,
} from './constants';

export function stepUpViewCountAction(id) {
  return {
    type: SETUP_VIEW_COUNT,
    id,
  };
}
