import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isIOS,
  isIphoneX,
} = variables;

export default {
  isIphoneX,
  // Footer
  footerShadow: {
    borderTopWidth: 0,
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  buttonShadow: {
    shadowOffset: { width: 3, height: 0 },
  },
  holdFee: {
    height: 55,
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: commonColor.white,
  },
  priceLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  priceStyle: {
    priceText: {
      marginRight: 6,
      fontSize: 24,
    },
    dollarUnit: {
    },
  },
  holdText: {
    fontSize: 12,
    color: commonColor.grey650,
    marginBottom: 4,
  },
  buttonFooter: {
    height: 55,
    backgroundColor: isIphoneX ? commonColor.white : commonColor.brand,
  },
  buttonIphoneX: {
    backgroundColor: commonColor.brand,
    flex: 0.9,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
    paddingLeft: 8,
    paddingRight: 8,
  },
  disabledButtonIphoneX: {
    flex: 0.9,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
    paddingLeft: 8,
    paddingRight: 8,
  },
  buttonStyle: {
    borderRadius: 0,
    paddingLeft: isIOS ? 16 : 8,
    paddingRight: isIOS ? 16 : 8,
  },
  disableButtonText: {
    fontSize: 16,
    color: commonColor.black,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 20,
    color: commonColor.white,
  },
};
