import * as commonColor from 'commonColor';

import { getPadSize } from 'utils/helpers';

export default {
  content: {
    paddingBottom: 62,
  },
  title: {
    fontSize: getPadSize(20, 1.2),
    color: commonColor.black,
    lineHeight: getPadSize(28, 1.2),
  },
  buttonView: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: 0,
  },
  button: {
    marginTop: 21,
    marginLeft: 0,
    width: 120,
    height: 36,
    backgroundColor: commonColor.lightGrey,
    borderWidth: 0,
  },
  buttonText: {
    color: commonColor.grey650,
  },
};
