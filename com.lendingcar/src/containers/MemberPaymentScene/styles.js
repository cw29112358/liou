import * as commonColor from 'commonColor';
import variables from 'platform';
import { getScaleSize } from 'utils/helpers';

const {
  smallScreen,
} = variables;

export default {
  contentContainer: {
    alignItems: 'center',
  },
  content: {
    paddingTop: 20,
    flex: 1,
  },
  // paymentMethods
  paymentMethodsWrapper: {
    marginTop: smallScreen ? 40 : 75,
    width: '100%',
    borderTopWidth: 1,
    borderColor: commonColor.grey200,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: getScaleSize(16),
    paddingRight: 24,
    height: 60,
    borderBottomWidth: 1,
    borderColor: commonColor.grey200,
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // image
  creditsImage: {
    marginRight: 20,
    width: 40,
    height: 12.5,
  },
  bitcoinsImage: {
    marginLeft: 9,
    marginRight: 29,
    width: 22,
    height: 22,
  },
  ethereumImage: {
    marginLeft: 12.5,
    marginRight: 32.5,
    width: 15,
    height: 24,
  },
  describe: {
    fontSize: getScaleSize(16),
  },

  // membershipAgreement
  membershipAgreementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: getScaleSize(16),
  },
  agreementText: {
    fontSize: getScaleSize(12),
    color: commonColor.brand,
    marginLeft: 8,
    marginBottom: 3,
  },
  // button
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: smallScreen ? 20 : 40,
    width: 235,
    backgroundColor: commonColor.brown,
    shadowColor: commonColor.shadowColorBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 15,
    color: commonColor.brownGlod,
  },
};
