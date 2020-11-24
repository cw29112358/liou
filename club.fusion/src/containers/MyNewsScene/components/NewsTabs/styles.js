import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';


export default {

  content: {
    justifyContent: 'center',
    backgroundColor: commonColor.grey200,
    alignItems: 'center',
    flexDirection: 'column',
  },
  view: {
    marginTop: 21.5,
    alignSelf: 'center',
  },
  buttonView: {
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: commonColor.grey97,
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonLinear: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  button: {
    borderWidth: 0,
    width: 90,
    height: 30,
  },
  text: {
    fontSize: getPadSize(14),
    color: commonColor.black,
  },
  activeButton: {
    backgroundColor: commonColor.transparent,
  },
  activeText: {
    color: commonColor.white,
  },
};
