import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
  isPad,
} = variables;

export default {
  contentContainer: {
    paddingTop: 20,
    flex: 1,
  },

  listItem: {
    marginTop: isPad ? 30 : 20,
    marginBottom: isPad ? 30 : 20,
    marginLeft: isPad ? 24 : 16,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: isPad ? 24 : 16,
    borderBottomWidth: 0,
  },

  labelStyle: {
    fontSize: 14,
    color: commonColor.black,
  },

  rightStyle: {
    flex: 0.65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rightTextStyle: {
    fontSize: 14,
    color: commonColor.darkGrey,
  },
  rightIconStyle: {
    marginLeft: 13,
    color: commonColor.grey650,
  },

  logOutButton: {
    position: 'absolute',
    bottom: isPad ? 136 : 90,
    justifyContent: 'center',
    alignSelf: 'center',
    height: isPad ? 60 : 40,
    width: deviceWidth * 0.8,
    borderColor: commonColor.grey650,
    borderWidth: 0.5,
    borderRadius: isPad ? 12 : 6,
  },
  logOutText: {
    fontSize: 15,
    color: commonColor.grey650,
  },
};
