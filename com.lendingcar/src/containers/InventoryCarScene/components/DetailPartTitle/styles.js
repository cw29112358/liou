import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  titleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleLabelPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalLine: {
    width: isPad ? 4.5 : 3,
    backgroundColor: commonColor.brand,
    height: isPad ? 27 : 18,
    marginRight: 8,
  },
  titleLabel: {
    fontSize: isPad ? 24 : 16,
    color: commonColor.black,
    fontWeight: '600',
  },
  button: {
    paddingRight: 0,
  },
  buttonTextColor: {
    color: commonColor.black,
    marginRight: 3,
    fontSize: isPad ? 24 : 16,
  },
  buttonIcon: {
    color: commonColor.grey650,
  },
};
