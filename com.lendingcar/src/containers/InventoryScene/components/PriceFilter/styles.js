import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
  isPad,
} = variables;

export default {
  buttonView: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: isPad ? 24 : 16,
    paddingTop: 27,
    paddingBottom: 11,
  },
  button: {
    marginBottom: 16,
    width: (deviceWidth - 48) / 3 - (isPad ? 24 : 16),
    height: isPad ? 54 : 36,
    backgroundColor: commonColor.greyF0,
    borderWidth: 0,
  },
  text: {
    color: commonColor.darkGrey,
  },
};
