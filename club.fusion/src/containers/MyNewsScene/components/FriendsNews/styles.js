import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';
import formStyles from 'forms/styles';

const {
  deviceWidth,
  scenePaddingWidth,
} = variables;
const {
  linearProps,
  brandShadow,
} = formStyles;

const lineWidth = deviceWidth - 79 - scenePaddingWidth;
export default {
  list: {
    paddingTop: 3,
  },
  item: {
  },
  line: {
    position: 'absolute',
    left: 79,
    bottom: 0,
    width: lineWidth,
    height: 0.5,
    backgroundColor: commonColor.greyer,
  },
  swipeRow: {
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
  },

  avatarTouch: {
    flex: 1,
  },
  avatarRow: {
    paddingHorizontal: scenePaddingWidth,
    marginBottom: 0,
    width: '100%',
    height: 83,
  },
  avatarImage: {
    marginVertical: 16,
    marginRight: 12,
    width: 51,
    height: 51,
  },
  redDot: {
    position: 'absolute',
    right: 12,
    top: 16,
    borderRadius: 5,
    width: 10,
    height: 10,
    backgroundColor: commonColor.errorRed,
  },
  avatarRight: {
    flex: 1,
    paddingVertical: 22,
  },
  row1Style: {
    justifyContent: 'space-between',
  },
  blackText: {
    fontSize: getPadSize(16),
  },
  greyText: {
    marginTop: 3,
    width: lineWidth - 130,
  },

  linearProps,
  linearShadow: {
    ...brandShadow,
    marginTop: 2,
    borderRadius: 12,
  },
  linearButton: {
    justifyContent: 'center',
    width: 65,
    height: 25,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: commonColor.transparent,
  },
  linearButtonText: {
    fontSize: getPadSize(13),
    color: commonColor.white,
  },
  rejectedText: {
    marginTop: 4,
    fontSize: getPadSize(13),
    color: commonColor.grey3,
  },

  deleteButton: {
    width: 90,
  },
  deleteText: {
    fontWeight: '600',
    fontSize: getPadSize(16),
    color: commonColor.white,
  },
};
