import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isIOS,
} = variables;
export default {
  card: {
    marginRight: 12,
    width: 220,
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
    height: 145,
  },
  image: {
    height: 165,
    width: 220,
    overflow: 'hidden',
    borderRadius: 6,
  },
  tag: {
    position: 'absolute',
    backgroundColor: commonColor.orange550,
    top: 10,
    left: -25,
    width: 90,
    paddingVertical: 2,
    justifyContent: 'center',
    transform: [{ rotateZ: '-45deg' }],
  },
  tagText: {
    textAlign: 'center',
    fontSize: 11,
    color: commonColor.white,
  },

  carInfo: {
    paddingRight: 20,
    marginTop: 8,
    marginLeft: isIOS ? 0 : 6,
  },
  lastInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  priceStyle: {
    priceText: {
      marginRight: 12,
      fontSize: 15,
      color: commonColor.black,
    },
    dollarUnit: {
      fontSize: 12,
      color: commonColor.black,
    },
  },
};
