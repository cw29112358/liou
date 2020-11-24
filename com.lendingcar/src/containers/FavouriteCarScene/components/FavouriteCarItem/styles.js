import * as commonColor from 'commonColor';

export default {
  listItem: {
    marginTop: 12,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  touchableHighlightStyle: {
    backgroundColor: commonColor.grey200,
  },
  listItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  checkBox: {
    marginRight: 26,
    borderColor: commonColor.greyLight,
  },
  listItemContent: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    borderRadius: 6,
    backgroundColor: commonColor.white,
  },
  image: {
    width: 120,
    height: 90,
  },
  carTitle: {
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 22.5,
    color: commonColor.black,
  },
  priceStyle: {
    marginBottom: 8,
    fontSize: 12,
    lineHeight: 16.5,
    color: commonColor.darkGrey,
  },
  depositFinance: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  depositText: {
    marginRight: 16,
    fontSize: 13,
    color: commonColor.brand,
  },
  depositStyle: {
    priceText: {
      fontSize: 20,
    },
    dollarUnit: {
      fontSize: 14,
    },
  },
  monthlyText: {
    fontSize: 12,
    color: commonColor.brand,
  },
};
