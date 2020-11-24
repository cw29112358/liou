import * as commonColor from 'commonColor';
import { getScaleSize } from 'utils/helpers';
import variables from 'platform';

const {
  deviceWidth,
} = variables;

export default {
  contentContainer: {
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: commonColor.white,
  },

  list: {
    paddingHorizontal: getScaleSize(16),
    paddingTop: 20,
  },

  cardItem: {
    backgroundColor: commonColor.black,
    marginBottom: 20,
    height: 80,
    overflow: 'hidden',
    justifyContent: 'center',
    borderRadius: 6,
  },
  cardImage: {
    width: deviceWidth - getScaleSize(32),
    height: 80,
  },
  cardMessage: {
    position: 'absolute',
    left: getScaleSize(16),
    flexDirection: 'row',
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: commonColor.white,
  },
  businessMessage: {
    marginLeft: 20,
  },
  cardTitle: {
    color: commonColor.white,
    fontSize: getScaleSize(12),
  },
  cardNote: {
    color: commonColor.white,
    fontSize: getScaleSize(20),
    marginTop: 5,
  },

  headerBody: {
    flexDirection: 'row-reverse',
  },
  dropdownIcon: {
    fontSize: getScaleSize(12),
    transform: [{ rotateZ: '-90deg' }],
    color: commonColor.white,
    marginBottom: 5,
    marginLeft: 8,
  },
  dropupIcon: {
    transform: [{ rotateZ: '90deg' }],
    marginBottom: 0,
  },
};
