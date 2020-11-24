import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isIOS,
} = variables;

export default {
  isIOS,
  content: {
    width: '100%',
    height: 150,
  },
  map: {
    flex: 1,
  },

  // annotation
  annotationCircle: {
    borderWidth: 2,
    borderColor: commonColor.white,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: commonColor.green900,
  },

  sendButton: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: commonColor.white,
    shadowColor: commonColor.shadowColorBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  sendIcon: {
    transform: [{
      rotate: '10deg',
    }],
    marginTop: 3,
    fontSize: 30,
    color: commonColor.black,
  },
};
