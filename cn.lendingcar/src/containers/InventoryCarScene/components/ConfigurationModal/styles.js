import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';

export default {
  item: {
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  titleLineItem: {
    paddingTop: 9,
    borderBottomWidth: 0,
  },
  title: {
    fontSize: getPadSize(20, 1.2),
    color: commonColor.black,
  },
  universalListItem: {
    borderBottomColor: commonColor.greyer,
    justifyContent: 'space-between',
  },
  featureListItem: {
    justifyContent: 'center',
    borderBottomColor: commonColor.greyer,
  },
  label: {
    color: commonColor.darkGrey,
    fontSize: getPadSize(14, 1.2),
  },
  value: {
    color: commonColor.black,
    fontSize: getPadSize(14, 1.2),
  },
};
