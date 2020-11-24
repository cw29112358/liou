import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isIOS,
  deviceWidth,
} = variables;

export default {
  isIOS,
  white: commonColor.white,
  container: {
    width: deviceWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: deviceWidth,
    marginBottom: 20,
    alignItems: 'center',
  },

  image: {
    width: 345,
    height: 424,
    marginTop: 10,
  },

  detailButton: {
    alignSelf: 'center',
    marginTop: -22,
    height: 44,
    borderRadius: 44,
    backgroundColor: commonColor.white,
  },
  detailText: {
    color: commonColor.black,
  },

  closeButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    borderWidth: 1,
    borderColor: commonColor.white,
    top: 0,
    right: 16,
    justifyContent: 'center',
    elevation: 0,
  },
};
