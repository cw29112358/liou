import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';

export default {
  columnCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerImage: {
    width: 20,
    height: 20,
  },
  footerText: {
    marginLeft: 4,
    marginTop: 4,
    fontSize: getPadSize(10),
    color: commonColor.grey5,
  },
  footerActiveText: {
    color: commonColor.brand,
  },
  activeFooterButton: {
    backgroundColor: commonColor.white,
  },
  activeFooterText: {
    color: commonColor.brand,
  },
  redDotView: {
    width: 38,
  },
  redDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: commonColor.errorRed,
  },
};
