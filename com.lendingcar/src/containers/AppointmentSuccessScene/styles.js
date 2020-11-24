import * as commonColor from 'commonColor';

import variables from 'platform';

const {
  isPad,
  deviceWidth,
} = variables;

export default {
  greySeperate: {
    height: 10,
    backgroundColor: commonColor.lightGrey,
  },
  // notice
  noticeText: {
    width: isPad ? deviceWidth - 48 : deviceWidth - 32,
    fontSize: 14,
    color: commonColor.black2,
  },
  noticeView: {
    marginBottom: 40,
  },
};
