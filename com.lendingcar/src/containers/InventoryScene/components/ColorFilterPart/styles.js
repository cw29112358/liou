import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  content: {
    marginTop: 40,
    marginBottom: 18.5,
  },
  // title
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: isPad ? 30 : 20,
    color: commonColor.black,
    lineHeight: isPad ? 42 : 28,
  },
  iconTouch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: isPad ? 25 : 17,
    height: isPad ? 25 : 17,
    backgroundColor: commonColor.brand,
    borderRadius: isPad ? 3 : 2,
  },
  icon: {
    marginTop: -1,
    color: commonColor.white,
    fontSize: isPad ? 27 : 18,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: commonColor.white,
    padding: 3,
    width: isPad ? 60 : 40,
    height: isPad ? 60 : 40,
    borderRadius: 50,
  },
  activeColorView: {
    borderColor: commonColor.brand,
  },
  colorStyle: {
    borderRadius: 50,
  },
  colorSize: {
    width: isPad ? 45 : 30,
    height: isPad ? 45 : 30,
  },
  filterTitle: {
    width: isPad ? 60 : 40,
    height: isPad ? 25 : 16.5,
    fontSize: isPad ? 19.5 : 13,
    color: commonColor.grey650,
    textAlign: 'center',
  },
};
