import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  headerHeight,
  footerHeight,
  statusbarHeight,
  deviceHeight,
} = variables;

export default {
  contentBox: {
    justifyContent: 'center',
    backgroundColor: commonColor.white,
  },
  content: {
    minHeight: deviceHeight - headerHeight - footerHeight - statusbarHeight,
  },
};
