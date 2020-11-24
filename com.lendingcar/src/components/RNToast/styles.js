import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  statusbarHeight,
  deviceHeight,
} = variables;

export default {
  statusbarHeight,
  deviceHeight,
  error: {
    backgroundColor: commonColor.red,
  },
  warning: {
    backgroundColor: commonColor.brandWarning,
  },
  success: {
    backgroundColor: commonColor.brandSuccess,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.80)',
    paddingHorizontal: 19,
    minHeight: 44,
    elevation: 0,
  },
  text: {
    fontSize: 15,
    color: commonColor.white,
  },
};
