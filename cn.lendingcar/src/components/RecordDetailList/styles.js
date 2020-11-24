import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  deviceWidth,
  deviceHeight,
} = variables;

export default {
  srcollView: {
    height: deviceHeight / 2,
  },
  list: {
    paddingBottom: deviceHeight / 5,
  },
  listItem: {
    marginLeft: 0,
    justifyContent: 'space-between',
    paddingRight: 0,
    borderColor: commonColor.greyer,
  },
  leftView: {
    width: deviceWidth / 2,
  },
  explainText: {
    fontSize: getPadSize(13, 1.2),
    color: commonColor.black,
    marginBottom: 5,
  },
  noteText: {
    fontSize: getPadSize(12, 1.2),
    color: commonColor.darkGrey,
  },
  rightView: {
    width: deviceWidth / 3,
  },
  tradingText: {
    fontSize: getPadSize(16, 1.2),
    color: commonColor.black,
    fontWeight: '500',
    marginBottom: 4,
  },
  leftText: {
    textAlign: 'right',
  },
  errorText: {
    color: commonColor.red,
  },
};
