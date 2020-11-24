import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
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
    paddingRight: isPad ? 87 : scenePaddingWidth,
    height: 60,
  },
  // button
  backButton: {
    justifyContent: 'flex-start',
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
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderWidth: 0.5,
    borderColor: commonColor.greyE7,
    borderRadius: 20,
    paddingRight: 16,
  },
  // search
  searchImage: {
    marginLeft: isPad ? '36%' : 12.2,
    marginRight: 8.2,
    width: 16,
    height: 16,
  },
  searchInput: {
    borderBottomWidth: 0,
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
