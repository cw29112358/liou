import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  headerHeight,
  footerHeight,
  statusbarHeight,
  deviceHeight,
} = variables;

export default {
  container: {
    backgroundColor: commonColor.white,
  },
  contentBox: {
    minHeight: deviceHeight - headerHeight - footerHeight - statusbarHeight,
  },
  content: {
  },
};
