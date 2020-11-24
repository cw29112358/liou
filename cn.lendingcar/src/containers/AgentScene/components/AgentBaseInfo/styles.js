import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  isPad,
} = variables;
export default {
  content: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: getPadSize(14, 1.2),
    paddingHorizontal: isPad ? 24 : 16,
  },
  avatarView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: getPadSize(70, 1.2),
    width: getPadSize(70, 1.2),
  },
  textView: {
    marginLeft: 12,
  },
  avatarName: {
    fontSize: getPadSize(20, 1.2),
    lineHeight: getPadSize(28, 1.2),
  },
  agentInfoText: {
    marginTop: getPadSize(9, 1.2),
    fontSize: getPadSize(12, 1.2),
  },
  button: {
    alignSelf: 'center',
    paddingLeft: getPadSize(12.5, 1.2),
    paddingRight: getPadSize(12.5, 1.2),
    width: getPadSize(100, 1.2),
    elevation: 3,
    shadowColor: commonColor.shadowColorBlue,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    backgroundColor: commonColor.normalBlue,
  },
  buttonText: {
    fontSize: getPadSize(14, 1.2),
  },
};
