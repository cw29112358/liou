import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceHeight,
} = variables;

export default {
  containerStyle: {
    backgroundColor: commonColor.grey100,
  },
  contentContainer: {
    justifyContent: 'center',
    height: '100%',
    backgroundColor: commonColor.grey100,
  },
  content: {
    marginTop: 20,
  },
  totalContent: {
    marginBottom: 12,
    paddingTop: 34,
    paddingBottom: 34,
  },
  withoutData: {
    marginBottom: 0,
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
