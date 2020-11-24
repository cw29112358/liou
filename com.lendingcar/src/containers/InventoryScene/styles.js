import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
  statusbarHeight,
  deviceWidth,
} = variables;

export default {
  container: {
    backgroundColor: commonColor.white,
  },
  // filterBar
  filterView: {
    marginTop: 20,
    paddingHorizontal: isPad ? 80 : 16,
    paddingBottom: 20,
  },
  // mask
  filterMaskMore: {
    elevation: 3,
    top: statusbarHeight,
    flexDirection: 'row-reverse',
    height: '100%',
  },
  mask: {
    position: 'absolute',
    width: deviceWidth,
    height: '100%',
    backgroundColor: commonColor.lightBlack,
  },
};
