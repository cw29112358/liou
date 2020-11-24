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
  view: {
    width: viewWidth,
    marginTop: isIphoneX ? 44 : 0,
  },
  // header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: commonColor.greyer,
    paddingHorizontal: isBigWidth ? 24 : 16,
    height: 77.5,
  },
  quantity: {
    fontSize: isPad ? 36 : 24,
    color: commonColor.brand,
  },
  unit: {
    fontSize: isPad ? 24 : 16,
    color: commonColor.pureBlack,
  },
  rightText: {
    fontSize: isPad ? 24 : 16,
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
