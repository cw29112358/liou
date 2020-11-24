import * as commonColor from 'commonColor';
import { headerMarginTop, headerOccupyHeight } from '../SearchHeader/styles';

export default {
  headerMarginTop,
  headerOccupyHeight,
  topPart: {
    zIndex: 1000,
    position: 'absolute',
    width: '100%',
    backgroundColor: commonColor.white,
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
};
