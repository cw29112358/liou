import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  scenePaddingWidth,
} = variables;

export default {
  view: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 32,
    paddingHorizontal: scenePaddingWidth,
  },
  title: {
    fontSize: getPadSize(16),
    fontWeight: '600',
    color: commonColor.black,
  },
  button: {
    flexDirection: 'column',
    marginRight: 40,
    borderWidth: 0,
    width: 'auto',
    height: 'auto',
  },

  imageView: {
    paddingTop: 16,
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
  redDot: {
    position: 'absolute',
    left: 20 + 9,
    top: 8,
    width: 24,
    borderRadius: 8,
    backgroundColor: commonColor.errorRed,
  },
  redDotText: {
    textAlign: 'center',
    fontSize: getPadSize(12),
    lineHeight: 16.5,
    color: commonColor.white,
  },

  text: {
    fontSize: getPadSize(13),
    color: commonColor.grey650,
  },
};
