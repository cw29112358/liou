import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    height: isPad ? 86 : 57.5,
    paddingTop: 8,
    paddingLeft: isPad ? 24 : 16,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderColor: commonColor.greyer,
  },
  leftLabel: {
    fontSize: isPad ? 36 : 24,
    color: commonColor.brand,
  },
  rightLabel: {
    marginTop: 5,
    fontSize: isPad ? 24 : 16,
    color: commonColor.pureBlack,
  },
};
