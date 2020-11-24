import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
} = variables;

export default {
  mask: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    height: '100%',
    backgroundColor: commonColor.lightBlack,
  },
  children: {
    backgroundColor: commonColor.white,
  },
  rest: {
    width: deviceWidth,
    flex: 1,
  },
};
