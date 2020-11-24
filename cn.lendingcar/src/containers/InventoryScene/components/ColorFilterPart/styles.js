import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';

export default {
  content: {
    marginTop: 40,
    marginBottom: 18.5,
  },
  // title
  titleView: {
  },
  title: {
    fontWeight: '600',
    fontSize: getPadSize(20, 1.2),
    color: commonColor.black,
    lineHeight: 28,
  },
  iconTouch: {
    position: 'absolute',
    right: -12,
    top: -8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: getPadSize(17, 1.2),
    height: getPadSize(17, 1.2),
    backgroundColor: commonColor.brand,
    borderRadius: 2,
  },
  icon: {
    marginTop: -1,
    fontWeight: '600',
    color: commonColor.white,
    fontSize: getPadSize(18, 1.2),
  },
  // fitter
  fiterBoxView: {
    paddingTop: 4,
  },
  fiterBoxViewLimit: {
    height: 135,
    overflow: 'hidden',
  },
  fiterBox: {
    marginTop: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // circle
  fiterView: {
    alignItems: 'center',
  },
  colorView: {
    borderWidth: 2,
    borderColor: commonColor.white,
    padding: 3,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  activeColorView: {
    borderColor: commonColor.brand,
  },
  colorStyle: {
    borderRadius: 50,
  },
  colorSize: {
    width: 30,
    height: 30,
  },
  filterTitle: {
    width: 40,
    height: 16.5,
    fontSize: getPadSize(12, 1.2),
    color: commonColor.grey650,
    textAlign: 'center',
  },
};
