import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
} = variables;
const itemWidth = deviceWidth + 104;

export default {
  itemWidth,
  // render
  contentContainer: {
    flex: 1,
    backgroundColor: commonColor.greyF,
  },
  content: {
    backgroundColor: commonColor.greyF,
  },

  // renderChildren
  listContent: {
    flex: 1,
    width: itemWidth,
    transform: [{ translateX: -52 }],
    backgroundColor: commonColor.greyF,
  },
  transformListContent: {
    transform: [{ translateX: 0 }],
  },

  // renderCheckBox
  actionPart: {
    width: 52,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonColor.greyF,
    paddingRight: 20,
  },
  checkBox: {
    borderRadius: 13,
    borderColor: commonColor.greyLight,
  },
  activity: {
    backgroundColor: commonColor.brand,
    borderColor: commonColor.brand,
  },

  // Loader
  spinner: {
    marginLeft: 52,
    paddingRight: 52,
  },
  editSpinner: {
    marginLeft: 0,
    marginRight: 52,
  },
};
