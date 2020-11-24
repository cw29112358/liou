import * as commonColor from 'commonColor';

import variables from 'platform';

const {
  deviceHeight,
  headerHeight,
} = variables;

export default {
  contentContainer: {
    justifyContent: 'center',
  },
  content: {
    backgroundColor: commonColor.grey200,
  },
  contentView: {
    backgroundColor: commonColor.white,
    minHeight: deviceHeight - headerHeight,
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  footerTble: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  generateText: {
    textAlign: 'center',
    marginVertical: 10,
  },
};
