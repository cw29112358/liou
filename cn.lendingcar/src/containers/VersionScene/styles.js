import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';

export default {
  contentContainer: {
    alignItems: 'center',
    flex: 1,
  },
  // app
  app: {
    marginTop: getPadSize(130),
    width: getPadSize(100, 1.2),
    height: getPadSize(100, 1.2),
  },
  // text
  textGrey: {
    fontSize: getPadSize(13, 1.2),
    color: commonColor.grey650,
  },
  textGrey2A: {
    color: commonColor.textGrey2A,
  },
  // bottom
  bottomView: {
    position: 'absolute',
    bottom: getPadSize(68, 2),
    width: '100%',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    width: getPadSize(255, 1.2),
    height: getPadSize(40, 1.2),
    borderRadius: getPadSize(6),
    backgroundColor: commonColor.brand,
    shadowColor: commonColor.shadowColorBrand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 1,
  },
  buttonText: {
    fontSize: getPadSize(15, 1.2),
    color: commonColor.white,
  },
};
