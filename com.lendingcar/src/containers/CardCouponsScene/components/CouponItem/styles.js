import * as commonColor from 'commonColor';
import { getScaleSize } from 'utils/helpers';

export default {
  listItem: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: getScaleSize(16),
    backgroundColor: commonColor.white,
    borderRadius: 6,
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    height: 140,
  },
  firstItem: {
    marginTop: 20,
  },
  itemLeft: {
    flex: 0.7,
    paddingVertical: 10,
    paddingLeft: getScaleSize(6),
    borderRadius: 6,
  },
  businessName: {
    fontSize: getScaleSize(16),
    fontWeight: '700',
    paddingLeft: getScaleSize(10),
    marginBottom: 5,
  },
  description: {
    fontSize: getScaleSize(14),
    paddingLeft: getScaleSize(10),
    marginBottom: 5,
    color: commonColor.grey650,
  },
  itemRight: {
    flex: 0.3,
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
    borderRadius: 6,
    justifyContent: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 6,
  },
  figureForOne: {
    backgroundColor: commonColor.lightRed,
  },
  figureForTwo: {
    backgroundColor: commonColor.shallowBlue,
  },
  figureForFive: {
    backgroundColor: commonColor.lightPurple,
  },
  itemDisabled: {
    backgroundColor: commonColor.greyLight,
  },
  amount: {
    fontSize: getScaleSize(28),
    textAlign: 'center',
    marginBottom: 20,
    color: commonColor.white,
  },
  button: {
    alignSelf: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    height: 24,
    borderRadius: 50,
    borderColor: commonColor.white,
    width: 60,
  },
  disabledButton: {
    backgroundColor: commonColor.transparent,
  },
  buttonText: {
    fontSize: getScaleSize(12),
    color: commonColor.white,
  },

  divisionLine: {
    position: 'absolute',
    top: 0,
    left: -1,
    borderStyle: 'dashed',
    height: '100%',
    width: 0,
    borderWidth: 1,
    borderColor: commonColor.greyF0,
  },

  priceStyle: {
    priceText: {
      fontSize: getScaleSize(28),
      fontWeight: '500',
      color: commonColor.white,
      marginBottom: 20,
      marginLeft: 5,
      textAlign: 'center',
    },
    dollarUnit: {
      fontSize: getScaleSize(16),
      color: commonColor.white,
    },
  },
};
