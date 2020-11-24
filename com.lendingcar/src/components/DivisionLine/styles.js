import * as commonColor from 'commonColor';

export default {
  imageView: {
    flexDirection: 'row',
    height: 1,
    overflow: 'hidden',
  },
  imageViewWithCircle: {
    alignItems: 'center',
    height: 12,
  },
  separateImage: {
    flex: 1,
    width: 6,
    height: 1,
  },
  circle: {
    position: 'absolute',
    top: 0,
    width: 6,
    height: 12,
    backgroundColor: commonColor.transparentBlack,
  },
  circleLeft: {
    left: -6,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  circleRight: {
    right: -6,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
};
