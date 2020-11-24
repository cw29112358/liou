import * as commonColor from 'commonColor';
// import variables from 'platform';
import { getPadSize } from 'utils/helpers';

export default {
  titleLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  horizontalLine: {
    height: getPadSize(1, 1.2),
    width: getPadSize(32, 1.2),
    marginHorizontal: getPadSize(8, 1.2),
    backgroundColor: commonColor.greyer,
  },
  title: {
    fontSize: getPadSize(20, 1.2),
    color: commonColor.black,
  },

  cardsGroup: {
    paddingVertical: 20,
    marginLeft: -10,
    // paddingLeft: isPad ? 34 : 26,
    paddingLeft: getPadSize(26, 1.2),
  },
};
