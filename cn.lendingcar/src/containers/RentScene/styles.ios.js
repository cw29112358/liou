import * as commonColor from 'commonColor';
import variables from 'platform';
import bgImage from './assets/bg.png';
const {
  isPad,
  deviceHeight,
  deviceWidth,
} = variables;

export default {
  isPad,
  bgImageProps: {
    source: bgImage,
    style: {
      width: deviceWidth,
      height: deviceHeight,
    },
  },
  content: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 25.5,
    flexDirection: 'row',
    position: 'relative',
  },
  contentTitle: {
    fontSize: 32,
    height: 45,
    lineHeight: 45,
    color: commonColor.white,
    fontWeight: 'bold',
  },
  contentText: {
    height: 18.5,
    lineHeight: 18.5,
    fontSize: 13,
    color: commonColor.white,
    position: 'absolute',
    top: 20,
    right: 0,
  },
  image: {
    width: 217,
    alignSelf: 'center',
  },
  rentForm: {
    backgroundColor: commonColor.white,
    flex: 1,
    alignSelf: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 22,
    width: 343,
    height: 393.5,
    shadowColor: '#7B3138',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 0,
  },
  addressText: {
    color: commonColor.darkGrey,
    fontSize: 12,
    height: 16.5,
    lineHeight: 16.5,
    paddingLeft: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  addressTextConcat: {
    flexDirection: 'column',
    color: commonColor.darkGrey,
    fontSize: 12,
    paddingLeft: 10,
  },
  pickerHeight: {
    height: 35,
  },
  careDown: {
    fontSize: 12,
    position: 'absolute',
    right: 20,
    top: 10,
    zIndex: -1,
  },
  addressPicker: {
    borderWidth: 1,
    borderColor: commonColor.grey,
    borderRadius: 19.25,
    shadowColor: commonColor.pureBlack,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 0,
  },
  timeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectTime: {
    flex: 0.4,
    justifyContent: 'center',
  },
  centerBox: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timePicker: {
    height: 35,
    borderWidth: 1,
    borderColor: commonColor.greyLight,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timePickerTitle: {
    color: 'black',
    fontSize: 16,
  },
  returnTimeHead: {
    borderBottomWidth: 1,
    borderBottomColor: commonColor.greyer,
    padding: 9,
  },
  returnTimeHeadTop: {
    textAlign: 'center',
    fontSize: 16,
  },
  returnTimeHeadBody: {
    textAlign: 'center',
    fontSize: 14,
  },
  returnTimeHeadBottom: {
    color: commonColor.darkGrey,
    fontSize: 12,
  },
  bottomPart: {
    marginTop: 40,
  },
  bottomBtn: {
    width: 235,
    height: 44,
    backgroundColor: commonColor.brand,
    alignSelf: 'center',
    shadowColor: commonColor.brand,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0,
    shadowRadius: 3,
  },
  bottomBtnText: {
    width: '100%',
    textAlign: 'center',
    height: 21,
    lineHeight: 21,
    fontSize: 15,
  },
  bottomText: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  colorText: {
    color: commonColor.brownGlod,
    fontSize: 12,
  },
  normalText: {
    fontSize: 12,
  },
};
