import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  headerHeight,
  statusbarHeight,
  deviceHeight,
  isPad,
} = variables;

export default {
  contentView: {
    marginTop: 5,
    backgroundColor: commonColor.white,
    minHeight: deviceHeight - headerHeight - statusbarHeight,
  },
  listItem: {
    minHeight: 57,
    borderBottomWidth: 0,
    marginLeft: isPad ? 24 : 16,
    paddingRight: isPad ? 24 : 16,
  },
  list: {
    paddingTop: 15,
  },
  labelStyle: {
    fontSize: getPadSize(14, 1.2),
  },

  // modal 中公用样式
  title: {
    fontSize: getPadSize(24, 1.2),
    color: commonColor.black,
    marginBottom: 40,
    fontWeight: '500',
  },
  paragraphText: {
    fontSize: getPadSize(14, 1.2),
    color: commonColor.grey650,
    letterSpacing: 0.6,
    lineHeight: 21,
    marginBottom: 12,
  },
  lastText: {
    marginBottom: 32,
  },
  lastItem: {
    marginBottom: 68,
  },
  tagFont: {
    fontSize: getPadSize(14, 1.2),
    fontWeight: '600',
    color: commonColor.black,
  },

  iconColor: {
    color: commonColor.grey650,
  },
};
