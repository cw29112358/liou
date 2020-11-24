import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isIOS,
} = variables;
export default {
  isIOS,
  videoStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: commonColor.greyE5,
  },
  videoContainer: {
    backgroundColor: 'red',
  },
};
