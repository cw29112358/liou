import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  filterView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: isPad ? 21 : 14,
    color: commonColor.black,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: commonColor.greyLight,
    borderRadius: 6,
    paddingLeft: 0,
    paddingRight: 0,
    width: 65,
    height: 30,
    backgroundColor: commonColor.white,
  },
  text: {
    fontSize: isPad ? 18 : 12,
    color: commonColor.black,
  },
  activeButton: {
    borderColor: commonColor.brand,
    backgroundColor: commonColor.brand,
  },
  activeText: {
    color: commonColor.white,
  },
};
