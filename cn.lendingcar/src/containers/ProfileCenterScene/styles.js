import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  isPad,
} = variables;

export default {
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: commonColor.lightGrey,
  },
  // renderTopPart
  topPart: {
    paddingRight: isPad ? 16 : 0,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: commonColor.white,
    paddingTop: isPad ? 16 : 0,
    paddingBottom: isPad ? 16 : 0,
  },
  // renderAvatar
  avatarView: {
    marginTop: getPadSize(16, 1.2),
  },
  avatar: {
    width: getPadSize(70, 1.2),
    height: getPadSize(70, 1.2),
    borderRadius: getPadSize(35, 1.2),
  },
  userName: {
    marginTop: 8,
    fontSize: getPadSize(20, 1.2),
    fontWeight: '700',
    color: commonColor.black,
    textAlign: 'center',
  },
  // renderMembership
  membership: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    paddingTop: 4,
  },
  membershipImage: {
    width: getPadSize(11, 1.2),
    height: getPadSize(9, 1.2),
  },
  membershipText: {
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: getPadSize(13, 1.2),
    lineHeight: getPadSize(18.5, 1.2),
    color: commonColor.membeYellow,
  },
  iconStyle: {
    fontSize: getPadSize(13, 1.2),
    marginTop: 2,
    color: commonColor.membeYellow,
  },
  // renderBottomPart
  bottomPart: {
    flex: 1,
    marginTop: getPadSize(10, 1.2),
    backgroundColor: commonColor.white,
  },
  // renderRightButton
  rightFieldStyle: {
    paddingRight: getPadSize(16),
  },
  button: {
    elevation: 0,
    backgroundColor: commonColor.transparent,
    paddingRight: 4,
  },
  badge: {
    backgroundColor: commonColor.deepRed,
    width: 10,
    height: 10,
    borderRadius: 12,
    position: 'absolute',
    right: 0,
    top: 9,
  },
  headerIcon: {
    width: 22,
    height: 18,
  },

  // renderList
  list: {
    borderTopWidth: 0.5,
    borderTopColor: commonColor.greyer,
  },
  // renderItem
  listItem: {
    marginLeft: 16,
    marginRight: 16,
    paddingRight: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: commonColor.greyer,
    minHeight: getPadSize(60, 1.2),
  },
  leaseItem: {
    marginLeft: 16,
    marginRight: 16,
    paddingRight: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: commonColor.greyer,
    minHeight: getPadSize(60, 1.2),
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowStyles: {
    color: commonColor.grey650,
    fontSize: 20,
  },
  // renderMainTags
  mainTags: {
    flexDirection: 'row',
    width: '70%',
    alignSelf: 'center',
    paddingTop: isPad ? 16 : 0,
    paddingBottom: isPad ? 16 : 0,
    justifyContent: 'space-around',
  },
  tagImage: {
    width: getPadSize(40, 1.2),
    height: getPadSize(40, 1.2),
    marginTop: 16,
    marginBottom: 6,
  },
  tagText: {
    textAlign: 'center',
    fontSize: getPadSize(13, 1.2),
    marginBottom: 16,
  },
  // constants
  itemImage: {
    width: getPadSize(20, 1.2),
    height: getPadSize(20, 1.2),
    marginRight: 12,
  },
  itemText: {
    fontSize: getPadSize(15, 1.2),
  },
  leaseTypeText: {
    textAlign: 'center',
    fontSize: getPadSize(13, 1.2),
    color: commonColor.brand,
  },
};
