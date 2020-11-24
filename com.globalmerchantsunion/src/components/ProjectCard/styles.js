import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  deviceWidth,
} = variables;

const itemBorderTop = 18;
const itemBorderBottom = 15;
const avatarHeight = 51;
const avatarRowBottom = 10;
const resourceTop = 20;
const resourceBaseHeight = (deviceWidth - getPadSize(32)) / 2;
const baseInfoTop = 12;
const baseInfoGroupTop = 10;
const baseInfoGroupBottom = 10;

const userInfoHeight = avatarHeight + avatarRowBottom;
const cardTitleHeight = 30; // hardcode
const messageHeight = 36.5; // hardcode, 2-line
const baseInfoHeight = baseInfoTop + 14.5; // 14.5 is hardcode
const baseInfoGroupHeight = baseInfoGroupTop + baseInfoGroupBottom + 51.5; // 51.5 is hardcode

export default {
  resourceHeight: resourceTop + resourceBaseHeight,
  itemBaseHeight: userInfoHeight + cardTitleHeight + messageHeight + baseInfoHeight + baseInfoGroupHeight,
  itemBorder: itemBorderTop + itemBorderBottom,

  // index
  listItem: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: getPadSize(16),
    paddingTop: itemBorderTop,
    paddingBottom: itemBorderBottom,
    backgroundColor: commonColor.white,
  },

  // UserInfo
  useInfoLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarStyle: {
    alignSelf: 'auto',
    marginRight: 9,
    width: 51,
    height: avatarHeight,
    borderRadius: 25.5,
  },
  avatarRow: {
    marginBottom: avatarRowBottom,
  },
  toucableView: {
    marginLeft: 5,
    width: getPadSize(22),
    height: getPadSize(22),
  },
  collectionImage: {
    width: getPadSize(22),
    height: getPadSize(22),
  },

  // ProjectDescription
  projectPart: {},
  messageText: {
    fontSize: getPadSize(15),
    color: commonColor.black2,
  },
  // renderCardTitle
  projectTitleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 8,
  },
  projectTitleLabel: {
    fontSize: getPadSize(15),
    color: commonColor.black2,
    fontWeight: '600',
  },
  detailButton: {
    height: 'auto',
    paddingRight: 0,
  },
  disabled: {
    backgroundColor: commonColor.transparent,
  },
  detailButtonText: {
    fontSize: getPadSize(15),
  },
  // renderCardResources renderVideo
  resourceSize: {
    marginTop: resourceTop,
    width: deviceWidth - getPadSize(32),
    height: resourceBaseHeight,
  },
  resourceDetailSize: {
    marginTop: resourceTop,
    height: 'auto',
  },
  // renderProjectBaseInfoMessage
  baseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: baseInfoTop,
  },
  dateText: {
    fontSize: getPadSize(12),
    color: commonColor.darkGrey,
  },
  viewCountLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lookImage: {
    width: getPadSize(12),
    height: getPadSize(8),
    marginRight: 4,
  },
  countText: {
    fontSize: getPadSize(12),
    color: commonColor.darkGrey,
  },

  // BaseInfoGroup
  baseLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: baseInfoGroupTop,
    paddingBottom: baseInfoGroupBottom,
    borderBottomWidth: 0.5,
    borderBottomColor: commonColor.greyer,
  },
  withoutFooter: {
    borderBottomWidth: 0,
  },
  detailBaseLine: {
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  baseInfoBlock: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  baseValue: {
    fontSize: getPadSize(13),
    color: commonColor.black2,
    marginBottom: 4,
  },
  projectBaseImageBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseLabel: {
    fontSize: getPadSize(13),
    color: commonColor.grey650,
  },
};
