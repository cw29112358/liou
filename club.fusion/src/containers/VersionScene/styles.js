import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import variables from 'platform';

const {
  deviceWidth,
  isIphoneX,
} = variables;

const reservedHeight = isIphoneX ? 30 : 0;

export default {
  contentContainer: {
    alignItems: 'center',
    flex: 1,
  },
  // app
  app: {
    marginTop: 60,
    width: 100,
    height: 100,
  },
  // text
  textView: {
    marginTop: 184.5,
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: getPadSize(14),
    color: commonColor.black,
  },
  sbuTitle: {
    marginTop: 12,
    fontSize: getPadSize(13),
    color: commonColor.black,
  },
  textGrey: {
    color: commonColor.grey29,
  },
  // button
  linearStyle: {
    position: 'absolute',
    left: (deviceWidth - 255) / 2,
    bottom: 68 + reservedHeight,
    borderRadius: 6,
  },
  button: {
    justifyContent: 'center',
    width: 255,
    height: 40,
    backgroundColor: commonColor.transparent,
  },
  buttonText: {
    fontSize: getPadSize(15),
    color: commonColor.white,
  },
};
