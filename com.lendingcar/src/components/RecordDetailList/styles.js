import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
  deviceHeight,
} = variables;

export default {
  srcollView: {
    height: deviceHeight / 2,
  },
  list: {
    paddingBottom: deviceHeight / 5,
  },
  listItem: {
    marginLeft: 0,
    justifyContent: 'space-between',
    paddingRight: 0,
    borderColor: commonColor.greyer,
  },
  emptyList: {
    marginLeft: 0,
    justifyContent: 'center',
    paddingRight: 0,
    borderColor: commonColor.greyer,
  },
  leftView: {
    width: deviceWidth / 2,
  },
  explainText: {
    fontSize: 13,
    color: commonColor.black,
  },
  noteText: {
    marginTop: 5,
    fontSize: 12,
    color: commonColor.darkGrey,
  },
  rightView: {
    width: deviceWidth / 3,
  },
  tradingText: {
    fontSize: 16,
    color: commonColor.black,
    fontWeight: '500',
  },
  leftText: {
    textAlign: 'right',
  },
  errorText: {
    color: commonColor.red,
  },
};
