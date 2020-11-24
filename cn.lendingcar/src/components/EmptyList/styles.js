import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceHeight,
} = variables;

export default {
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight - 200,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: getPadSize(100),
    height: getPadSize(100),
    marginBottom: getPadSize(20),
  },
  title: {
    fontSize: getPadSize(14),
    color: commonColor.grey650,
  },
};
