import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';
import formStyles from 'forms/styles';

const {
  minHeight,
  scenePaddingWidth,
} = variables;
const {
  blackShadow,
  brandShadow,
} = formStyles;

export default {
  blackShadow,
  brandShadow,

  content: {
    height: minHeight,
    backgroundColor: commonColor.grey200,
  },
  view: {
    backgroundColor: commonColor.white,
  },
  topView: {
    paddingHorizontal: scenePaddingWidth,
    paddingTop: 16,
    paddingBottom: 40,
    borderBottomWidth: 0.5,
    borderColor: commonColor.greyer,
  },
  avatarImage: {
    marginRight: 12,
    width: 51,
    height: 51,
  },
  avatarRight: {
    flex: 1,
    marginTop: 6,
  },
  row1Style: {
    justifyContent: 'space-between',
  },
  blackText: {
    fontSize: getPadSize(16),
  },

  message: {
    fontSize: getPadSize(15),
    color: commonColor.black2,
  },

  buttonView: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 40,
  },
  button: {
    borderWidth: 0,
    width: 120,
    height: 40,
    backgroundColor: commonColor.transparent,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: getPadSize(15),
  },

  borderButton: {
    borderWidth: 0.5,
    borderColor: commonColor.greyLight,
  },
  shadowRadius: {
    borderRadius: 20,
  },
  leftButton: {
    marginRight: 27,
  },
  whiteText: {
    color: commonColor.white,
  },
  geryText: {
    color: commonColor.grey650,
  },
};
