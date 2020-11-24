import * as commonColor from 'commonColor';
import variables from 'platform';
import { headerMarginTop, headerOccupyHeight } from '../SearchHeader/styles';

const {
  deviceWidth,
  deviceHeight,
  isPad,
} = variables;

const headerOutHeight = headerOccupyHeight;
const topPartHeight = headerOutHeight + 70;
const filterBarHeight = headerMarginTop + 70;

export default {
  isPad,
  brand: commonColor.brand,
  listView: {
    paddingLeft: 8,
    height: '100%',
  },
  topPartHeight,
  filterBarHeight,
  deviceWidth,
  deviceHeight,
};
