import * as commonColor from 'commonColor';

import variables from 'platform';

const {
  deviceWidth,
} = variables;

export default {
  contentContainer: {
    paddingHorizontal: 48,
    flex: 1,
    alignItems: 'center',
  },
  content: {
    backgroundColor: commonColor.white,
  },

  review: {
    height: 90,
    width: 90,
    marginBottom: 24,
    marginTop: 60,
  },

  firstParagraph: {
    marginBottom: 16,
    fontSize: 14,
    textAlign: 'center',
  },
  secondParagraph: {
    fontSize: 14,
    textAlign: 'center',
  },
  strongText: {
    fontWeight: '700',
  },

  buttonGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 95,
  },
  button: {
    width: deviceWidth / 2,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modifyButton: {
    marginBottom: 32,
    borderWidth: 0.5,
    borderColor: commonColor.brand,
    backgroundColor: commonColor.transparent,
  },
  modifyButtonText: {
    color: commonColor.brand,
    fontSize: 15,
  },
  jumpButton: {
    backgroundColor: commonColor.brand,
  },
  jumpButtonText: {
    color: commonColor.white,
    fontSize: 15,
  },
};
