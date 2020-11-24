/**
 *
 * RentCarScene Container
 *
 */

/* global window translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import {
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Picker,
  Icon,
  Button,
} from 'native-base';
import moment from 'moment';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  getInventoryResizedImageUrl,
} from 'utils/helpers';
import AppHeader from 'components/AppHeader';
import variables from 'platform';

// import {} from './constants';

import {
  selectAuthUserMembership,
} from 'containers/AppRouter/selectors';
import {
  selectAreaConfig,
} from 'containers/HomeScene/selectors';
import {
  selectInventoryByType,
} from 'containers/InventoryScene/selectors';
import {
  saveTimeAddress,
  loadRentInventoryAction,
} from 'containers/RentScene/actions';
import {
  selectRentInfo,
  selectRentInventory,
} from 'containers/RentScene/selectors';
import { RENT_FORM_CONTEXT, CAR_RENT_CONTEXT, MEMBER_MODAL_CONTEXT } from './constants';
// import { loadRentInventoryAction } from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';
const {
  deviceHeight,
  deviceWidth,
  isIOS,
} = variables;

export class RentCarScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      activeTypeIndex: 0, // 左侧车列表的活动项
      modalVisible: false, // renderQuerySelection的显隐
      pickupTimeVisible: false, // 取车时间弹框的显隐
      returnTimeVisible: false, // 还车时间弹框的显隐
      imgModalVisible: false, // 汽车示例图片弹框的显隐
      memberTipsVisible: false, // 汽车短租说明弹框的显隐
      memberShipVisible: false, // 提示加入会员弹框的显隐
      animatedTransformX: new Animated.Value(deviceWidth),
      selectedCar: {}, // 选中活动的车辆信息
      selectedDealerental: {}, // 选中活动车的经销商
      selectedCarImg: { images: [] }, // 选中的示例图片
      noCarsModalVisible: false, // 汽车溜走弹框的显隐
    };
  }
  componentDidMount() {
    const {
      // typeOfInventory,
      // rentInventory,
      loadRentInventory,
      rentInfo,
    } = this.props;
    const { pickupAddress, pickupTime, returnTime } = rentInfo;
    const { animatedTransformX } = this.state;
    // const carTypeInventory = {};
    // 重新获取短租库存车列表
    loadRentInventory({
      forceReload: true,
      area: pickupAddress,
      pickupTime,
      returnTime,
    });
    // typeOfInventory.forEach((element) => {
    //   const source = {
    //     [element.type]: rentInventory.filter((item) => {
    //       if (element.type !== 'all') {
    //         return item.carType === element.type;
    //       }
    //       return item;
    //     }),
    //   };
    //   Object.assign(carTypeInventory, source);
    // });
    // 开始动画
    Animated.loop(
      Animated.timing(animatedTransformX, {
        toValue: -300,
        duration: 8000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }
  // componentWillUnmount() {
  //   Animated.stop(); // 结束动画
  // }
  // 点击左侧车列表，切换活动项
  handleCarTypeClick = (index) => this.setState({ activeTypeIndex: index })
  // 打开时间选择器
  handleTimePickerModal = (val, type) => this.setState({ [type]: val })
  // 时间选择事件
  handleTimePickerConfirm = (date, timeType) => {
    const {
      saveTimeAndAddress,
      rentInfo,
      loadRentInventory,
    } = this.props;
    const times = {};
    let dateTime;
    let changedReturnTime;
    if (isIOS) {
      dateTime = moment(date).format('YYYY/MM/DD HH:mm');
      changedReturnTime = moment(date).add(7, 'days').format('YYYY/MM/DD HH:mm');
    } else {
      dateTime = moment(date).format('YYYY/MM/DD HH:00');
      changedReturnTime = moment(date).add(7, 'days').format('YYYY/MM/DD HH:00');
    }
    // 如果选择的时间晚于晚上9点或者早于早上9点，则跳弹窗给提示，否则赋值选择的时间
    if (moment(date).format('HH') > 21 || moment(date).format('HH') < 9) {
      this.setState({
        pickupTimeVisible: false,
        returnTimeVisible: false,
      }, () => {
        this.setState({ modalVisible: false });
        window.toast(translate('timeLimitInfo'));
      });
    } else if (timeType === 'pickupTime') { // 如果是操作选择取车时间
      // 如果选择的时间比还车时间晚，则修改取车时间，并相应修改还车时间
      if (date.valueOf() >= moment(new Date(rentInfo.returnTime)).valueOf()) {
        const params = Object.assign(
          {},
          rentInfo,
          {
            pickupTime: dateTime,
            returnTime: changedReturnTime,
          }
        );
        saveTimeAndAddress(params); // 保存还车时间选择器的默认值至rentScene的rentInfo中
        times.returnTime = changedReturnTime;
      } else { // 如果选择的时间比还车时间早，则只修改取车时间，不修改还车时间
        const params = Object.assign({}, rentInfo, { pickupTime: dateTime });
        saveTimeAndAddress(params); // 保存还车时间选择器的默认值至rentScene的rentInfo中
      }
      this.setState({ pickupTimeVisible: false });
      // 根据取车时间和还车时间重新获取短租库存车列表
      loadRentInventory({
        forceReload: true,
        area: rentInfo.pickupAddress,
        pickupTime: dateTime,
        returnTime: times.returnTime ? times.returnTime : rentInfo.returnTime, // 还车时间被修改，则赋值修改后的还车时间，否则赋值原来的还车时间
      });
    } else { // 如果是操作选择还车时间，则修改还车时间
      const params = Object.assign(
        {},
        rentInfo,
        {
          returnTime: dateTime,
        }
      );
      saveTimeAndAddress(params); // 保存还车时间选择器的默认值至rentScene的rentInfo中
      times[timeType] = dateTime;
      this.setState({ returnTimeVisible: false });
      // 根据取车时间和还车时间重新获取短租库存车列表
      loadRentInventory({
        forceReload: true,
        area: rentInfo.pickupAddress,
        pickupTime: rentInfo.pickupTime,
        returnTime: dateTime,
      });
    }
  }
  // 选择取车地点和还车地点的事件
  handleAddressChange = (val) => {
    const { saveTimeAndAddress, rentInfo, loadRentInventory } = this.props;
    const { pickupTime, returnTime } = rentInfo;
    // 取车地点改变时加载短租库存车列表
    if (val.pickupAddress) {
      loadRentInventory({
        forceReload: true,
        area: val.pickupAddress,
        pickupTime,
        returnTime,
      });
    }
    const params = Object.assign({}, rentInfo, val);
    // 保存时间和地址到 store
    saveTimeAndAddress(params);
  }
  // 切换汽车短租说明的弹窗
  toggleMemberTipsModal = (val) => {
    this.setState({ memberTipsVisible: val });
  }
  // 立即预定事件
  handleBookNow = (car, dealerental) => {
    const { authUserMembership: { isMembership }, rentInfo } = this.props;
    const { pickupTime } = rentInfo;
    // 如果是可预定的，则进入下一步。否则跳汽车溜走弹窗
    if (car.availability === 'available') {
      // 如果是会员，则跳转订车细节页面。否则，跳加入会员弹窗
      if (isMembership) {
        Actions.push('bookingDetails', {
          selectedDealerental: dealerental, // 选中活动车的经销商
          rentCarInfo: car, // 选中活动的车辆信息
          pickDate: pickupTime, // 取车时间
          rentInfo, // 短租信息（两个时间和两个区域）
        });
      } else {
        this.setState({ memberShipVisible: true, selectedCar: car, selectedDealerental: dealerental });
      }
    } else {
      this.setState({ noCarsModalVisible: true });
    }
  }
  // 不差钱，继续预定事件
  handleBooking = () => {
    const { selectedCar, selectedDealerental } = this.state;
    const { rentInfo } = this.props;
    const { pickupTime } = rentInfo;
    this.setState({ memberShipVisible: false });
    // 跳转订车细节页面
    Actions.push('bookingDetails', {
      selectedDealerental, // 选中活动车的经销商
      rentCarInfo: selectedCar, // 选中活动的车辆信息
      pickDate: pickupTime, // 取车时间
      rentInfo, // 短租信息（两个时间和两个区域）
    });
  }
  // 切换汽车示例图片弹框
  handleImageModal = (car, imgurl) => {
    this.setState({ selectedCarImg: car, imgModalVisible: !!imgurl });
  }
  renderQuerySelection = () => {
    const {
      rentInfo: {
        pickupAddress, returnAddress, pickupTime, returnTime,
      },
    } = this.props;
    return (
      <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
        <View style={styles.querysContent}>
          <View style={styles.leftBox}>
            <Text style={styles.queryText}>{translate(pickupAddress)}</Text>
            <Text style={styles.queryText}>{pickupTime.slice(5, pickupTime.length)}</Text>
          </View>
          <View style={styles.centerBox}>
            <Icon name="caretright" style={{ fontSize: 12 }} type="AntDesign" />
            <Text style={styles.queryText}>
              {`${Math.ceil(moment(new Date(returnTime)).diff(moment(new Date(pickupTime)), 'day', true))}${translate('day')}`}
            </Text>
          </View>
          <View style={styles.rightBox}>
            <Text style={styles.queryText}>{translate(returnAddress)}</Text>
            <Text style={styles.queryText}>{returnTime.slice(5, returnTime.length)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  // 动画
  renderMemberTips = () => {
    const { animatedTransformX } = this.state;
    return (
      <View style={styles.memberTips}>
        <TouchableOpacity onPress={() => Actions.push('member')}>
          <Animated.Text style={[styles.tipsText, { transform: [{ translateX: animatedTransformX }] }]}>{translate('animatedRentTips')}</Animated.Text>
        </TouchableOpacity>
      </View>
    );
  }
  // 左侧车列表类型
  renderCarType = () => {
    const { activeTypeIndex } = this.state;
    const {
      typeOfInventory, // 车列表类型
      rentInventory, // 短租库存车列表
    } = this.props;
    const carTypeInventory = {}; // 短租库存车列表分类
    typeOfInventory.forEach((element) => {
      const source = {
        [element.type]: rentInventory.filter((item) => {
          if (element.type !== 'all') {
            if (element.type === 'van') {
              return item.carType === 'trunk';
            }
            return item.carType.toLowerCase() === element.type.toLowerCase();
          }
          return item;
        }),
      };
      Object.assign(carTypeInventory, source);
    });
    return (
      <View style={styles.carTypes}>
        {
          Object.keys(carTypeInventory).map((type, index) => {
            const cheapest = carTypeInventory[type]
              .filter((item) => item.dealerrentals && item.dealerrentals.length > 0)
              .map((item) => item.dealerrentals)
              .reduce((pre, next) => pre.concat(next), []);
            const memberShipPrice = Math.min(...cheapest.map((item) => item.membershipRate));
            return (
              <TouchableOpacity key={type} onPress={() => this.handleCarTypeClick(index)}>
                <View style={activeTypeIndex === index ? styles.active : styles.carTypeBox}>
                  <Text style={activeTypeIndex === index ? styles.activeText : {}}>{translate(type)}</Text>
                  <Text style={activeTypeIndex === index ? styles.activePriceText : styles.priceText}>
                    {cheapest.length > 0 ? `$${memberShipPrice.toFixed(0)}${translate('priceStart')}` : translate('nonCar')}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }
  renderImages = () => {
    const { selectedCarImg } = this.state;
    const { images } = selectedCarImg;
    return (
      <View style={styles.imgContent}>
        <Swiper>
          {
            images ? images.map((img) => {
              const imgurl = getInventoryResizedImageUrl(img);
              return (
                <View key={img} style={styles.imageBox}>
                  {imgurl && imgurl.length > 0
                    ? <Image resizeMode="contain" style={styles.image} source={{ uri: imgurl }} />
                    : null
                  }
                </View>
              );
            }) : null
          }
        </Swiper>
      </View>
    );
  }
  // 右侧车列表
  renderCarList = () => {
    const { activeTypeIndex } = this.state;
    const { empty, sorryToEmpty } = RENT_FORM_CONTEXT;
    const {
      typeOfInventory, // 车列表类型
      rentInventory, // 短租库存车列表
    } = this.props;
    const carTypeInventory = {}; // 短租库存车列表分类后赋值
    typeOfInventory.forEach((element) => {
      const source = {
        [element.type]: rentInventory.filter((item) => {
          if (element.type !== 'all') {
            if (element.type === 'van') {
              return item.carType === 'trunk';
            }
            return item.carType.toLowerCase() === element.type.toLowerCase();
          }
          return item;
        }),
      };
      Object.assign(carTypeInventory, source);
    });
    const carType = typeOfInventory[activeTypeIndex].type; // 活动项车类型
    // 根据有无供应商筛选、会员价格排序、供应商的价格排序
    const result = carTypeInventory[carType].filter(
      (item) => item.dealerrentals.length > 0
    );
    result.forEach((element) => {
      element.dealerrentals.sort((x, y) => y.membershipRate - x.membershipRate);
    });
    result.sort((x, y) => y.dealerrentals[0].membershipRate - x.dealerrentals[0].membershipRate);
    return (
      <ScrollView style={styles.carList} contentContainerStyle={{ justifyContent: 'flex-start' }}>
        {/* 没有车，则显示默认无车页面 */}
        {
          result.length > 0
            ? result.map((car) => this.renderCarInfo(car))
            : (
              <View>
                <Image
                  source={empty}
                  style={styles.carListImage}
                />
                <Text style={styles.emptyText}>
                  {translate(sorryToEmpty)}
                </Text>
              </View>
            )
        }
      </ScrollView>
    );
  }
  // 右侧车列表
  renderCarInfo = (car) => {
    const {
      make, model, occupancy, carType, images,
    } = car;
    const {
      carRentRate, bookNow, oldPrice, membersPrice, carDefault, dealerDefault,
    } = CAR_RENT_CONTEXT;
    let imgurl;
    try {
      imgurl = getInventoryResizedImageUrl(images[0]);
    } catch (err) { imgurl = {}; }
    return (
      <View key={car.id}>
        <View style={styles.carBox}>
          <View style={styles.carImgBox}>
            <TouchableOpacity onPress={() => this.handleImageModal(car, imgurl)}>
              <Image style={styles.carImg} source={imgurl && imgurl.length > 0 ? { uri: imgurl } : carDefault} resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <View style={styles.carInfo}>
            <Text style={styles.carTitleList}>
              {`${translate(make)} ${translate(model)}`}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.carDesc}>
                {translate('imgForReference')}
              </Text>
              <TouchableOpacity onPress={() => this.toggleMemberTipsModal(true)}>
                <Icon name="question" type="EvilIcons" style={styles.delearIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.carDesc}>
              {translate(occupancy)}
              {translate('sit')}
              {translate(carType)}
            </Text>
          </View>
        </View>
        {
          car.dealerrentals.map((dealerental) => {
            const {
              dealer, rate, membershipRate, id, description,
            } = dealerental;
            const {
              name, score, isAllowDifferentDropoff, avatar,
            } = dealer;
            let dealerImgUrl;
            try {
              dealerImgUrl = getInventoryResizedImageUrl(avatar.url);
            } catch (err) { dealerImgUrl = {}; }
            const formatDescription = description.replace(/ /g, '');
            return (
              <View style={styles.delear} key={id}>
                <View style={styles.delearLeft}>
                  <View style={styles.delearAvatar}>
                    <View style={styles.delearImg}>
                      <Image
                        style={styles.imageSize}
                        resizeMode="contain"
                        source={dealerImgUrl && dealerImgUrl.length > 0 ? { uri: dealerImgUrl } : dealerDefault}
                      />
                    </View>
                    <View style={styles.dealerScore}>
                      <View style={styles.ScoreView}>
                        <Text style={styles.carRate}>{translate(carRentRate)}</Text>
                        <Text style={styles.delearRate}>{score}</Text>
                        {/* 根据是否被预定，显示'暂无车辆'样式 */}
                        {car.availability !== 'available' && (
                          <View style={styles.noCardsView}>
                            <Text style={styles.noCarsText}>
                              {translate('noCars')}
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.dealerName}>{translate(name)}</Text>
                    </View>
                  </View>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.fontSize12, styles.marginVertical5, styles.grey650]}>{formatDescription}</Text>
                  <View style={styles.dropOff}>
                    {
                      isAllowDifferentDropoff ? <Text style={[styles.fontSize12, styles.brand]}>{translate('isAllowDifferentDropoff')}</Text> : <Text style={[styles.brand, { fontSize: 10 }]}>{translate('notAllowDifferentDropoff')}</Text>
                    }
                  </View>
                </View>
                <View style={styles.delearRight}>
                  <Text style={styles.textRight}>
                    <Text style={styles.delearPrice}><Text style={styles.dol}>$</Text>{membershipRate.toFixed(0)}</Text>
                    <Text style={[styles.grey650, isIOS && styles.fontSize12]}>/{translate('day')}</Text>
                  </Text>
                  <Text style={[styles.delearColor, styles.fontSize12, styles.textRight, isIOS && styles.marginVertical5]}>{translate(membersPrice)}</Text>
                  <Text style={[styles.fontSize12, styles.textRight, styles.grey650]}>{translate(oldPrice)}:${rate.toFixed(0)}</Text>
                  <Button style={styles.delearbtn} onPress={() => this.handleBookNow(car, dealerental)}>
                    <Text style={isIOS ? { fontSize: 10 } : styles.fontSize12}>{translate(bookNow)}</Text>
                  </Button>
                </View>
              </View>
            );
          })
        }
      </View>
    );
  }
  // 车列表
  renderCars = () => (
    <View style={styles.cars}>
      {this.renderCarType()}
      {this.renderCarList()}
    </View>
  )
  // 选择区域和时间的弹框内容
  renderAddressAndTime = () => {
    const { allArea, rentInfo } = this.props;
    const {
      pickupLocation,
      returnLocation,
      pickupTimeTips,
      returnTimes,
      pickupTimeHeader,
      returnTimeHeader,
      back,
      selectPlace,
      returnTimeHeadBottom,
      cancel,
      confirm,
    } = RENT_FORM_CONTEXT;
    const {
      pickupAddress, // 取车地址
      returnAddress, // 还车地址
      pickupTime, // 取车时间
      returnTime, // 还车时间
    } = rentInfo;
    const { pickupTimeVisible, returnTimeVisible } = this.state;
    const days = `${Math.ceil(moment(new Date(returnTime)).diff(moment(new Date(pickupTime)), 'day', true))}${translate('day')}`;
    return (
      <View style={styles.forms}>
        <Text style={styles.addressText}>{translate(pickupLocation)}</Text>
        <View style={styles.addressPicker}>
          <Picker
            style={styles.pickerHeight}
            selectedValue={pickupAddress}
            onValueChange={(val) => this.handleAddressChange({ pickupAddress: val })}
            headerBackButtonText={translate(back)}
            iosHeader={translate(selectPlace)}
          >
            {
              Object.keys(allArea).map((item) => (<Picker.Item key={item} label={translate(item)} value={item} />))
            }
          </Picker>
          {/* 在ios 平台，渲染取车时间右侧的下箭头 */}
          {
            isIOS && (
              <Icon
                name="caretdown"
                style={styles.caretdown}
                type="AntDesign"
              />
            )
          }
        </View>
        <Text style={styles.addressText}>{translate(returnLocation)}</Text>
        <View style={styles.addressPicker}>
          <Picker
            style={styles.pickerHeight}
            selectedValue={returnAddress}
            onValueChange={(val) => this.handleAddressChange({ returnAddress: val })}
            headerBackButtonText={translate(back)}
            iosHeader={translate(selectPlace)}
          >
            {
              Object.keys(allArea).map((item) => (<Picker.Item key={item} label={translate(item)} value={item} />))
            }
          </Picker>
          {/* 在ios 平台，渲染还车时间右侧的下箭头 */}
          {
            isIOS && (
              <Icon
                name="caretdown"
                style={styles.caretdown}
                type="AntDesign"
              />
            )
          }
        </View>
        <View style={styles.timeBox}>
          <View style={styles.selectTime}>
            <Text style={[styles.addressText, { width: 200 }]}>{translate(pickupTimeTips)}</Text>
            <TouchableOpacity onPress={() => this.handleTimePickerModal(true, 'pickupTimeVisible')}>
              <View style={styles.timePicker}>
                <Text>{pickupTime.slice(5, pickupTime.length)}</Text>
                <DateTimePicker
                  is24Hour
                  mode="datetime"
                  isVisible={pickupTimeVisible}
                  titleIOS={translate(pickupTimeHeader)}
                  minuteInterval={30}
                  date={new Date(pickupTime)}
                  onCancel={() => this.setState({ pickupTimeVisible: false })}
                  minimumDate={new Date(moment().add(2, 'days').format('YYYY/MM/DD 09:00').valueOf())}
                  maximumDate={new Date(moment().add(1, 'years').format('YYYY/MM/DD 21:00').valueOf())}
                  onConfirm={(date) => this.handleTimePickerConfirm(date, 'pickupTime')}
                  cancelTextIOS={translate(cancel)}
                  confirmTextIOS={translate(confirm)}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modalCenterBox}>
            <Icon name="caretright" style={{ fontSize: 12 }} type="AntDesign" />
            <Text style={styles.addressTextConcat}>
              {days}
            </Text>
          </View>
          <View style={styles.selectTime}>
            <Text style={styles.addressText}>{translate(returnTimes)}</Text>
            <TouchableOpacity onPress={() => this.handleTimePickerModal(true, 'returnTimeVisible')}>
              <View style={styles.timePicker}>
                <Text>{returnTime.slice(5, returnTime.length)}</Text>
                <DateTimePicker
                  is24Hour
                  mode="datetime"
                  minuteInterval={30}
                  isVisible={returnTimeVisible}
                  customTitleContainerIOS={(
                    <View style={styles.returnTimeHead}>
                      <Text style={styles.returnTimeHeadTop}>
                        {translate(returnTimeHeader)}
                      </Text>
                      <Text style={{ textAlign: 'center' }}>
                        {days}
                        &nbsp;
                        <Text style={styles.returnTimeHeadBottom}>
                          {translate(returnTimeHeadBottom)}
                        </Text>
                      </Text>
                    </View>
                  )}
                  date={new Date(returnTime)}
                  onCancel={() => this.setState({ returnTimeVisible: false })}
                  minimumDate={isIOS ? new Date(moment(new Date(pickupTime)).add(1, 'hours').format('YYYY/MM/DD HH:mm').valueOf()) : new Date(moment(new Date(pickupTime)).add(1, 'days').format('YYYY/MM/DD HH:00').valueOf())}
                  maximumDate={new Date(moment(new Date(returnTime)).add(1, 'years').format('YYYY/MM/DD 21:00').valueOf())}
                  onConfirm={(date) => this.handleTimePickerConfirm(date, 'returnTime')}
                  cancelTextIOS={translate(cancel)}
                  confirmTextIOS={translate(confirm)}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  // 隐藏选择时间和地址弹窗事件
  onAddressAndTimeModalBack = () => this.setState({ modalVisible: false });
  // 提示加入会员弹框内容
  renderMemberShip = () => {
    const { vImg } = RENT_FORM_CONTEXT;
    const {
      youAre,
      noMember,
      noMemberPrice,
      memberForMore,
      richForBooking,
      buttonPrivilege,
    } = MEMBER_MODAL_CONTEXT;
    const { selectedDealerental } = this.state;
    const { rate } = selectedDealerental;
    return (
      <View style={styles.memberShip}>
        <View style={styles.memberTop}>
          <View style={styles.memberTopLeft}>
            <Text style={styles.topLeftText}>{translate(youAre)}</Text>
          </View>
          <View style={styles.memberTopRight}>
            <Text style={styles.topRightText}>{translate(noMember)}</Text>
          </View>
        </View>
        <View style={styles.memberCenter}>
          <Text style={[styles.textCenter, isIOS && styles.fontSize12]}>
            {translate(noMemberPrice)}
            <Text style={isIOS ? styles.memberCenterCash : { fontSize: 28 }}>${rate ? rate.toFixed(0) : null}/{translate('day')}</Text>
          </Text>
          <Text style={[styles.textCenter, styles.textBold, isIOS && { fontSize: 16 }]}>{translate(memberForMore)}</Text>
        </View>
        <View style={styles.bookBtn}>
          <Button style={styles.richBooking} onPress={() => this.handleBooking()}>
            <Text style={[styles.textCenter, { color: '#424342', fontSize: 16 }]}>{translate(richForBooking)}</Text>
          </Button>
        </View>
        {/* 跳转购买会员页面 */}
        <View style={styles.memberBtn}>
          <Button style={styles.goMember} onPress={() => { this.setState({ memberShipVisible: false }); Actions.push('member'); }}>
            <Text style={[styles.textCenter, styles.goMemberText]}>{translate(buttonPrivilege)}</Text>
          </Button>
        </View>
        <Image
          source={vImg}
          style={styles.memberImage}
        />
      </View>
    );
  }

  render() {
    const {
      modalVisible, memberTipsVisible, memberShipVisible, imgModalVisible, selectedCarImg, noCarsModalVisible,
    } = this.state;
    const { make, model } = selectedCarImg;
    const {
      carRentTitle,
      tips1,
      tips2,
    } = CAR_RENT_CONTEXT;
    return (
      <Container>
        <AppHeader title="rent" />
        <Content
          contentContainerStyle={styles.contentContainer}
          style={styles.content}
        >
          <View style={styles.contentView}>
            {this.renderQuerySelection()}
            {this.renderMemberTips()}
            {this.renderCars()}
          </View>
        </Content>
        {/* renderQuerySelection 的弹框 */}
        <Modal
          onBackButtonPress={this.onAddressAndTimeModalBack}
          onBackdropPress={this.onAddressAndTimeModalBack}
          isVisible={modalVisible}
          style={styles.modalContainer}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
        >
          <View style={styles.modalContent}>
            {this.renderAddressAndTime()}
          </View>
        </Modal>
        {/* 汽车短租说明弹框 */}
        <Modal
          onBackButtonPress={() => this.setState({ memberTipsVisible: false })}
          onBackdropPress={() => this.setState({ memberTipsVisible: false })}
          isVisible={memberTipsVisible}
          style={styles.modalContainer}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
        >
          <View style={styles.memberContent}>
            <Icon name="close" type="EvilIcons" style={styles.memberTipsIcon} onPress={() => this.setState({ memberTipsVisible: false })} />
            <Text style={styles.memTitle}>{translate(carRentTitle)}</Text>
            <Text style={styles.menText}>1.<Text>{translate(tips1)}</Text></Text>
            <Text style={styles.menText}>2.<Text>{translate(tips2)}</Text></Text>
          </View>
        </Modal>
        {/* 提示加入会员弹框 */}
        <Modal
          onBackButtonPress={() => this.setState({ memberShipVisible: false })}
          onBackdropPress={() => this.setState({ memberShipVisible: false })}
          isVisible={memberShipVisible}
          style={styles.memberContainer}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
        >
          {this.renderMemberShip()}
        </Modal>
        {/* 汽车示例图片弹框 */}
        <Modal
          onBackButtonPress={() => this.setState({ imgModalVisible: false })}
          onBackdropPress={() => this.setState({ imgModalVisible: false })}
          isVisible={imgModalVisible}
          style={styles.imageContainer}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
        >
          <Text style={styles.carTitle}>{translate(make)}&nbsp;{translate(model)}</Text>
          {this.renderImages()}
        </Modal>
        {/* 汽车溜走弹框 */}
        <Modal
          onBackButtonPress={() => this.setState({ noCarsModalVisible: false })}
          onBackdropPress={() => this.setState({ noCarsModalVisible: false })}
          isVisible={noCarsModalVisible}
          style={styles.noCarsModalContainer}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
        >
          <ImageBackground {...styles.noCarsModal}>
            <View style={styles.noCarsView}>
              <Button style={styles.noCarsButton} onPress={() => this.setState({ noCarsModalVisible: false })}>
                <Icon name="close" style={styles.closeIcon} type="AntDesign" />
              </Button>
              <Text style={styles.noCarsTitle}>{translate('carGoAway')}</Text>
              <Text style={styles.noCarsBody}>{translate('carGoAwayInfo')}</Text>
            </View>
          </ImageBackground>
        </Modal>
      </Container>
    );
  }
}

RentCarScene.defaultProps = {
  saveTimeAndAddress: () => null,
  loadRentInventory: () => null,
  authUserMembership: false,
};

RentCarScene.propTypes = {
  allArea: PropTypes.object.isRequired,
  rentInventory: PropTypes.array.isRequired,
  typeOfInventory: PropTypes.array.isRequired,
  rentInfo: PropTypes.object.isRequired,
  saveTimeAndAddress: PropTypes.func,
  loadRentInventory: PropTypes.func,
  authUserMembership: PropTypes.object,
};

const mapStateToProps = createPropsSelector({
  allArea: selectAreaConfig,
  typeOfInventory: selectInventoryByType,
  rentInfo: selectRentInfo,
  rentInventory: selectRentInventory,
  authUserMembership: selectAuthUserMembership,
});

const mapDispatchToProps = (dispatch) => ({
  saveTimeAndAddress: (params) => dispatch(saveTimeAddress(params)),
  loadRentInventory: (params) => dispatch(loadRentInventoryAction(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'rentCarScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(RentCarScene);
