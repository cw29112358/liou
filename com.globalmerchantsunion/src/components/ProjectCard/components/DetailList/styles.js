import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';

export default {
  // renderDetailList
  detailListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: 20,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: commonColor.greyer,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  detailListLabel: {
    fontSize: getPadSize(13),
    color: commonColor.grey650,
  },
  detailListValueBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  detailListValue: {
    fontSize: getPadSize(20),
    color: commonColor.brand,
    marginRight: 6,
  },
  detailListUnit: {
    fontSize: getPadSize(13),
    color: commonColor.black,
  },
};
