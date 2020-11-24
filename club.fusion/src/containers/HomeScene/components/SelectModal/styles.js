import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  headerHeight,
  deviceWidth,
  statusbarHeight,
} = variables;

const actualHeaderHeight = headerHeight - statusbarHeight;

export default {
  colorsArray: [commonColor.transparent, commonColor.transparent],
  mask: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    height: '100%',
    backgroundColor: commonColor.transparent,
  },
  maskChildren: {
    position: 'absolute',
    top: actualHeaderHeight,
    zIndex: 1001,
    height: getPadSize(47.5) * 7,
    width: deviceWidth,
    backgroundColor: commonColor.transparent,
  },
  rest: {
    marginTop: actualHeaderHeight,
    width: deviceWidth,
    flex: 1,
    backgroundColor: commonColor.lightBlack,
  },

  // renderChildren
  listStyle: {
    position: 'absolute',
    zIndex: 1001,
    width: getPadSize(175),
    marginTop: 12,
    paddingTop: 25,
    paddingBottom: 25,
    backgroundColor: commonColor.white,
    borderRadius: 6,
    overflow: 'hidden',
    height: getPadSize(47.5) * 6,
    maxHeight: getPadSize(47.5) * 6,
  },
  leftList: {
    left: getPadSize(16),
  },
  rightList: {
    right: getPadSize(16),
  },
  scrollContent: {
    paddingBottom: 25,
  },
  // renderItem
  listItem: {
    height: getPadSize(47.5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonColor.transparent,
  },
  activeListItem: {
    backgroundColor: commonColor.transparent,
  },
  itemText: {
    fontSize: getPadSize(14),
    color: commonColor.black,
  },
  activeText: {
    color: commonColor.white,
  },

  // renderPlaceHolderButton
  buttonGroupView: {
    width: deviceWidth,
    height: actualHeaderHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    elevation: 4,
  },
  placeholderButton: {
    height: actualHeaderHeight,
    minWidth: 120,
  },
};
