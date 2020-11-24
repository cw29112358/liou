import * as commonColor from 'commonColor';

import variables from 'platform';

const {
  statusbarHeight,
  deviceHeight,
  headerHeight,
} = variables;

export default {
  container: {
    backgroundColor: commonColor.white,
  },
  contentBox: {
    height: '100%',
    minHeight: deviceHeight - headerHeight - statusbarHeight,
  },
  content: {
  },
};
