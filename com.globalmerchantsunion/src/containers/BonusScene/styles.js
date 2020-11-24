import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import formStyles from 'forms/styles';

const {
  blackShadow,
} = formStyles;

export default {
  blackShadow,
  bonusView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15.5,
    marginBottom: 5,
    borderRadius: 6,
    width: 343,
    height: 145.5,
  },
  bonusTitle: {
    marginBottom: 13.5,
    fontSize: getPadSize(20),
    fontWeight: '600',
  },
  bonusValue: {
    fontSize: getPadSize(28),
    color: commonColor.brand,
    fontWeight: '600',
  },
};
