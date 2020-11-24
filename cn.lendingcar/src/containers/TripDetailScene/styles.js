import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
  statusbarHeight,
  deviceHeight,
  deviceWidth,
  headerHeight,
} = variables;

export default {
  container: {
    backgroundColor: commonColor.white,
  },
  contentBox: {
    minHeight: deviceHeight - headerHeight - statusbarHeight,
  },
  greySeperate: {
    height: 10,
    backgroundColor: commonColor.lightGrey,
  },
  orangeText: {
    fontSize: getPadSize(14, 1.2),
    fontWeight: '600',
    color: commonColor.textOrange,
  },
  boldFont: {
    fontSize: getPadSize(14, 1.2),
    fontWeight: '600',
  },
  telText: {
    fontWeight: '600',
    fontSize: getPadSize(14, 1.2),
    lineHeight: getPadSize(20, 1.2),
    color: commonColor.blue,
  },
  noticeText: {
    width: isPad ? deviceWidth - 48 : deviceWidth - 32,
    fontSize: getPadSize(14, 1.2),
    lineHeight: getPadSize(20, 1.2),
    color: commonColor.black2,
  },
  noticeView: {
    marginBottom: 40,
  },
  // modal
  modal: {
    viewStyle: {
      paddingTop: 20,
    },
    titleViewStyle: {
      marginBottom: 40,
    },
  },
  totalItem: {
    paddingBottom: 24,
  },
  borderItem: {
    paddingBottom: 16,
    marginBottom: 24,
  },
  keyLabelStyle: {
    color: commonColor.darkGrey,
  },
  divisionLineWidth: isPad ? deviceWidth - 48 : deviceWidth - 32,
};
