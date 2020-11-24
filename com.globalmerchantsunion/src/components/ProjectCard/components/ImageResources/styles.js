import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  deviceWidth,
} = variables;

export default {
  // renderSmallImages
  imagesView: {
    width: deviceWidth - getPadSize(32),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyView: {
    width: deviceWidth / 3 - getPadSize(16),
  },

  // renderImage
  resourceButton: {
    position: 'absolute',
    top: 0,
    right: getPadSize(16),
    paddingTop: 0,
    paddingBottom: 0,
  },
  resourceButtonText: {
    fontSize: getPadSize(60),
    lineHeight: getPadSize(24),
    color: commonColor.white,
  },

  // ImageResources
  smallImage: {
    width: deviceWidth / 3 - getPadSize(16),
    height: deviceWidth / 3 - getPadSize(16),
    borderRadius: 6,
    overlayColor: commonColor.white,
    marginBottom: 11,
    backgroundColor: commonColor.greyE5,
  },
  resourceImage: {
    width: deviceWidth - getPadSize(32),
    borderRadius: 6,
    overlayColor: commonColor.white,
    height: (deviceWidth - getPadSize(32)) / 2,
    backgroundColor: commonColor.greyE5,
  },
};
