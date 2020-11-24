import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import variables from 'platform';

const {
  deviceWidth,
} = variables;

export default {
  deviceWidth,
  progressContainer: {
    alignItems: 'center',
  },
  progressContent: {
    height: 30,
    paddingLeft: 8,
    marginVertical: 2.5,
    paddingRight: 8,
    justifyContent: 'center',
  },
  // renderScaleLabel
  scaleLabelView: {
    justifyContent: 'space-between',
    marginBottom: 8,
    flexDirection: 'row',
  },
  scaleLabel: {
    fontSize: getPadSize(14),
    lineHeight: getPadSize(20),
  },
  // renderProgress
  progress: {
    height: 6,
    borderRadius: 3,
    width: '100%',
    backgroundColor: commonColor.grey10,
  },
  // renderActiveProgress
  activeProgress: {
    position: 'absolute',
    height: 6,
    left: 8,
    borderRadius: 3,
    backgroundColor: commonColor.brand,
    shadowColor: commonColor.shadowColorBrand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
  },
  // renderRulerScales
  scales: {
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    left: 8,
  },
  // renderScale
  scale: {
    width: 1,
    height: 6,
    marginBottom: 0,
    backgroundColor: commonColor.white,
  },
  sliderImage: {
    position: 'absolute',
    width: 32,
    height: 32,
  },
};
