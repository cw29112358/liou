import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';

export default {
  childrenContent: {
    paddingHorizontal: getPadSize(16),
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    width: '100%',
    fontSize: getPadSize(13),
    color: commonColor.grey650,
    textAlign: 'left',
  },
  button: {
    width: getPadSize(120),
    height: getPadSize(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: commonColor.transparent,
    borderRadius: getPadSize(22),
  },
  linear: {
    width: getPadSize(120),
    height: getPadSize(40),
    borderRadius: getPadSize(22),
  },
  buttonText: {
    fontSize: getPadSize(15),
  },
  textArea: {
    marginTop: 12,
    marginBottom: 50,
    paddingHorizontal: 9,
    paddingVertical: 9,
    width: '100%',
    borderRadius: 6,
    borderColor: commonColor.greyer,
  },
};
