import * as commonColor from 'commonColor';

import variables from 'platform';

const {
  statusbarHeight,
  deviceHeight,
  headerHeight,
  deviceWidth,
  isIphoneX,
} = variables;

export default {
  filterWrapper: {
    zIndex: 1000,
    position: 'absolute',
    backgroundColor: commonColor.white,
  },
  filterBaseStyle: {
    justifyContent: 'center',
    height: 60,
    backgroundColor: commonColor.white,
    shadowColor: commonColor.halfBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2,
    elevation: 3,
  },
  filterView: {
    shadowOpacity: 0.1,
  },
  filterActiveView: {
    shadowOpacity: 0,
    borderBottomWidth: 0.5,
    borderColor: commonColor.greyer,
  },
  buttonViewStyle: {
    width: '100%',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    backgroundColor: commonColor.transparent,
    borderWidth: 0,
  },
  buttonTextStyle: {
    fontSize: 14,
  },
  activeButtonStyle: {
    backgroundColor: commonColor.transparent,
  },
  activeTextStyle: {
    color: commonColor.normalBlue,
  },
  filterOptionsView: {
    paddingVertical: 20,
    height: 128,
  },
  buttonViewOptionsStyle: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    paddingHorizontal: 51.5,
    width: '100%',
    height: '100%',
  },
  buttonOptionsStyle: {
    width: 120,
    height: 36,
    borderWidth: 0,
    backgroundColor: commonColor.grey100,
  },
  buttonTextOptionsStyle: {
    fontSize: 12,
    color: commonColor.grey650,
  },
  activeButtonOptionsStyle: {
    backgroundColor: commonColor.normalBlue,
  },
  listStyle: {
    position: 'absolute',
    top: isIphoneX ? 162 : 132,
    width: '100%',
    minHeight: deviceHeight - headerHeight - statusbarHeight - 132,
  },
  mask: {
    position: 'absolute',
    width: deviceWidth,
    height: '100%',
    backgroundColor: commonColor.lightBlack,
  },
};
