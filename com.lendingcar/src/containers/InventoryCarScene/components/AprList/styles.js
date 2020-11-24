import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
  scenePaddingWidth,
} = variables;

export default {
  deviceWidth,
  aprList: {
    paddingLeft: scenePaddingWidth,
  },
  aprItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 0.5,
    borderColor: commonColor.brand,
    borderRadius: 6,
    width: 125.5,
    height: 72.5,
  },
  aprKey: {
    fontSize: 20,
    fontWeight: '800',
    color: commonColor.brand,
  },
  aprValue: {
    marginTop: 8,
    fontSize: 13,
    color: commonColor.brand,
  },
  aprItemActive: {
    backgroundColor: commonColor.brand,
  },
  aprKeyActive: {
    color: commonColor.white,
  },
  aprValueActive: {
    color: commonColor.white,
  },
};
