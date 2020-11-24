import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  statusbarHeight,
  deviceHeight,
} = variables;
const listHeight = deviceHeight - 98 - statusbarHeight;

export default {
  listContainer: {
    alignItems: 'center',
  },
  list: {
    height: listHeight,
    paddingBottom: 50,
  },
  // footer
  lastItem: {
    marginBottom: 50,
  },
  // empty list
  noCarView: {
    marginTop: -20,
    alignItems: 'center',
    justifyContent: 'center',
    height: listHeight,
  },
  noCarImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  noCarTitle: {
    fontSize: getPadSize(14),
    color: commonColor.grey650,
  },
};
