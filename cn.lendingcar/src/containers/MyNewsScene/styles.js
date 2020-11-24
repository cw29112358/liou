import * as commonColor from 'commonColor';

import variables from 'platform';

const {
  deviceWidth,
  isPad,
  isIOS,
} = variables;

export default {
  isPad,
  isIOS,
  deviceWidth,
  headerContainer: {
    borderBottomWidth: isIOS ? 0 : 0.5,
    borderBottomColor: commonColor.greyer,
  },

  touchableOpacity: {
    marginHorizontal: isPad ? 24 : 16,
    marginTop: 18,
    borderRadius: isPad ? 9 : 6,
    backgroundColor: commonColor.white,
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },

  padItem: {
    marginHorizontal: 12,
    borderBottomWidth: 0.5,
    paddingTop: 15,
    paddingBottom: 20,
    borderBottomColor: commonColor.greyer,
  },

  titleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isPad ? 24 : 15,
  },
  padTitle: {
    fontSize: 17,
    width: (deviceWidth - (isPad ? 84 : 56)) * 2 / 3,
    color: commonColor.black,
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
    color: commonColor.darkGrey,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  padImage: {
    width: deviceWidth / 3 - 20,
    height: (deviceWidth / 3 - 20) * 3 / 4,
    borderRadius: isPad ? 9 : 6,
    marginRight: 0,
  },
  notMask: {
    width: deviceWidth / 3 - 20,
    height: (deviceWidth / 3 - 20) * 3 / 4,
    borderRadius: isPad ? 5 : 3,
    marginRight: 0,
    marginBottom: 0,
  },

  contentLeft: {
    justifyContent: 'space-between',
  },
  padNote: {
    fontSize: 14,
    width: deviceWidth * 2 / 3 - 50,
    height: (deviceWidth / 3 - 20) * 3 / 4,
    color: commonColor.darkGrey,
    lineHeight: 20,
  },
  noImage: {
    width: 'auto',
    height: 'auto',
  },
  carText: {
    height: (deviceWidth / 3 - 20) * 3 / 4 - 20,
  },
  tagLine: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tag: {
    height: 20,
    marginRight: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: commonColor.faintBrand,
  },
  tagText: {
    color: commonColor.brand,
    fontSize: 12,
  },
  priceStyle: {
    priceText: {
      color: commonColor.brand,
      fontSize: 12,
    },
    dollarUnit: {
      color: commonColor.brand,
      fontSize: 12,
    },
  },
};
