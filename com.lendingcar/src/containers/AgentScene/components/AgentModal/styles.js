import * as commonColor from 'commonColor';
import { getScaleSize } from 'utils/helpers';
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
    paddingLeft: getScaleSize(16),
    paddingRight: getScaleSize(16),
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
    fontSize: 50,
    color: commonColor.black,
  },
  headerTitle: {
    paddingTop: 24,
    paddingBottom: 36,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22.5,
  },
  copyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: isIphoneX ? 24 : 48.5,
    paddingLeft: 12,
    paddingRight: 12,
    height: 44,
    backgroundColor: commonColor.grey100,
    borderRadius: 22,
  },
  copySuccess: {
    position: 'absolute',
    top: '50%',
    left: (deviceWidth - 100) / 2,
    backgroundColor: commonColor.black,
    borderRadius: 4,
    width: 100,
    height: 40,
  },
  copySuccessText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 40,
    color: commonColor.white,
  },
  RecommendationCode: {
    fontSize: 13,
    lineHeight: 18.5,
    color: commonColor.grey650,
  },
  recommendationCodeTip: {
    marginVertical: 20,
  },
  copyText: {
    fontSize: 20,
    lineHeight: 28,
  },
  copyButton: {
    alignSelf: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    height: 28,
  },
  copyButtonText: {
    fontSize: 14,
    lineHeight: 28,
    color: commonColor.normalBlue,
  },
  interpretation: {
    marginBottom: isIphoneX ? 40 : 12,
    fontSize: 12,
    lineHeight: 20,
    color: commonColor.darkGrey,
    textAlign: 'center',
  },
  agentTextWrapper: {
    flexDirection: 'row',
  },
  agentText: {
    marginBottom: 12,
    fontSize: 13,
    lineHeight: 20,
  },
  agentTextColor: {
    color: commonColor.agentYellow,
  },
  recommendText: {
    marginBottom: 27,
  },

  mask: {
    width: '100%',
    height: '100%',
  },
};
