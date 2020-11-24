import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
  headerHeight,
  deviceWidth,
  deviceHeight,
  statusbarHeight,
} = variables;

export default {
  modalContent: {
    marginHorizontal: 16,
    backgroundColor: commonColor.transparent,
  },
  modalMask: {
    height: '100%',
    width: deviceWidth,
    backgroundColor: commonColor.faintBlack,
    position: 'absolute',
    top: headerHeight + statusbarHeight,
  },
  mask: {
    height: '100%',
  },
  maskChildren: {
    backgroundColor: commonColor.transparent,
  },

  listStyle: {
    marginTop: 10,
    paddingTop: 25,
    paddingBottom: 45,
    backgroundColor: commonColor.white,
    borderRadius: 6,
    maxHeight: deviceHeight * 2 / 3,
    // justifyContent: 'center',
    paddingRight: isPad ? 24 : 12,
    paddingLeft: isPad ? 24 : 0,
  },
  scrollContent: {
    paddingBottom: 45,
  },
  listItem: {
    marginLeft: 12,
    paddingTop: 15,
    paddingBottom: 15,
    height: isPad ? 71.25 : 47.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: commonColor.greyer,
  },
  itemText: {
    fontSize: isPad ? 21 : 14,
    color: commonColor.black,
  },
  markIcon: {
    fontSize: 30,
    height: 21,
    color: commonColor.brand,
  },
};
