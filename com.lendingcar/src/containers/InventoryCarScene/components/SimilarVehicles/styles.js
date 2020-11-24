import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  titleLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  horizontalLine: {
    height: 1,
    width: isPad ? 48 : 32,
    marginHorizontal: 8,
    backgroundColor: commonColor.greyer,
  },
  title: {
    fontSize: isPad ? 30 : 20,
    color: commonColor.black,
  },

  cardsGroup: {
    paddingVertical: 20,
    marginLeft: -10,
    paddingLeft: isPad ? 34 : 26,
  },
};
