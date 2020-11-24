import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  deviceWidth,
} = variables;

export default {
  cellViewLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: commonColor.white,
    paddingTop: getPadSize(18, 1.2),
    paddingBottom: getPadSize(18, 1.2),
  },

  cellView: {
    flexDirection: 'column',
    minWidth: deviceWidth / 3,
    alignSelf: 'center',
    elevation: 0,
    minHeight: getPadSize(60, 1.2),
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: commonColor.transparent,
  },
  cellValue: {
    minWidth: deviceWidth / 3,
    textAlign: 'center',
    fontSize: getPadSize(20, 1.2),
    fontWeight: '500',
    marginBottom: getPadSize(4, 1.2),
    marginLeft: -10,
    color: commonColor.normalBlue,
  },
  cellLabel: {
    minWidth: deviceWidth / 3,
    textAlign: 'center',
    fontSize: getPadSize(13, 1.2),
    color: commonColor.black,
  },
  verticalLine: {
    width: 0.5,
    height: '70%',
    backgroundColor: commonColor.greyD8,
  },
};
