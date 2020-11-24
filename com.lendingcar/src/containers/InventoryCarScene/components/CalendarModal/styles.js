import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
  bottomDistance,
  isIphoneX,
} = variables;

export default {
  calanderView: {
    flex: 1,
    backgroundColor: commonColor.white,
  },
  modalTitle: {
    color: commonColor.black,
    fontSize: 20,
  },
  timeNote: {
    paddingLeft: isPad ? 24 : 16,
    fontSize: isPad ? 18 : 12,
    color: commonColor.darkGrey,
  },
  modalFooter: {
    position: 'absolute',
    bottom: isIphoneX ? 60 : bottomDistance,
    right: 0,
    left: 0,
  },
  confirmButton: {
    alignSelf: 'center',
    paddingLeft: isPad ? 175 : 117,
    paddingRight: isPad ? 175 : 117,
    height: 50,
    elevation: 0,
  },
  confirmText: {
    fontSize: 16,
    lineHeight: 22.5,
  },

  headerContainer: {
    marginTop: 18,
  },
};
