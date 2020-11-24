import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  headerHeight,
  statusbarHeight,
  deviceHeight,
  isPad,
} = variables;

export default {
  contentView: {
    marginTop: 20,
    paddingBottom: 68,
    backgroundColor: commonColor.white,
    minHeight: deviceHeight - headerHeight - statusbarHeight,
  },
  // list
  listItem: {
    marginLeft: isPad ? 24 : 16,
    borderBottomWidth: 0,
    paddingRight: isPad ? 24 : 16,
    minHeight: 57,
  },
  labelStyle: {
    fontSize: 14,
  },
  iconColor: {
    color: commonColor.grey650,
  },
  // modal
  title: {
    marginBottom: 40,
    fontSize: 24,
    fontWeight: '500',
    color: commonColor.black,
  },
  text: {
    fontSize: 14,
    color: commonColor.grey650,
  },
};
