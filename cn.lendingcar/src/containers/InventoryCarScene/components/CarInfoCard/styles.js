import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  isIOS,
} = variables;
export default {
  card: {
    marginRight: 12,
    width: getPadSize(220, 1.2),
  },
  lastCard: {
    marginRight: 50,
  },
  content: {
    paddingLeft: 16,
  },
  imageView: {
    shadowColor: commonColor.shadowColorBlack,
    backgroundColor: commonColor.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
    marginLeft: isIOS ? 0 : 3,
    marginRight: isIOS ? 0 : 3,
    marginTop: isIOS ? 0 : 3,
    borderRadius: 6,
    height: getPadSize(155, 1.2),
  },
  image: {
    height: getPadSize(165, 1.2),
    width: getPadSize(220, 1.2),
    overflow: 'hidden',
    borderRadius: 6,
  },
  tag: {
    position: 'absolute',
    backgroundColor: commonColor.orange550,
    top: getPadSize(10, 1.2),
    left: getPadSize(-25, 1.2),
    width: getPadSize(90, 1.2),
    paddingVertical: 2,
    justifyContent: 'center',
    transform: [{ rotateZ: '-45deg' }],
  },
  tagText: {
    textAlign: 'center',
    fontSize: getPadSize(11, 1.2),
    color: commonColor.white,
  },

  carInfo: {
    paddingRight: 20,
    marginTop: 8,
    marginLeft: isIOS ? 0 : 6,
  },
  carTitle: {
    fontSize: getPadSize(14),
  },
  lastInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  priceStyle: {
    priceText: {
      marginRight: 12,
      fontSize: getPadSize(15, 1.2),
      color: commonColor.black,
    },
    dollarUnit: {
      fontSize: getPadSize(12, 1.2),
      color: commonColor.black,
    },
  },
  mileageText: {
    color: commonColor.darkGrey,
    fontSize: getPadSize(12, 1.2),
  },
};
