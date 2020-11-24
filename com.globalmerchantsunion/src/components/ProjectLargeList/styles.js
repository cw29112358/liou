import * as commonColor from 'commonColor';
import variables from 'platform';
// import { getPadSize } from 'utils/helpers';

const {
  deviceWidth,
  isIphoneX,
  isIOS,
} = variables;

export default {
  deviceWidth,
  isIphoneX,
  isIOS,
  greyF: commonColor.greyF,
  brand: commonColor.brand,
  seperatorBottom: isIphoneX ? 50 : 20,

  // renderListItem
  listItem: {
    flexDirection: 'row',
    borderBottomWidth: 12,
    backgroundColor: commonColor.white,
    borderBottomColor: commonColor.greyF,
  },
};
