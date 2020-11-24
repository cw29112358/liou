import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  content: {
    paddingBottom: 62,
  },
  title: {
    fontSize: isPad ? 30 : 20,
    color: commonColor.black,
    lineHeight: isPad ? 42 : 28,
  },
  buttonView: {
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginLeft: -21,
  },
  button: {
    marginTop: 21,
    marginLeft: 21,
    width: isPad ? 180 : 120,
    height: isPad ? 54 : 36,
    backgroundColor: commonColor.lightGrey,
    borderWidth: 0,
  },
};
