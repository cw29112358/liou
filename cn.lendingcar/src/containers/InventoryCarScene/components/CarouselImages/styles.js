import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
} = variables;

const swiperHeight = deviceWidth * 3 / 4;

export default {
  // renderSwiper
  swiperHeight,
  brand: commonColor.brand,
  grey: commonColor.grey10,
  defaultImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonColor.transparent,
    height: swiperHeight,
    width: deviceWidth,
    marginBottom: -30,
  },
  imageStyle: {
    borderRadius: 0,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 4,
    marginRight: 4,
  },
};
