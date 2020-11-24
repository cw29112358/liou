import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  button: {
    marginTop: isPad ? 8 : 5,
    marginRight: -13.5,
    paddingLeft: 20,
    paddingRight: 19.5,
    paddingTop: 8,
    paddingBottom: 7.5,
    height: isPad ? 44 : 34,
    width: 124,
    borderRadius: 34,
    justifyContent: 'center',
  },
  disableButton: {
    backgroundColor: commonColor.greyer,
  },
};
