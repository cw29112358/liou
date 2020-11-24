import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import variables from 'platform';

const {
  deviceWidth,
  scenePaddingWidth,
} = variables;

export default {
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    height: 33,
    backgroundColor: commonColor.white,
  },
  searchButton: {
    justifyContent: 'center',
    width: 43,
    height: 33,
    paddingLeft: 0,
    paddingRight: 0,
  },
  searchImage: {
    width: 16,
    height: 16,
  },
  searchInput: {
    height: 33,
    paddingVertical: 0,
  },

  cancelButton: {
    justifyContent: 'center',
    width: 'auto',
    paddingLeft: scenePaddingWidth,
    paddingRight: scenePaddingWidth,
  },
  cancelButtonText: {
    fontSize: getPadSize(14),
    color: commonColor.white,
  },

  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 90,
    paddingHorizontal: scenePaddingWidth,
  },
  avatarRow: {
    marginBottom: 0,
    maxWidth: deviceWidth - 100 - scenePaddingWidth * 2,
    overflow: 'hidden',
  },
  avatarImage: {
    marginRight: 8,
    width: 50,
    height: 50,
  },
  blackText: {
    fontSize: getPadSize(16),
  },
  greyText: {
    fontSize: getPadSize(12),
  },
  separateView: {
    height: 12,
    backgroundColor: commonColor.greyF,
  },

  buttonGroup: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  firstButton: {
    marginRight: 10,
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    width: 'auto',
    height: 'auto',
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: getPadSize(22),
  },
  buttonText: {
    fontSize: getPadSize(12),
    color: commonColor.brand,
  },

  imageLinearButton: {
    borderRadius: 15,
    marginBottom: 4,
  },
  imageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: commonColor.transparent,
  },
  image: {
    width: 15,
    height: 15,
  },
};
