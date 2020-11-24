import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  isIOS,
  deviceWidth,
} = variables;

export default {
  isIOS,
  container: {
    width: deviceWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: deviceWidth,
    marginBottom: 20,
    alignItems: 'center',
  },

  image: {
    width: getPadSize(345),
    height: getPadSize(424),
    marginTop: 10,
  },

  detailButton: {
    alignSelf: 'center',
    marginTop: getPadSize(-22),
    height: getPadSize(44),
    paddingLeft: getPadSize(16),
    paddingRight: getPadSize(16),
    borderRadius: getPadSize(44),
    backgroundColor: commonColor.white,
  },
  detailText: {
    color: commonColor.black,
    fontSize: getPadSize(16.5),
  },

  closeButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: getPadSize(25),
    height: getPadSize(25),
    borderRadius: getPadSize(12.5),
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    borderWidth: 1,
    borderColor: commonColor.white,
    top: 0,
    right: getPadSize(16),
    justifyContent: 'center',
    elevation: 0,
  },
};
