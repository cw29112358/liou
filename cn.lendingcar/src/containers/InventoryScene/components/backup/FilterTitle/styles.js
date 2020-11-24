import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import {
  sliderMargin,
} from '../RangeSlide/styles';


export default {
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: commonColor.greyer,
    paddingTop: 24,
    paddingLeft: sliderMargin,
  },
  leftLabel: {
    fontWeight: '600',
    fontSize: getPadSize(24),
    color: commonColor.brand,
  },
  rightLabel: {
    fontWeight: '600',
    fontSize: getPadSize(16),
    color: commonColor.black14,
  },
};
