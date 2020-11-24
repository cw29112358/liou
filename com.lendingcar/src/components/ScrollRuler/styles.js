import * as commonColor from 'commonColor';

export default {
  progressContent: {
    height: 30,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
  },

  activeProgress: {
    position: 'absolute',
    height: 4,
    left: 8,
    backgroundColor: commonColor.brand,
  },
  progress: {
    height: 4,
    backgroundColor: commonColor.grey300,
  },
  scale: {
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    left: 8,
  },
  circleLabelView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 8,
    width: '100%',
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: commonColor.grey300,
  },
  circleLabel: {
    fontSize: 12,
    color: commonColor.grey650,
  },
  smallScale: {
    width: 1,
    height: 6,
    marginBottom: 6,
    backgroundColor: commonColor.grey300,
  },
  activeCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: commonColor.brand,
  },
  activeSmallScale: {
    width: 1,
    height: 6,
    marginBottom: 6,
    backgroundColor: commonColor.brand,
  },

  sliderImage: {
    position: 'absolute',
    width: 32,
    height: 32,
  },
};
