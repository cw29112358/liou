import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  isPad,
  deviceWidth,
} = variables;
export default {
  content: {
  },
  detailContent: {
    paddingLeft: getPadSize(16),
    paddingRight: getPadSize(16),
  },

  titleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: getPadSize(16),
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalLine: {
    width: getPadSize(3, 1.2),
    backgroundColor: commonColor.brand,
    height: getPadSize(18, 1.2),
    marginRight: 8,
  },
  title: {
    fontSize: getPadSize(16, 1.2),
    color: commonColor.black,
    fontWeight: '600',
  },

  membershipsNote: {
    fontSize: getPadSize(12, 1.2),
    color: commonColor.brownGlod,
  },

  planCard: {
    flexDirection: 'row',
    marginTop: getPadSize(20, 1.2),
    marginBottom: getPadSize(8, 1.2),
    paddingTop: getPadSize(8, 1.2),
    paddingBottom: getPadSize(16, 1.2),
    width: deviceWidth - getPadSize(16) * 2,
    justifyContent: 'space-around',
    borderRadius: 6,
    backgroundColor: commonColor.white,
    shadowColor: commonColor.shadowColorBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  downPayment: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: getPadSize(100, 1.2),
  },
  priceStyle: {
    priceText: {
      marginTop: getPadSize(30, 1.2),
      fontSize: getPadSize(24, 1.2),
      color: commonColor.brand,
    },
    dollarUnit: {
      fontSize: getPadSize(16, 1.2),
      color: commonColor.brand,
    },
  },
  paymentLabel: {
    fontSize: getPadSize(13, 1.2),
    marginTop: isPad ? 5 : 0,
    color: commonColor.white,
  },

  image: {
    position: 'absolute',
    width: getPadSize(77, 1.2),
    height: getPadSize(41, 1.2),
    top: -8,
  },

  consultNote: {
    fontSize: getPadSize(12, 1.2),
    color: commonColor.darkGrey,
  },
  linkText: {
    color: commonColor.blue,
    fontSize: getPadSize(12, 1.2),
  },
};
