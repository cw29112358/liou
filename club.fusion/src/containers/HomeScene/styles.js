import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import variables from 'platform';

const {
  isIOS,
  smallScreen,
  deviceWidth,
} = variables;

const isNarrow = deviceWidth <= 360;
export default {
  listContent: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: (isIOS || smallScreen || isNarrow) ? 49 : 0,
    backgroundColor: commonColor.greyF,
  },
  // setHeaderProps
  leftField: {
    flex: 0.3,
  },
  leftButton: {
    paddingRight: 0,
  },
  leftIcon: {
    width: 17,
    height: 21,
  },
  rightIcon: {
    width: 10,
    height: 6,
  },
  leftText: {
    fontSize: getPadSize(12),
    color: commonColor.white,
    marginLeft: 4,
  },
  rightField: {
    flex: 0.3,
    paddingRight: 16,
  },
  rightButton: {
    paddingLeft: 0,
    paddingRight: 0,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  rightText: {
    fontSize: getPadSize(12),
    color: commonColor.white,
    marginRight: 4,
  },
  bodyField: {
    flex: 0.4,
  },
  middleButton: {
    paddingRight: 0,
  },
};
