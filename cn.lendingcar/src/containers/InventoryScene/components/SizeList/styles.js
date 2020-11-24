import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';

import variables from 'platform';

const {
  deviceWidth,
} = variables;

export default {
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 0.5,
    borderColor: commonColor.greyer,
    paddingTop: 44,
    paddingBottom: 8,
    paddingHorizontal: getPadSize(0, 90, true),
  },
  listItem: {
    flexDirection: 'column',
    borderBottomWidth: 0,
    marginLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 36,
    width: getPadSize(deviceWidth / 2, (deviceWidth - 180) / 3, true),
  },
  text: {
    marginTop: 9,
    fontSize: getPadSize(13, 16, true),
    lineHeight: getPadSize(16, 22.5, true),
    color: commonColor.black,
  },
  activeText: {
    color: commonColor.brand,
  },
};
