import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  // statusbarHeight,
  // deviceHeight,
  // headerHeight,
  isPad,
} = variables;
export default {
  listItemStyle: {
    marginHorizontal: isPad ? 24 : 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: commonColor.greyer,
  },
  avatarStyle: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  bodyStyle: {
    height: 44,
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 8,
    borderBottomWidth: 0,
  },
  rightStyle: {
    height: 44,
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    borderBottomWidth: 0,
  },
  bodyTextStyle: {
    fontSize: 13,
    lineHeight: 18.5,
  },
  rightTextStyle: {
    fontSize: 16,
    lineHeight: 22.5,
  },
  noteStyle: {
    fontSize: 12,
    lineHeight: 16.5,
    color: commonColor.darkGrey,
  },
};
