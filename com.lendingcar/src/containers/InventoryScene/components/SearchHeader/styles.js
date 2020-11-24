import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isIOS,
  isIphoneX,
  iphoneFringeHeight,
  statusbarHeight,
  scenePaddingWidth,
} = variables;

export const headerMarginTop = statusbarHeight + (isIOS ? 20 : 10) + (isIphoneX ? iphoneFringeHeight : 0);
export const headerOccupyHeight = 60 + headerMarginTop;

export default {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: headerMarginTop,
    paddingTop: 20,
    paddingLeft: scenePaddingWidth,
    paddingRight: scenePaddingWidth,
    height: 60,
  },
  // button
  boxShadow: {
    backgroundColor: commonColor.white,
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    borderRadius: 6,
    elevation: 3,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    width: 40,
    height: 40,
    paddingLeft: 0,
    paddingRight: 0,
  },
  backImage: {
    width: 11.65,
    height: 19.85,
  },
  item: {
    flex: 1,
    height: 40,
  },
  // search
  searchImage: {
    marginLeft: 12.2,
    marginRight: 12.4,
    width: 16.4,
    height: 16.4,
  },
  searchInput: {
    height: 40,
    paddingLeft: 0,
  },

  viewWithDelete: {
    paddingRight: 40,
  },
  deleteView: {
    height: 40,
    right: 0,
  },
};
