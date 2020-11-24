import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
  isPad,
} = variables;
export default {
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonColor.white,
    height: 96,
  },
  inputWrapper: {
    height: 40,
    width: deviceWidth,
    paddingHorizontal: isPad ? 24 : 16,
  },
  searchInput: {
    paddingLeft: 12,
    paddingRight: 12,
    width: '100%',
    borderRadius: 6,
    backgroundColor: commonColor.grey100,
  },
  viewWithDelete: {
    paddingRight: 40,
  },
  deleteView: {
    height: 40,
    right: 0,
  },
};
