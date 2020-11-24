import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  listItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: isPad ? 30 : 20,
    marginBottom: isPad ? 30 : 20,
    marginLeft: isPad ? 24 : 16,
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: isPad ? 24 : 16,
    height: 30,
  },
  labelStyle: {
    fontSize: 14,
    color: commonColor.black,
  },
  rightIconStyle: {
    marginLeft: 13,
    color: commonColor.brand,
  },
};
