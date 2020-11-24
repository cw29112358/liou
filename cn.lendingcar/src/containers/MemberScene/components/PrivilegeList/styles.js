import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  deviceHeight,
  isIOS,
  isPad,
  smallScreen,
} = variables;

const isShowAllBUtton = !smallScreen;
export default {
  isIOS,
  deviceHeight,
  isShowAllBUtton,
  contentBottomView: {
    marginTop: isPad ? 24 : 20,
  },
  privilegeTitle: {
    marginTop: getPadSize(20, 1.2),
    marginLeft: getPadSize(16, 1.5),
    fontSize: getPadSize(20, 1.2),
    lineHeight: getPadSize(28, 1.2),
    fontWeight: '700',
    color: commonColor.grey750,
  },
  scrollView: {
    marginTop: isShowAllBUtton ? 0 : 10,
    height: isShowAllBUtton || isIOS ? getPadSize(350, 1.2) : 240,
  },
  contentPrivilegeView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  childView: {
    marginTop: getPadSize(16, 1.2),
    marginBottom: getPadSize(8, 1.2),
    alignItems: 'center',
    width: '33%',
  },
  privilegeImage: {
    marginBottom: getPadSize(8, 1.5),
    width: getPadSize(45, 1.5),
    height: getPadSize(45, 1.5),
  },
  privilegeText: {
    fontSize: getPadSize(12, 1.5),
    color: commonColor.grey750,
  },
};
