import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceHeight,
} = variables;

export default {
  containerStyle: {
    backgroundColor: commonColor.grey200,
  },
  contentContainer: {
    justifyContent: 'center',
    height: '100%',
    backgroundColor: commonColor.grey200,
  },
  content: {
    marginTop: 20,
  },
  totalContent: {
    marginBottom: 12,
    paddingTop: 34,
    paddingBottom: 34,
  },
  contentScrollView: {
    height: deviceHeight * 2 / 3,
    backgroundColor: commonColor.white,
  },
  contentStyle: {
    paddingBottom: 20,
  },
  listItemStyle: {
    marginLeft: 15,
    paddingRight: 15,
  },
};
