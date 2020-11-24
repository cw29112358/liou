import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import variables from 'platform';
import formStyles from 'forms/styles';

const {
  deviceWidth,
} = variables;
const {
  blackShadow,
} = formStyles;
const itemWidth = deviceWidth * 0.72;

export default {
  blackShadow,
  item: {
    marginBottom: 1,
    width: itemWidth,
    borderRadius: 6,
  },
  imageView: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: 'hidden',
  },
  image: {
    width: itemWidth,
    height: Math.ceil(itemWidth * 2 / 3),
    backgroundColor: commonColor.greyE5,
  },

  content: {
    paddingHorizontal: 14,
    paddingBottom: 16,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  title: {
    marginBottom: 12,
    fontWeight: '600',
    fontSize: getPadSize(20),
  },

  pointText: {
    fontWeight: '600',
    fontSize: getPadSize(15),
    color: commonColor.brownGlod,
  },
  pointUnitText: {
    flex: 1,
    textAlign: 'right',
    fontSize: getPadSize(15),
  },

  detailText: {
    height: getPadSize(126),
    fontSize: getPadSize(14),
    lineHeight: getPadSize(20),
    color: commonColor.grey3,
  },

};
