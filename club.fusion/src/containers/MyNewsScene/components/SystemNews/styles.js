import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';
import formStyles from 'forms/styles';

const {
  deviceWidth,
  isPad,
  scenePaddingWidth,
} = variables;
const { blackShadow } = formStyles;

export default {
  blackShadow,
  content: {
    flex: 1,
  },

  list: {
    paddingTop: 27,
  },
  touchableOpacity: {
    marginBottom: 12,
    marginHorizontal: scenePaddingWidth,
    borderRadius: 6,
  },
  item: {
    marginHorizontal: 12,
    paddingTop: 15,
    paddingBottom: 20,
  },
  // title
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getPadSize(12),
  },
  title: {
    width: (deviceWidth - (isPad ? 84 : 56)) * 2 / 3,
    fontWeight: '600',
    fontSize: getPadSize(17),
    color: commonColor.black,
  },
  time: {
    fontSize: getPadSize(12),
    color: commonColor.darkGrey,
  },
  // itemContent
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    marginRight: 10,
    width: deviceWidth / 3 - 20,
    height: (deviceWidth / 3 - 20) * 3 / 4,
    borderRadius: isPad ? 5 : 3,
  },
  message: {
    flex: 1,
    fontSize: getPadSize(13),
    color: commonColor.darkGrey,
  },

};
