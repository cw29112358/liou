import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';

import variables from 'platform';

const {
  isIphoneX,
  deviceWidth,
} = variables;
export default {
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingLeft: getPadSize(16, 1.5),
    paddingRight: getPadSize(16, 1.5),
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: commonColor.white,
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    top: 10,
    right: 0,
    alignSelf: 'flex-start',
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
  },
  icon: {
    paddingTop: 0,
    fontSize: getPadSize(50, 1.2),
    color: commonColor.black,
  },
  headerTitle: {
    paddingTop: getPadSize(24, 1.2),
    paddingBottom: getPadSize(36, 1.2),
    fontWeight: '600',
    fontSize: getPadSize(16, 1.2),
    lineHeight: getPadSize(22.5, 1.2),
  },
  copyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getPadSize(20, 1.2),
    marginBottom: isIphoneX ? 24 : 48.5,
    paddingLeft: getPadSize(12, 1.2),
    paddingRight: getPadSize(12, 1.2),
    height: getPadSize(44, 1.2),
    backgroundColor: commonColor.grey100,
    borderRadius: getPadSize(22, 1.2),
  },
  copySuccess: {
    position: 'absolute',
    top: '50%',
    left: (deviceWidth - getPadSize(100, 1.2)) / 2,
    backgroundColor: commonColor.black,
    borderRadius: 4,
    width: getPadSize(100, 1.2),
    height: getPadSize(40, 1.2),
  },
  copySuccessText: {
    textAlign: 'center',
    fontSize: getPadSize(14, 1.2),
    lineHeight: getPadSize(40, 1.2),
    color: commonColor.white,
  },
  RecommendationCode: {
    fontSize: getPadSize(13, 1.2),
    lineHeight: getPadSize(18.5, 1.2),
    color: commonColor.grey650,
  },
  copyText: {
    fontSize: getPadSize(20, 1.2),
    lineHeight: getPadSize(28, 1.2),
  },
  copyButton: {
    alignSelf: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    height: getPadSize(28, 1.2),
  },
  copyButtonText: {
    fontSize: getPadSize(14, 1.2),
    lineHeight: getPadSize(28, 1.2),
    color: commonColor.normalBlue,
  },
  interpretation: {
    marginBottom: isIphoneX ? 40 : 12,
    fontSize: getPadSize(12, 1.2),
    lineHeight: getPadSize(20, 1.2),
    color: commonColor.darkGrey,
    textAlign: 'center',
  },
  agentTextWrapper: {
    flexDirection: 'row',
  },
  agentText: {
    marginBottom: getPadSize(12, 1.2),
    fontSize: getPadSize(13, 1.2),
    lineHeight: getPadSize(20, 1.2),
  },
  agentTextColor: {
    color: commonColor.agentYellow,
  },
  recommendText: {
    marginBottom: getPadSize(27, 1.2),
  },

  mask: {
    width: '100%',
    height: '100%',
  },
};
