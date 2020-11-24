import * as commonColor from 'commonColor';
// import { getPadSize } from 'utils/helpers';

export default {
  contentContainer: {
    justifyContent: 'flex-start',
    height: '100%',
  },
  content: {
    backgroundColor: commonColor.brand,
  },
  carPart: {
    width: '90%',
    alignSelf: 'flex-end',
  },
  contentView: {
    backgroundColor: commonColor.white,
    marginVertical: 15,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  topTitle: {
    paddingTop: 30,
    marginBottom: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: commonColor.white,
  },
  footer: {
    marginVertical: 25,
  },
  text: {
    textAlign: 'center',
    color: commonColor.white,
  },
  typeContent: {
    justifyContent: 'center',
    paddingLeft: '8%',
    paddingTop: '5%',
  },
  carTitle: {
    color: commonColor.black,
    fontSize: 40,
  },
  tips: {
    borderRadius: 10,
    backgroundColor: commonColor.grey750,
    color: commonColor.brownGlod,
    marginLeft: 5,
    marginTop: 15,
    fontSize: 12,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5,
  },
  carDesc: {
    color: commonColor.black,
  },
  images: {
    width: '90%',
    height: 110,
    alignSelf: 'flex-end',
  },
};
