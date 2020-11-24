import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
  isIOS,
} = variables;

export const sliderMargin = 32;

export default {
  sliderLength: deviceWidth - sliderMargin * 2 - 32,
  // slide
  sliderView: {
    alignItems: 'center',
  },
  sliderValueView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 8,
  },
  sliderValue: {
    fontSize: getPadSize(14, 1.2),
    lineHeight: getPadSize(20, 1.2),
    color: commonColor.black,
  },
  sliderValueLeft: {
    transform: [{
      translateX: -15,
    }],
  },
  sliderValueRight: {
    transform: [{
      translateX: 15,
    }],
  },
  markerView: {
    width: isIOS ? 1 : 35,
    height: isIOS ? 2 : 35,
    backgroundColor: commonColor.transparent,
    shadowColor: commonColor.faintBlack,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
  },
  marker: {
    position: 'absolute',
    left: isIOS ? -16 : -1,
    top: isIOS ? -11 : 5,
    width: 32,
    height: 32,
  },
  containerStyle: {
    height: 32,
  },
  truckStyle: {
    backgroundColor: commonColor.grey10,
  },
  selectedStyle: {
    height: 6,
    borderRadius: 3,
    backgroundColor: commonColor.brand,
    shadowColor: commonColor.shadowColorBrand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
  },
  unselectedStyle: {
    height: 6,
    borderRadius: 3,
    backgroundColor: commonColor.grey10,
  },
};
