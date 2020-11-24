import * as commonColor from 'commonColor';

export default {
  content: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: commonColor.transparent,
  },
  mask: {
    width: '100%',
    height: '100%',
  },
  // button
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '90%',
    backgroundColor: commonColor.white,
    borderRadius: 12,
  },
  logOutText: {
    color: commonColor.red,
  },
  cancelText: {
    color: commonColor.blue,
  },
};
