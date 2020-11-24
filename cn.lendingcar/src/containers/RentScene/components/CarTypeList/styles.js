import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  deviceWidth,
} = variables;

export default {
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 32,
  },
  // tagText
  tagText: {
    position: 'absolute',
    top: getPadSize(8),
    left: getPadSize(12.5),
  },
  typeText: {
    fontSize: getPadSize(20),
    color: commonColor.white,
    fontWeight: '600',
    marginBottom: 4,
  },
  horizontalLine: {
    height: 1,
    width: getPadSize(65),
    backgroundColor: commonColor.white,
    marginBottom: 4,
  },
  titleViewStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  leftLabelStyle: {
    fontSize: getPadSize(16),
    color: commonColor.white,
    fontWeight: '600',
    marginRight: 5,
  },
  rightLabelStyle: {
    fontSize: getPadSize(16),
    color: commonColor.white,
  },
  // itemTag
  tagView: {
    position: 'absolute',
    left: getPadSize(16),
  },
  tagImage: {
    width: getPadSize(105),
    height: getPadSize(75),
  },
  // listItem
  listItem: {
    marginTop: 16,
  },
  image: {
    width: deviceWidth,
    height: (467 * deviceWidth) / 750,
  },
};
