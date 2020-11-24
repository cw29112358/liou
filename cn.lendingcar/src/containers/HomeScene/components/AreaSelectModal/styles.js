import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  headerHeight,
  deviceWidth,
  deviceHeight,
  statusbarHeight,
  isPad,
} = variables;

export default {
  modalMask: {
    height: '100%',
    width: deviceWidth,
    backgroundColor: commonColor.lightBlack,
    position: 'absolute',
    top: headerHeight + statusbarHeight,
  },
  modalContent: {
    height: '100%',
  },
  triangle: {
    marginLeft: 40,
    width: 0,
    height: 0,
    borderColor: commonColor.transparent,
    borderWidth: 20,
    borderBottomColor: commonColor.white,
  },
  shadowPress: {
    height: '100%',
    width: deviceWidth,
  },

  maskChildren: {
    backgroundColor: commonColor.transparent,
  },

  listStyle: {
    position: 'absolute',
    top: 22,
    left: getPadSize(16, 1.2),
    width: isPad ? deviceWidth / 3 : deviceWidth * 2 / 3,
    marginTop: 10,
    backgroundColor: commonColor.white,
    borderRadius: 6,
    maxHeight: deviceHeight / 2,
  },
  scrollContent: {
    paddingVertical: 20,
  },

  // renderItem
  listItem: {
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 0,
    height: getPadSize(47.5, 1.2),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: commonColor.greyer,
  },
  itemText: {
    fontSize: getPadSize(14, 1.2),
    color: commonColor.black,
  },
  markIcon: {
    position: 'absolute',
    top: getPadSize(8, 1.2),
    right: getPadSize(32, 1.2),
    fontSize: getPadSize(30, 1.2),
    height: getPadSize(21, 1.2),
    color: commonColor.brand,
  },
};
