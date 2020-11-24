import * as commonColor from 'commonColor';
import variables from 'platform';
import noCarImg from './assets/noCarImg.png';
const {
  deviceHeight,
  deviceWidth,
  isIOS,
} = variables;

export default {
  contentContainer: {
    justifyContent: 'center',
    height: '100%',
  },
  content: {
    backgroundColor: commonColor.grey200,
  },
  contentView: {
    backgroundColor: commonColor.white,
    flex: 1,
    alignItems: 'center',
  },
  // 条件搜索
  querysContent: {
    width: '80%',
    borderWidth: 1,
    borderColor: commonColor.grey200,
    borderRadius: 20,
    height: 40,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  // 加入会员提示
  memberTips: {
    backgroundColor: commonColor.brown,
    height: 35,
    width: '100%',
    justifyContent: 'center',
  },
  tipsText: {
    color: commonColor.brownGlod,
    fontSize: 12,
  },
  leftBox: {
    flex: 0.4,
    alignItems: 'flex-end',
  },
  rightBox: {
    flex: 0.4,
    alignItems: 'flex-start',
  },
  queryText: {
    fontSize: 12,
  },
  cars: {
    flexDirection: 'row',
    flex: 1,
  },
  carTypes: {
    flex: 0.25,
    backgroundColor: '#F6F6F6',
  },
  carTypeBox: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex:0.13,
    height: 80,
  },
  active: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex:0.13,
    height: 80,
    backgroundColor: commonColor.brand,
  },
  activeText: {
    color: commonColor.white,
  },
  priceText: {
    fontSize: 12,
    color: commonColor.grey650,
  },
  activePriceText: {
    fontSize: 12,
    color: commonColor.white,
  },
  carList: {
    flex: 0.75,
    // height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  carListImage: {
    width: 100,
    height: 100,
    marginTop: 130,
    alignSelf: 'center',
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 14,
    color: commonColor.grey650,
    marginTop: 20,
  },
  // modal
  modalContainer: {
    justifyContent: 'flex-start',
    margin: 0,
  },
  modalContent: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: commonColor.white,
    padding: 20,
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forms: {
    width: deviceWidth * 0.8,
  },
  addressText: {
    color: commonColor.darkGrey,
    fontSize: 12,
    paddingLeft: 10,
    marginVertical: 8,
  },
  addressTextConcat: {
    color: commonColor.darkGrey,
    fontSize: 12,
    paddingLeft: 10,
  },
  addressPicker: {
    borderWidth: 1,
    borderColor: commonColor.grey,
    borderRadius: 20,
    position: 'relative',
  },
  pickerHeight: {
    height: 35,
  },
  caretdown: {
    fontSize: 12,
    position: 'absolute',
    right: 20,
    top: 10,
  },
  timeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  selectTime: {
    flex: 0.4,
    justifyContent: 'center',
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
  returnTimeHeadBottom: {
    color: '#999999',
    fontSize: 12,
  },
  centerBox: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCenterBox: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  timePicker: {
    height: 35,
    borderWidth: 1,
    borderColor: commonColor.greyLight,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // cars
  carBox: {
    height: 135,
    borderBottomColor: commonColor.grey200,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  carImgBox: {
    flex: 0.4,
  },
  carImg: {
    width: '90%',
    height: 80,
  },
  carInfo: {
    flex: 0.6,
    paddingLeft: 10,
  },
  carDesc: {
    color: commonColor.grey650,
    fontSize: 12,
    marginVertical: 5,
  },
  // delear
  delear: {
    marginHorizontal: 10,
    borderBottomColor: commonColor.grey200,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 10,
  },
  delearLeft: {
    flex: 0.6,
  },
  delearAvatar: {
    flexDirection: 'row',
  },
  imageSize: {
    width: 30,
    height: 30,
  },
  dealerName: {
    flexWrap: 'wrap',
    fontSize: 12,
    color: commonColor.darkGrey,
  },
  dropOff: {
    backgroundColor: 'rgba(255, 114, 127, 0.1)',
    width: 73,
    height: 20,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dealerScore: {
    flex: 1,
    marginLeft: 8,
  },
  ScoreView: {
    flexDirection: 'row',
  },
  carRate: {
    fontSize: 12,
    marginRight: 3,
    transform: [{ translateY: 3 }],
  },
  delearRate: {
    color: commonColor.brand,
    fontSize: 14,
    marginRight: 7,
  },
  noCardsView: {
    backgroundColor: commonColor.greyF0,
    width: 48,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: 2 }],
  },
  noCarsText: {
    color: commonColor.darkGrey,
    fontSize: 10,
  },
  delearIcon: {
    fontSize: 20,
  },
  delearRight: {
    flex: 0.4,
  },
  delearPrice: {
    fontSize: isIOS ? 26 : 28,
    color: commonColor.brownGlod,
  },
  dol: {
    fontSize: 16,
    color: commonColor.brownGlod,
  },
  delearColor: {
    color: commonColor.brownGlod,
  },
  delearbtn: {
    height: 30,
    width: '100%',
    marginVertical: 5,
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
  },
  // memberModal
  memberContent: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: commonColor.white,
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  memTitle: {
    fontSize: 30,
    color: commonColor.black,
    marginTop: 30,
  },
  menText: {
    marginTop: 20,
  },
  // memberShipModal
  memberContainer: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberShip: {
    width: 315,
    padding: 20,
    paddingTop: 28,
    borderRadius: 20,
    backgroundColor: commonColor.brownGlod,
  },
  memberTop: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  memberTopLeft: {
    height: 84,
    width: 42.5,
    backgroundColor: commonColor.grey750,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLeftText: {
    width: 20,
    color: commonColor.brownGlod,
    fontSize: 20,
    lineHeight: 28,
  },
  memberTopRight: {
    width: 62,
    height: 82,
    marginLeft: 12,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: commonColor.brown,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRightText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  memberCenter: {
    marginVertical: 20,
  },
  memberCenterCash: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bookBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 44,
    borderWidth: 0.5,
    borderColor: commonColor.brown,
    borderRadius: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  richBooking: {
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberBtn: {
    marginTop: 20,
    justifyContent: 'center',
    width: '80%',
    height: 44,
    backgroundColor: commonColor.brown,
    borderRadius: 50,
    shadowColor: commonColor.brown,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 1,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  memberImage: {
    position: 'absolute',
    height: 180,
    width: 215,
    top: '30%',
    right: -100,
  },
  goMember: {
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
  },
  goMemberText: {
    color: commonColor.brownGlod,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // imageContainer
  imageContainer: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCarsModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCarsModal: {
    source: noCarImg,
    style: {
      width: 316,
      height: 184,
    },
  },
  noCarsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  noCarsButton: {
    position: 'absolute',
    right: 12.3,
    top: 12.35,
  },
  closeIcon: {
    fontSize: 20,
    color: commonColor.white,
  },
  noCarsTitle: {
    color: commonColor.white,
    fontSize: 20,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  noCarsBody: {
    color: commonColor.white,
    fontSize: 13,
    width: 182,
    lineHeight: 18.5,
  },
  imgContent: {
    width: deviceWidth * 0.9,
    flex: 0.4,
    backgroundColor: commonColor.white,
    borderRadius: 15,
    alignSelf: 'center',
  },
  imageBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  carTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: commonColor.white,
    marginBottom: 20,
  },
  carTitleList: {
    fontSize: 18,
    color: commonColor.black,
    marginBottom: isIOS ? 4 : 20,
  },
  image: {
    width: deviceWidth,
    height: deviceWidth * 0.4,
  },
  // fontSize
  fontSize12: {
    fontSize: 12,
  },
  textRight: {
    textAlign: 'right',
  },
  textCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 15,
  },
  marginVertical5: {
    marginVertical: 5,
  },
  textBg: {
    backgroundColor: '#FFF0F3',
    borderRadius: 5,
    alignItems: 'center',
    paddingLeft: 3,
    paddingRight: 3,
    marginLeft: 3,
  },
  textPink: {
    color: '#FF8190',
  },
  darkGrey: {
    color: commonColor.darkGrey,
  },
  grey650: {
    color: commonColor.grey650,
    fontSize: 12,
  },
  brand: {
    color: commonColor.brand,
  },
};
