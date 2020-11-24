import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  headerHeight,
  statusbarHeight,
  deviceHeight,
} = variables;

export default {
  container: {
    backgroundColor: commonColor.white,
  },
  contentBox: {
    minHeight: deviceHeight - headerHeight - statusbarHeight,
  },
  content: {
  },
};
