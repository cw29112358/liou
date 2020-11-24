import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
  isIOS,
  isPad,
} = variables;
const tagIOSLeft = isPad ? 5 : 2;

export default {
  item: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginLeft: 8,
    marginRight: 16,
    paddingLeft: 0,
    paddingTop: 16,
    height: isPad ? 315 : 210,
    borderBottomWidth: 0.5,
    borderColor: commonColor.greyer,
  },
  firstItem: {
    height: isPad ? 345 : 230,
    paddingTop: 36,
  },

  // titleLine
  titleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // renderMakeModelYear
  titleLeftView: {
    paddingLeft: 12,
    maxWidth: deviceWidth * 2 / 3,
  },
  blackText: {
    fontSize: isPad ? 24 : 16,
    lineHeight: isPad ? 34 : 22.5,
    color: commonColor.black,
  },
  leftTitle: {
    // maxWidth: deviceWidth * 2 / 3,
  },

  // renderMileageView
  greyText: {
    fontSize: isPad ? 18 : 12,
    lineHeight: isPad ? 25 : 16.5,
    color: commonColor.darkGrey,
    marginBottom: 0.5,
  },
  // renderLoanTag
  loanView: {
    width: isPad ? 82 : 55,
  },
  tagImage: {
    width: isPad ? 82 : 55,
    height: isPad ? 66 : 44,
  },
  tagText: {
    position: 'absolute',
    top: 5,
    left: isIOS ? tagIOSLeft : 0,
    textAlign: 'center',
    color: commonColor.white,
    fontSize: isPad ? 18 : 12,
  },

  // renderImageView
  imageView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    transform: [{
      translateY: -10,
    }],
    width: isPad ? 300 : 200,
    height: isPad ? 225 : 150,
  },
  listView: {
    paddingTop: 24,
    alignItems: 'center',
  },
  priceStyle: {
    priceText: {
      fontWeight: '600',
      fontSize: isPad ? 48 : 32,
      color: commonColor.brand,
    },
    dollarUnit: {
      fontWeight: '400',
      fontSize: isPad ? 36 : 24,
    },
  },
  paymentText: {
    alignSelf: 'flex-end',
    fontSize: isPad ? 20 : 13,
    lineHeight: isPad ? 28 : 18.5,
    color: commonColor.brand,
  },

  specificRow: {
    position: 'absolute',
    bottom: -15,
    left: 12,
  },
};
