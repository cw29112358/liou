import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
  deviceWidth,
} = variables;

export default {
  item: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop: 20,
    width: isPad ? deviceWidth * 0.76 : deviceWidth - 32,
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 6,
    borderRadius: 12,
    backgroundColor: commonColor.white,
    shadowColor: commonColor.shadowColorBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isPad ? 18 : 6,
  },
  // row1 title
  blackText: {
    fontSize: 16,
    lineHeight: 24,
    color: commonColor.black,
  },
  greyText: {
    fontSize: 12,
    lineHeight: 16.5,
    color: commonColor.grey650,
  },
  // row2 image
  imageView: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  image: {
    width: 230,
    height: 172.5,
  },
  // row3 date
  dateView: {
    justifyContent: 'space-around',
    marginTop: 32,
    marginBottom: 8,
  },
  // row4
  arrowImage: {
    width: 16,
    height: 14,
  },
  linkText: {
    color: commonColor.brand,
  },
};
