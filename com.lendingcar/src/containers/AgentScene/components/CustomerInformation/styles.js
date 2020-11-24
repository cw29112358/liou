import * as commonColor from 'commonColor';
import { getScaleSize } from 'utils/helpers';

export default {
  content: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: getScaleSize(16),
    marginBottom: 28.5,
    minHeight: 100,
    backgroundColor: commonColor.white,
  },
  textContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 12.5,
    paddingRight: 12.5,
    width: 100,
    elevation: 3,
    shadowColor: commonColor.shadowColorBlue,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    backgroundColor: commonColor.normalBlue,
  },
  buttonText: {
    fontSize: 14,
  },
};
