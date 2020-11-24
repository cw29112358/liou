import * as commonColor from 'commonColor';

import variables from 'platform';

const {
  isPad,
  statusbarHeight,
  deviceHeight,
  headerHeight,
} = variables;

export default {
  container: {
    backgroundColor: commonColor.white,
  },
  content: {
    minHeight: deviceHeight - headerHeight - statusbarHeight,
  },
  contentWithPadding: {
    paddingTop: 26,
    paddingHorizontal: isPad ? 32 : 16,
  },
};
