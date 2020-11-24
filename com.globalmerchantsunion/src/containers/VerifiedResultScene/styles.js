import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import variables from 'platform';
import { formWithLabel } from 'forms/styles';

const {
  minHeight,
  isIphoneX,
} = variables;
const {
  linearProps,
  linearButton,
  linearButtonText,
} = formWithLabel;

export default {
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 36,
    height: minHeight,
  },
  content: {
  },

  image: {
    marginTop: 70,
    marginBottom: 40,
    width: 90,
    height: 90,
  },
  title: {
    fontWeight: '600',
    fontSize: getPadSize(20),
    lineHeight: getPadSize(28),
  },

  text: {
    marginTop: 16,
    fontSize: getPadSize(14),
    lineHeight: getPadSize(20),
    textAlign: 'center',
    color: commonColor.grey650,
  },
  emailText: {
    marginTop: 0,
    color: commonColor.brand,
  },

  linearProps,
  linearButton,
  linearButtonText,
  linearParent: {
    position: 'absolute',
    bottom: isIphoneX ? 80 : 60,
  },
};
