import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
  deviceWidth,
} = variables;

export default {
  content: {
    justifyContent: 'center',
    paddingHorizontal: isPad ? 24 : 16,
  },

  // item
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderBottomWidth: 1,
    borderColor: commonColor.greyer,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  iconImage: {
    width: isPad ? 48 : 24,
    height: isPad ? 48 : 24,
  },
  labelText: {
    fontSize: isPad ? 20 : 13,
    marginLeft: 15,
    fontWeight: '600',
    color: commonColor.black,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceStyle: {
    priceText: {
      fontSize: isPad ? 36 : 24,
      color: commonColor.black,
    },
    dollarUnit: {
      fontSize: isPad ? 36 : 24,
      color: commonColor.black,
    },
  },
  noteText: {
    width: deviceWidth / 5,
    fontSize: isPad ? 20 : 13,
    marginLeft: 8,
    color: commonColor.darkGrey,
  },
  button: {
    alignSelf: 'center',
    marginTop: 30,
    minWidth: deviceWidth / 2,
    shadowColor: commonColor.shadowColorBrand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
    paddingVertical: isPad ? 12 : 6,
  },
  buttonText: {
    fontSize: isPad ? 22.5 : 15,
    textAlign: 'center',
    minWidth: deviceWidth / 2,
  },
};
