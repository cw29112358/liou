// import * as commonColor from 'commonColor';

import variables from 'platform';

const {
  deviceHeight,
  deviceWidth,
  isIphoneX,
} = variables;

export default {
  deviceHeight,
  deviceWidth,
  contentContainer: {
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: isIphoneX ? 34 : 0,
    backgroundColor: '#f3f3f3',
  },
};
