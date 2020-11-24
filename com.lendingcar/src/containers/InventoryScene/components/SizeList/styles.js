import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  list: {
    borderTopWidth: 1,
    borderColor: commonColor.greyer,
    paddingHorizontal: isPad ? 24 : 16,
  },
  listItem: {
    justifyContent: 'space-between',
    marginLeft: 0,
    paddingLeft: 12,
    paddingRight: 12,
    height: isPad ? 120 : 80,
    borderColor: commonColor.greyer,
  },
  text: {
    fontSize: isPad ? 21 : 14,
    color: commonColor.black,
  },
  activeText: {
    color: commonColor.brand,
  },
};
