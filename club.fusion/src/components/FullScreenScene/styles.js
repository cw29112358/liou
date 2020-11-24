import * as commonColor from 'commonColor';

import variables from 'platform';

const {
  scenePaddingWidth,
  minHeight,
} = variables;

export default {
  minHeight,
  container: {
    backgroundColor: commonColor.white,
  },
  content: {
    minHeight,
  },
  contentWithPadding: {
    paddingTop: 26,
    paddingHorizontal: scenePaddingWidth,
  },
};
