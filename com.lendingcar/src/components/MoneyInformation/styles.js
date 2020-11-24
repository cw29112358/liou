import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
} = variables;

export default {
  cellViewLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: commonColor.white,
    paddingTop: 18,
    paddingBottom: 18,
  },

  cellView: {
    flexDirection: 'column',
    minWidth: deviceWidth / 3,
    elevation: 0,
    minHeight: 60,
    backgroundColor: commonColor.transparent,
  },
  cellValue: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 4,
    color: commonColor.normalBlue,
  },
  cellLabel: {
    fontSize: 13,
    color: commonColor.black,
  },
  verticalLine: {
    width: 0.5,
    height: '70%',
    backgroundColor: commonColor.greyD8,
  },
};
