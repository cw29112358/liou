import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  title: {
    fontSize: isPad ? 30 : 20,
    color: commonColor.black,
    lineHeight: isPad ? 42 : 28,
  },
  // filter
  filterView: {
    paddingTop: isPad ? 24 : 16,
  },
  filterViewVertical: {
    paddingTop: isPad ? 24 : 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  buttonView: {
    flex: 0,
    marginTop: isPad ? 10 : 5,
    marginLeft: -21,
  },
  button: {
    paddingLeft: 5,
    width: isPad ? 180 : 120,
    height: isPad ? 54 : 36,
    marginLeft: 21,
  },
};
