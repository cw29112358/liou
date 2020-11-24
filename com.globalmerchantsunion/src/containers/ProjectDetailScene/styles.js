import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
  isIphoneX,
} = variables;

export default {
  containerStyle: {
    paddingBottom: 80,
  },
  content: {
    flex: 1,
    backgroundColor: commonColor.white,
  },

  buttonGroup: {
    position: 'absolute',
    bottom: isIphoneX ? 70 : 20,
    width: deviceWidth,
    justifyContent: 'space-around',
  },
};
