import * as commonColor from 'commonColor';
import { getScaleSize } from 'utils/helpers';

export default {
  view: {
    paddingHorizontal: getScaleSize(16),
    paddingTop: 40,
    paddingBottom: 12,
  },
  viewBorder: {
    paddingBottom: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: commonColor.greyer,
  },
  // title
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  leftTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingRight: 0,
  },
  iconStyle: {
    marginRight: 0,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    fontSize: 18,
    color: commonColor.brand,
  },
  horizontalLine: {
    marginRight: 12,
    width: 3,
    height: 18,
    backgroundColor: commonColor.brand,
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
  },
  // list
  listWithShadow: {
    marginTop: 5,
    marginBottom: 23.5,
    paddingTop: 20,
    borderRadius: 10,
    backgroundColor: commonColor.white,
    shadowColor: commonColor.shadowColorBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
};
