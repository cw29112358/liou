// import * as commonColor from 'commonColor';

import variables from 'platform';

const {
  statusbarHeight,
  deviceHeight,
  headerHeight,
} = variables;

export default {
  bgImage: {
    width: '100%',
    height: deviceHeight - headerHeight - statusbarHeight,
  },
  titleWrappper: {
    paddingTop: 36.5,
    paddingLeft: 50,
    paddingBottom: 54.5,
  },
  largeFont: {
    marginBottom: 2.5,
    fontSize: 31,
    lineHeight: 43.5,
  },
  smallFont: {
    marginTop: 6.5,
    fontSize: 13,
    lineHeight: 18.5,
  },
};
