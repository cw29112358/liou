import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
  isIOS,
} = variables;
export default {
  titleContent: {
    paddingHorizontal: isPad ? 24 : 16,
  },

  featureLine: {
    paddingVertical: 10,
    paddingLeft: isPad ? 34 : 26,
    marginLeft: -10,
  },
  featureBlock: {
    width: isPad ? 120 : 90,
    height: isPad ? 130 : 100,
    backgroundColor: commonColor.white,
    marginRight: isIOS ? 12 : 6,
    marginLeft: isIOS ? 0 : 6,
    marginTop: isIOS ? 0 : 3,
    marginBottom: isIOS ? 0 : 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingHorizontal: 4,
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  lastBlock: {
    marginRight: 50,
  },

  // renderDetails
  label: {
    fontSize: isPad ? 19.5 : 13,
    color: commonColor.darkGrey,
    textAlign: 'center',
    marginTop: 12,
  },
  value: {
    fontSize: isPad ? 19.5 : 13,
    color: commonColor.black,
    textAlign: 'center',
  },
};
