import * as commonColor from 'commonColor';

export default {
  view: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    width: 343,
    height: 200,
    borderRadius: 12,
    backgroundColor: commonColor.white,
    elevation: 3,
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  car: {
    width: 215,
    height: 121,
  },
  text: {
    position: 'absolute',
    bottom: 18,
    fontSize: 16,
    color: commonColor.black,
  },

  image: {
    width: 250,
    height: 165,
  },
};
