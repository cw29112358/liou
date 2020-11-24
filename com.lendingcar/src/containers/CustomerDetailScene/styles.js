import * as commonColor from 'commonColor';

import variables from 'platform';

const {
  statusbarHeight,
  deviceHeight,
  deviceWidth,
  headerHeight,
} = variables;

export default {
  contentContainer: {
    justifyContent: 'center',
  },
  content: {
    backgroundColor: commonColor.white,
    minHeight: deviceHeight - headerHeight - statusbarHeight,
  },
  AvatarListStyle: {
    marginTop: 14,
    backgroundColor: commonColor.white,
    shadowColor: commonColor.halfBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2,
    elevation: 3,
    shadowOpacity: 0.1,
  },
  listItemStyle: {
    paddingVertical: 20,
    borderBottomWidth: 0,
  },
  rightTopStyle: {
    fontSize: 20,
    lineHeight: 28,
    color: commonColor.normalBlue,
  },
  infoListStyle: {
    paddingBottom: 0,
  },
  infoListOtherStyle: {
    paddingTop: 24,
  },
  itemStyle: {
    paddingBottom: 24,
  },
  divisionLine: {
    width: deviceWidth,
    height: 12,
    backgroundColor: commonColor.grey100,
  },
};
