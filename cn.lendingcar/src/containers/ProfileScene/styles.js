import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  minHeight,
  deviceWidth,
  isPad,
} = variables;

export default {
  // modal
  modalView: {
    height: minHeight,
  },
  modalText: {
    width: isPad ? deviceWidth - 48 : deviceWidth - 32,
    fontSize: getPadSize(14, 1.2),
    lineHeight: getPadSize(21, 1.2),
    color: commonColor.grey650,
  },
  modalFooterText: {
    position: 'absolute',
    bottom: getPadSize(24, 1.2),
    alignSelf: 'center',
    width: deviceWidth * 2 / 3,
    fontSize: getPadSize(12, 1.2),
    lineHeight: getPadSize(21, 1.2),
    color: commonColor.darkGrey,
    textAlign: 'center',
  },
  infoView: {
    paddingTop: 26,
  },
  infoItem: {
    marginBottom: 24,
  },
};
