import * as commonColor from 'commonColor';
import { getScaleSize } from 'utils/helpers';

export default {
  cardImage: {
    overflow: 'hidden',
    borderRadius: 6,
    width: '100%',
    height: 150,
    backgroundColor: commonColor.black,
  },
  cardView: {
    height: '100%',
    padding: 15,
    justifyContent: 'space-between',
  },
  logoImage: {
    marginRight: 5,
    borderRadius: 20,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: commonColor.white,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardColumn: {
    height: 40,
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: getScaleSize(14),
    color: commonColor.white,
  },
};
