import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import variables from 'platform';
import formStyles from 'forms/styles';
import { LINEAR_PROPS } from 'utils/constants';

const {
  deviceWidth,
  scenePaddingWidth,
} = variables;
const {
  brandShadow,
  blackShadow,
} = formStyles;

export default {
  brandShadow,
  blackShadow,
  titleView: {
    marginTop: 27,
    marginBottom: 16,
    paddingHorizontal: scenePaddingWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: getPadSize(16),
    color: commonColor.black,
  },
  subTitle: {
    fontSize: getPadSize(13),
    color: commonColor.black,
  },
  subTitleGold: {
    color: commonColor.brownGlod,
  },

  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingLeft: scenePaddingWidth,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },
  itemTop: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4.5,
    paddingBottom: 36.5,
    borderRadius: 6,
    width: (deviceWidth - 15 - scenePaddingWidth * 2) / 2,
    paddingTop: 12,
    paddingHorizontal: 18,
  },
  titleText: {
    marginBottom: 12,
    fontWeight: '600',
    fontSize: getPadSize(14),
  },
  detailText: {
    height: getPadSize(35),
    fontSize: getPadSize(12),
    lineHeight: getPadSize(33 / 2),
    color: commonColor.grey3,
  },

  pointShadow: {
    flex: 0,
    transform: [{
      translateY: -25,
    }],
    borderRadius: 6,
  },
  linearProps: LINEAR_PROPS,
  ponitButton: {
    paddingLeft: 12,
    paddingRight: 12,
    height: 41,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonColor.transparent,
  },
  pointText: {
    fontWeight: '600',
    fontSize: getPadSize(14),
    color: commonColor.white,
  },
};
