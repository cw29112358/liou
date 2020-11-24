import * as commonColor from 'commonColor';
import { getScaleSize } from 'utils/helpers';
import variables from 'platform';

const {
  scenePaddingWidth,
} = variables;

export default {
  title: {
    paddingLeft: scenePaddingWidth,
    marginTop: 30,
    marginBottom: 20,
    fontWeight: '800',
    fontSize: getScaleSize(16),
    color: commonColor.grey650,
  },

  list: {
    borderTopWidth: 0.5,
    borderTopColor: commonColor.greyLight,
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'column',
    borderBottomWidth: 0,
    paddingLeft: scenePaddingWidth,
    paddingBottom: 20,
  },
  nameText: {
    marginBottom: 10,
    fontWeight: '600',
    fontSize: getScaleSize(16),
    color: commonColor.black,
    alignSelf: 'flex-start',
  },
  text: {
    marginBottom: 5,
    alignSelf: 'flex-start',
    fontSize: getScaleSize(13),
    color: commonColor.black,
  },
};
