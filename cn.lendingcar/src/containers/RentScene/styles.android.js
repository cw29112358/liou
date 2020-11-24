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
      height: deviceHeight + 50,
    },
  },
  contentContainer: {
    justifyContent: 'center',
    height: '100%',
  },
  content: {
    marginLeft: 16,
    marginRight: 16,
    // marginTop: 25.5,
    flexDirection: 'row',
    position: 'relative',
    // backgroundColor: 'blue',
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
    height: 150,
    alignSelf: 'center',
    marginVertical: 35,
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
  },
  addressText: {
    flexDirection: 'column',
    color: commonColor.darkGrey,
    fontSize: 12,
    paddingLeft: 10,
    marginVertical: 8,
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
  },
  addressPicker: {
    position: 'relative',
    borderWidth: 1,
    borderColor: commonColor.grey,
    borderRadius: 20,
    // shadowColor: '#ff000a',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 1,
    // shadowRadius: 6,
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
    borderBottomColor: '#E6E6E6',
    padding: 10,
    fontSize: 14,
  },
  returnTimeHeadTop: {
    textAlign: 'center',
  },
  returnTimeHeadBody: {
    textAlign: 'center',
    fontSize: 14,
  },
  returnTimeHeadBottom: {
    color: '#999999',
    fontSize: 12,
  },
  bottomPart: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  bottomBtn: {
    width: '70%',
    alignSelf: 'center',
  },
  bottomBtnText: {
    width: '100%',
    textAlign: 'center',
  },
  bottomText: {
    marginTop: 15,
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
