import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
  deviceWidth,
  isIOS,
} = variables;

export default {
  sliderLength: isPad ? deviceWidth - 48 - 40 : deviceWidth - 32 - 40,
  // slide
  sliderView: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 42,
  },
  sliderValueView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 12,
  },
  sliderValue: {
    fontSize: isPad ? 21 : 14,
    lineHeight: isPad ? 30 : 20,
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
    backgroundColor: commonColor.white,
    shadowColor: commonColor.faintBlack,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
  },
  marker: {
    position: 'absolute',
    left: isIOS ? -20 : -1,
    top: isIOS ? -17 : 0,
    width: 40,
    height: 40,
  },
  containerStyle: {
    height: 40,
  },
  truckStyle: {
    backgroundColor: commonColor.grey10,
  },
  selectedStyle: {
    height: 4,
    backgroundColor: commonColor.brand,
    shadowColor: commonColor.shadowColorBrand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
  },
  unselectedStyle: {
    backgroundColor: commonColor.grey10,
  },
};
