import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  linearView: {
    borderRadius: 44,
    marginRight: -16,
  },
  button: {
    justifyContent: 'center',
    paddingHorizontal: 17.5,
    paddingVertical: 7.5,
    width: 124,
    height: isPad ? 44 : 34,
  },
  buttonText: {
    fontWeight: '500',
    color: commonColor.white,
  },
  disableButton: {
    backgroundColor: commonColor.greyer,
  },
};
