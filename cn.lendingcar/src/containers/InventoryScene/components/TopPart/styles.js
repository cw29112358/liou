import * as commonColor from 'commonColor';
import { headerMarginTop, headerOccupyHeight } from '../SearchHeader/styles';

export default {
  headerMarginTop,
  headerOccupyHeight,
  topPart: {
    zIndex: 1000,
    position: 'absolute',
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: commonColor.greyer,
    backgroundColor: commonColor.white,
  },
};
