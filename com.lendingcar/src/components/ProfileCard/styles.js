import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  deviceWidth,
  scenePaddingWidth,
} = variables;

let width = deviceWidth - scenePaddingWidth * 2;
if (width > 500) width = 343;

export default {
  content: {
    alignSelf: 'center',
    marginTop: 20,
    width,
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 6,
    backgroundColor: commonColor.white,
    shadowColor: commonColor.shadowColorBlack,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatarImage: {
    alignSelf: 'auto',
    marginRight: 9,
    width: 67,
    height: 67,
    borderRadius: 33.5,
  },
  avatarRight: {

  },

  // row1
  blackText: {
    fontSize: getPadSize(20),
    color: commonColor.black2,
  },
  smallBlackText: {
    fontSize: getPadSize(13),
    color: commonColor.black3,
  },
  verifiedImage: {
    marginLeft: 6,
    marginRight: 5,
    width: 13,
    height: 15.5,
  },
  verifiedText: {
    fontSize: getPadSize(12),
    color: commonColor.deepYellow,
  },
  timeText: {
    fontSize: getPadSize(12),
    color: commonColor.darkGrey,
  },
  // row2
  greyText: {
    marginTop: 4,
    fontSize: getPadSize(13),
    color: commonColor.darkGrey,
  },

  // row3
  imageText: {
    fontSize: getPadSize(13),
  },
  locationImage: {
    marginRight: 4,
    width: 11,
    height: 14,
  },
  industryView: {
    marginLeft: 20,
  },
  industryImage: {
    marginRight: 4,
    width: 11,
    height: 10.5,
  },

};
