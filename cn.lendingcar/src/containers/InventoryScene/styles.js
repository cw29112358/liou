import * as commonColor from 'commonColor';
import variables from 'platform';
import { headerMarginTop, headerOccupyHeight } from './components/SearchHeader/styles';

const {
  isPad,
  deviceWidth,
} = variables;

export default {
  slideLength: deviceWidth - 60,
  headerMarginTop,
  headerOccupyHeight,
  container: {
    backgroundColor: commonColor.white,
  },
  // filterBar
  filterView: {
    marginTop: 20,
    paddingHorizontal: isPad ? 80 : 16,
    paddingBottom: 20,
  },
  filterButton: {
    borderWidth: 0,
  },
  filterButtonText: {
    fontSize: isPad ? 16 : 13,
  },
  activeFilterButton: {
    backgroundColor: commonColor.white,
  },
  activeFilterText: {
    color: commonColor.brand,
  },
  // mask
  filterMaskMore: {
    elevation: 3,
    top: 70 + 0.5,
    flexDirection: 'row-reverse',
    height: '100%',
  },
  mask: {
    position: 'absolute',
    width: deviceWidth,
    height: '100%',
    backgroundColor: commonColor.lightBlack,
  },

  // renderScaleRuler
  filterPriceView: {
    borderTopWidth: 0.5,
    borderColor: commonColor.greyer,
    paddingBottom: 29,
    backgroundColor: commonColor.white,
  },
  titleViewStyle: {
    paddingBottom: 16,
    paddingTop: 24,
    paddingLeft: 30,
  },
};
