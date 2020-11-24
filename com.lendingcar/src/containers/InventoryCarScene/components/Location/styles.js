import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  content: {
    paddingHorizontal: isPad ? 24 : 16,
  },
  // pickupAddress
  text: {
    fontSize: isPad ? 19.5 : 13,
    color: commonColor.grey650,
    fontWeight: '600',
  },
  linkText: {
    color: commonColor.brand,
  },
};
