import * as commonColor from 'commonColor';

import variables from 'platform';

const {
  statusbarHeight,
  deviceWidth,
  deviceHeight,
  headerHeight,
  isPad,
  smallScreen,
} = variables;

export default {
  contentContainer: {
    alignItems: 'center',
  },
  content: {
    backgroundColor: commonColor.white,
    height: deviceHeight - headerHeight - statusbarHeight,
  },
  wrapper: {
    alignItems: 'center',
    marginTop: 32,
  },
  paymentMoneyWrapper: {
    paddingBottom: 10,
    width: deviceWidth,
    borderBottomWidth: 10,
    borderColor: commonColor.lightGrey,
  },
  paymentMoney: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 30,
    marginTop: 5,
    marginBottom: 10,
  },
  amount: {
    color: commonColor.brand,
  },
  amountText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 13,
    color: commonColor.grey650,
  },
  paymentMoneyText: {
    marginLeft: 10,
    fontSize: 20,
  },
  priceStyle: {
    priceText: {
      fontSize: 20,
      color: commonColor.brand,
    },
    dollarUnit: {
      fontSize: 14,
      color: commonColor.black,
    },
  },
  toPayDescribe: {
    marginTop: 23,
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 13,
    color: commonColor.grey650,
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: commonColor.brand,
    shadowColor: commonColor.shadowColorBrand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  payButton: {
    marginTop: smallScreen ? 15 : 23,
    marginBottom: 40,
    width: 220,
  },
  clickPay: {
    fontSize: 14,
    lineHeight: 20,
  },
  labelStyle: {
    fontSize: 16,
  },
  seperatorStyle: {
    width: 155,
    backgroundColor: commonColor.grey200,
  },
  copyContent: {
    marginTop: 17,
    marginBottom: 23,
    marginLeft: isPad ? 24 : 12,
    marginRight: isPad ? 24 : 12,
  },
  currencyAddress: {
    marginBottom: 12,
    fontSize: 13,
    color: commonColor.grey650,
  },
  copyButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 8,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: commonColor.darkGrey,
  },
  addresses: {
    flex: 1,
    fontSize: 12,
  },
  // paymentResult
  resultText: {
    marginTop: 5,
    marginBottom: 44,
    width: deviceWidth / 2,
    fontSize: 14,
    textAlign: 'center',
    color: commonColor.black,
  },
  resultBottomLine: {
    paddingBottom: 32,
    marginBottom: isPad ? 172.5 : 82.5,
  },
};
