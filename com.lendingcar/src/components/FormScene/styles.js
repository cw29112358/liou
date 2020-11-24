import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isIOS,
} = variables;

export default {
  isIOS,
  headerContainer: {
    borderBottomWidth: isIOS ? 0 : 0.5,
  },
  // button
  rightButton: {
    paddingRight: 0,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  rightText: {
    color: commonColor.brand,
  },
};
