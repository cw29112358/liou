import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
  isIOS,
  headerHeight,
  isIphoneX,
} = variables;
const headerTop = isIphoneX ? 44 : 16;

export default {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 0,
    left: 0,
    zIndex: 1,
    height: headerHeight,
    paddingTop: isIOS ? headerTop : 0,
    paddingLeft: 0,
    paddingRight: 0,
    width: deviceWidth,
    borderBottomWidth: 0,
  },
  headerLeftButton: {
    backgroundColor: commonColor.transparent,
    elevation: 0,
    paddingTop: 3,
    paddingBottom: 0,
  },
  headerButton: {
    backgroundColor: commonColor.transparent,
    elevation: 0,
    paddingTop: 6,
    paddingBottom: 0,
  },
  headerTitle: {
    color: commonColor.black,
    fontSize: 20,
  },
  icon: {
    color: commonColor.black,
    fontSize: 40,
  },
  leftText: {
    color: commonColor.black,
    fontSize: 16,
  },

  message: {
    marginTop: 8,
    fontSize: 16,
    marginLeft: 16,
  },

  dateGroup: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginTop: 10,
    minHeight: 60,
    marginBottom: -20,
  },
  groupItem: {
    marginRight: 15,
    paddingTop: 5,
    paddingRight: 8,
    paddingBottom: 5,
    paddingLeft: 8,
  },
  itemShadow: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    elevation: 3,
    backgroundColor: commonColor.white,
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  withoutTime: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 16,
    paddingBottom: 16,
  },
  itemText: {
    fontSize: 13,
    lineHeight: 18,
  },
  closeButton: {
    position: 'absolute',
    elevation: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    right: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
    justifyContent: 'center',
    backgroundColor: commonColor.greyLight,
  },
  closeIcon: {
    fontSize: 12,
  },

  confirmButton: {
    position: 'absolute',
    bottom: 40,
    width: deviceWidth - 80,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: commonColor.greyLight,
  },

  toastContainerView: {
    position: 'absolute',
    top: 10,
    height: '100%',
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastContentView: {
    paddingVertical: 12,
    paddingHorizontal: 19,
    borderRadius: 6,
    backgroundColor: commonColor.darkBlack,
  },
  toastText: {
    color: commonColor.white,
  },
};
