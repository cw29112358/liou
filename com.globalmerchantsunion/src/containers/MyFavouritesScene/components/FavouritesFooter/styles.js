import * as commonColor from 'commonColor';

export default {
  // renderFooter
  footerShadow: {
    borderTopWidth: 0,
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },

  allChecked: {
    flex: 1.6,
    height: 55,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  allCheckedBox: {
    left: 16,
    borderRadius: 13,
    borderColor: commonColor.greyLight,
  },
  activity: {
    backgroundColor: commonColor.brand,
    borderColor: commonColor.brand,
  },
  selectAll: {
    marginLeft: 28,
    fontSize: 16,
  },

  buttonFooter: {
    alignSelf: 'flex-start',
  },
  footerButtonStyle: {
    borderRadius: 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: commonColor.errorRed,
  },
  footerDisableButtonStyle: {
    backgroundColor: commonColor.greyLight,
  },
  footerButtonText: {
    fontSize: 16,
    color: commonColor.white,
  },
};
