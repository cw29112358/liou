import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import variables from 'platform';
import formsStyles from 'forms/styles';

const {
  scenePaddingWidth,
} = variables;
const {
  blackShadow,
} = formsStyles;

export default {
  blackShadow,
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: scenePaddingWidth,
    alignItems: 'center',
  },
  searchPart: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchView: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    borderRadius: 6,
  },
  searchButton: {
    justifyContent: 'center',
    width: 42,
    height: 40,
    paddingLeft: 0,
    paddingRight: 0,
  },
  searchImage: {
    width: 16,
    height: 16,
  },
  searchInput: {
    height: 40,
  },

  cancelButton: {
    justifyContent: 'flex-end',
    width: 'auto',
    height: 40,
    paddingLeft: scenePaddingWidth,
    paddingRight: 0,
  },
  cancelButtonText: {
    fontSize: getPadSize(14),
    color: commonColor.grey4,
  },

  filterView: {
    flexDirection: 'column',
  },
  filterTitle: {
    marginTop: 60,
    fontSize: getPadSize(16),
    color: commonColor.grey3,
  },
  filterButtonView: {
    marginTop: 16,
  },
  filterButton: {
    width: 65,
    height: 30,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 36,
  },
  filterButtonText: {
    fontSize: getPadSize(13),
    color: commonColor.black,
  },
  filterActiveButton: {
    borderWidth: 0,
  },
  filterActiveButtonText: {
    color: commonColor.white,
  },
};
