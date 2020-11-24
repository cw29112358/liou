import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  isPad,
  isIOS,
} = variables;
export default {
  content: {
  },

  titleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: getPadSize(16),
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalLine: {
    width: getPadSize(3, 1.2),
    backgroundColor: commonColor.brand,
    height: getPadSize(18, 1.2),
    marginRight: 8,
  },
  title: {
    fontSize: getPadSize(16, 1.2),
    color: commonColor.black,
    fontWeight: '600',
  },
  button: {
    paddingRight: 0,
  },
  buttonColor: {
    fontSize: getPadSize(16, 1.2),
    color: commonColor.black,
    marginRight: 3,
    paddingTop: isPad ? 1 : 0,
  },
  iconColor: {
    fontSize: getPadSize(24),
    color: commonColor.grey650,
    paddingTop: isPad ? 0 : 2,
  },

  featureLine: {
    paddingVertical: 10,
    paddingLeft: isPad ? 34 : 26,
    marginLeft: -10,
  },
  featureBlock: {
    width: getPadSize(90, 1.2),
    height: getPadSize(100, 1.2),
    backgroundColor: commonColor.white,
    marginRight: isIOS ? 12 : 6,
    marginLeft: isIOS ? 0 : 6,
    marginTop: isIOS ? 0 : 3,
    marginBottom: isIOS ? 0 : 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingHorizontal: getPadSize(4, 1.2),
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  lastBlock: {
    marginRight: 50,
  },
  text: {
    fontSize: getPadSize(13, 1.2),
    color: commonColor.grey650,
    fontWeight: '600',
  },
  icon: {
    color: commonColor.black,
  },

  label: {
    fontSize: getPadSize(13, 1.2),
    color: commonColor.darkGrey,
    textAlign: 'center',
    marginTop: 12,
  },
  value: {
    fontSize: getPadSize(13, 1.2),
    color: commonColor.black,
    textAlign: 'center',
  },
};
