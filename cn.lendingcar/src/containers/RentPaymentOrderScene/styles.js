import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  statusbarHeight,
  deviceHeight,
  headerHeight,
  isPad,
} = variables;

const isSmallScreen = deviceHeight > 600;

export default {
  contentContainer: {
    alignItems: 'center',
    flex: 1,
  },
  content: {
    paddingTop: 19,
    minHeight: deviceHeight - headerHeight - statusbarHeight,
  },
  paymentBox: {
    marginTop: 85,
    width: '100%',
  },
  paymentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: commonColor.greyE5,
    paddingHorizontal: isPad ? 24 : 16,
    height: 74,
  },
  paymentTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alipayImage: {
    width: 22,
    height: 22,
  },
  paymentText: {
    marginLeft: 16,
    fontSize: getPadSize(16),
  },
  paymentIcon: {
    fontSize: 22,
    color: commonColor.brand,
  },
  paymentTip: {
    marginTop: 21,
    paddingHorizontal: isPad ? 48 : 32,
    fontSize: getPadSize(12),
    color: commonColor.greyLight,
  },
  // button
  button: {
    position: 'absolute',
    bottom: isSmallScreen ? 56 : 20,
    alignSelf: 'center',
    width: isPad ? 275 : 235,
    height: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: commonColor.brown,
    shadowColor: commonColor.brown,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    width: '100%',
    fontWeight: '600',
    fontSize: getPadSize(15),
    lineHeight: isPad ? 54 : 45,
    color: commonColor.brownGlod,
    textAlign: 'center',
  },
  // paymentResult
  resultText: {
    marginTop: getPadSize(5, 1.5),
    marginBottom: getPadSize(44, 1.2),
    width: getPadSize(144, 1.5),
    fontSize: getPadSize(14, 1.5),
    textAlign: 'center',
    color: commonColor.black,
  },
  resultBottomLine: {
    paddingBottom: getPadSize(32, 1.2),
    marginBottom: isPad ? 172.5 : 82.5,
  },
};
