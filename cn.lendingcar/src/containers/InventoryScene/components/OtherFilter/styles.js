import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  statusbarHeight,
  deviceWidth,
  isIphoneX,
  isPad,
} = variables;
let viewWidth = Math.ceil(deviceWidth * 0.8);

if (deviceWidth > 450) {
  viewWidth = 450;
} else if (deviceWidth > 293) {
  viewWidth = 293;
}
const isBigWidth = viewWidth > 434;

export default {
  isBigWidth,
  isPad,
  view: {
    width: viewWidth,
  },
  // header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: commonColor.greyer,
    paddingHorizontal: isBigWidth ? 24 : 16,
    height: 77.5,
  },
  quantityView: {
    flexDirection: 'row',
  },
  quantity: {
    fontWeight: '600',
    fontSize: getPadSize(24, 1.2),
    color: commonColor.brand,
  },
  unit: {
    fontSize: getPadSize(16, 1.2),
    color: commonColor.pureBlack,
  },
  rightText: {
    fontWeight: '600',
    fontSize: getPadSize(16, 1.2),
    color: commonColor.grey650,
  },
  // filter
  filterView: {
    paddingHorizontal: isBigWidth ? 24 : 16,
    paddingTop: 29,
    height: '100%',
  },
  scrollViewContainer: {
    paddingBottom: statusbarHeight + 77.5 + (isIphoneX ? 44 : 0),
  },
};
