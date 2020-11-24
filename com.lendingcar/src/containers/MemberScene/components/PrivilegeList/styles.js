import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceHeight,
  isIOS,
  isPad,
} = variables;

export default {
  isIOS,
  deviceHeight,
  contentBottomView: {
    marginTop: isPad ? 100 : 20,
  },
  privilegeTitle: {
    marginTop: 20,
    marginLeft: 16,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: commonColor.grey750,
  },
  // renderList
  contentPrivilegeView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  // item
  childView: {
    marginTop: 16,
    marginBottom: 8,
    alignItems: 'center',
    width: '33%',
  },
  childViewWithCrown: {
    marginTop: 6,
    paddingTop: 10,
  },
  bigImage: {
    marginBottom: 8,
    width: 106,
    height: 81,
  },
  privilegeImage: {
    marginBottom: 8,
    width: 45,
    height: 45,
  },
  disabledImage: {
    opacity: 0.18,
  },
  privilegeText: {
    fontSize: 12,
    color: commonColor.grey750,
  },
  // imageText
  imageTextView: {
    marginLeft: 8,
    marginTop: 11,
  },
  imageText: {
    fontWeight: '600',
    fontSize: 12,
    color: commonColor.membeYellow,
  },
  crwon: {
    position: 'absolute',
    top: -10,
    right: 10,
    width: 23,
    height: 19,
  },
  arrow: {
    marginTop: 3,
    width: 12,
    height: 7,
  },
};
