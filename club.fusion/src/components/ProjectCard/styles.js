import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  deviceWidth,
} = variables;

export default {
  // index
  listItem: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: getPadSize(16),
    paddingTop: 24,
    paddingBottom: 32,
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
    height: 51,
    borderRadius: 25.5,
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
    marginBottom: 8,
  },
  projectTitleLabel: {
    fontSize: getPadSize(15),
    color: commonColor.black2,
    fontWeight: '600',
  },
  detailButton: {
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
    marginTop: 20,
    width: deviceWidth - getPadSize(32),
    height: (deviceWidth - getPadSize(32)) / 2,
  },
  resourceDetailSize: {
    marginTop: 20,
    height: 'auto',
  },
  // renderProjectBaseInfoMessage
  baseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
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
    marginTop: 20,
    paddingBottom: 20,
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
