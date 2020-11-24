/**
 *
 * RentScene Container
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
import {
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Text,
  View,
  Picker,
  Button,
  Icon,
} from 'native-base';
import moment from 'moment';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import auth from 'utils/auth';
import variables from 'platform';

// import { logoutByUserAction, getFavouriteCarAction } from 'containers/AppRouter/actions';
import {
  selectAuthUserInfo,
  selectIsLoggedIn,
} from 'containers/AppRouter/selectors';
import {
  loadInventoryAction,
  // changeFilterAction,
} from 'containers/InventoryScene/actions';
// import {
//   selectIsLoading,
//   selectAllInventory,
//   selectInventoryByType,
//   selectFilterData,
// } from 'containers/InventoryScene/selectors';
import {
  withReducer as newsReducer,
  withSagas as newsWithSagas,
} from 'containers/MyNewsScene';
import {
  // selectNotice,
  selectNotificationListIsRead,
} from 'containers/MyNewsScene/selectors';
// import {
//   loadNotificationsAction,
//   setNotificationsLastReadTimeAction,
// } from 'containers/MyNewsScene/actions';
import {
  withReducer as versionReducer,
  withSagas as versionSagas,
} from 'containers/VersionScene';
// import {
//   loadAppVersionAction,
// } from 'containers/VersionScene/actions';
// import {
//   selectVersionInfo,
// } from 'containers/VersionScene/selectors';

import {
  selectAreaConfig,
  selectArea,
} from 'containers/HomeScene/selectors';
import HomeHeader from './components/HomeHeader';
import AreaSelectModal from './components/AreaSelectModal';

import {
  selectRentInfo,
  // selectRentInventory,
} from './selectors';
import { RENT_CONTENT, RENT_FORM_CONTEXT } from './constants';
import {
  saveTimeAddress,
  // loadRentInventoryAction,
} from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

const { isIOS } = variables;

export class RentScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      isShowSelectModal: false, // 左上角弹框显隐
      pickupTimeVisible: false, // 取车时间的弹框显隐
      returnTimeVisible: false, // 还车时间弹框的显隐
      pickupTime: moment().add(2, 'days').format('YYYY/MM/DD 09:00'), // 取车时间
      returnTime: moment().add(9, 'days').format('YYYY/MM/DD 09:00'), // 还车时间
      pickupAddress: props.currentArea, // 取车地点
      returnAddress: props.currentArea, // 还车地点
    };
  }
  // componentDidMount() {
  //   const { currentArea, loadRentInventory } = this.props;
  //   const { pickupTime, returnTime } = this.state;
  //   // 加载短租车列表
  //   loadRentInventory({
  //     forceReload: true,
  //     area: currentArea,
  //     pickupTime,
  //     returnTime,
  //   });
  // }
  // 点击左上角地点事件，点击后切换区域选择弹窗显隐
  changeSelectModal = () => {
    const { isShowSelectModal } = this.state;
    this.setState({ isShowSelectModal: !isShowSelectModal });
  }
  // 左上角改变区域的事件，根据选择的区域、取车时间、还车时间重新获取短租车列表
  changeArea = (item) => {
    const { loadInventory } = this.props;
    loadInventory({ forceReload: true, area: item });
    // 关闭左上角区域选择弹窗
    this.changeSelectModal();
  }
  // 打开时间选择器
  handleTimePickerModal = (type) => {
    this.setState({ [type]: true });
  }
  // 选择取车时间和还车时间的事件
  handleTimePickerConfirm = (date, timeType) => {
    const { returnTime } = this.state;
    // let dateTime;
    // // 如果选择的时间比当前时间至少多一天，则赋值取车时间或者还车时间，否则为用户操作无效，关闭时间选择弹窗
    // if (date.valueOf() >= moment().add(1, 'days').valueOf()) {
    //   if (isIOS) {
    //     dateTime = moment(confirmDate).format('YYYY/MM/DD HH:mm');
    //   } else {
    //     dateTime = moment(confirmDate).format('YYYY/MM/DD HH:00');
    //   }
    // } else {
    //   this.setState({
    //     pickupTimeVisible: false,
    //     returnTimeVisible: false,
    //   });
    //   return;
    // }
    // 如果是操作选择取车时间
    if (timeType === 'pickupTime') {
      // 如果选择的时间比还车时间大，则相应修改还车时间
      if (date.valueOf() >= moment(new Date(returnTime)).valueOf()) {
        const iosTime = moment(date).add(7, 'days').format('YYYY/MM/DD HH:mm');
        const androidTime = moment(date).add(7, 'days').format('YYYY/MM/DD HH:00');
        this.setState({
          returnTime: isIOS ? iosTime : androidTime,
        });
      }
    }

    // 如果选择的时间晚于晚上9点或者早于早上9点，则跳弹窗给提示，否则赋值选择的时间
    if (moment(date).format('HH') > 21 || moment(date).format('HH') < 9) {
      if (timeType === 'pickupTime') {
        this.setState({
          pickupTimeVisible: false,
        }, () => window.toast(translate('timeLimitInfo')));
      } else {
        this.setState({
          returnTimeVisible: false,
        }, () => window.toast(translate('timeLimitInfo')));
      }
    } else {
      if (timeType === 'pickupTime') {
        this.setState({ pickupTimeVisible: false });
      } else {
        this.setState({ returnTimeVisible: false });
      }
      this.setState({
        [timeType]: isIOS ? moment(date).format('YYYY/MM/DD HH:mm') : moment(date).format('YYYY/MM/DD HH:00'),
      });
    }
  }
  // 点击立即租车事件
  handleRent = () => {
    const {
      pickupTime, returnTime, pickupAddress, returnAddress,
    } = this.state;
    const { saveTimeAndAddress } = this.props;
    const result = {
      pickupTime,
      returnTime,
      pickupAddress,
      returnAddress,
    };
    // 保存两个时间和两个地点在 rentScene 的 rentInfo 中
    // 还车时间选择器的默认值存入store，便于短租列表页面还车时间选择器使用
    saveTimeAndAddress(result);
    // 跳转短租车列表页面
    Actions.push('rentCar');
  }

  // 左上角选择地址弹框内容
  renderAreaSelect = (area) => {
    const { currentArea } = this.props;
    return (
      <AreaSelectModal
        changeSelectModal={this.changeSelectModal}
        area={area}
        currentArea={currentArea}
        changeArea={this.changeArea}
      />
    );
  }

  renderHeader = (area) => {
    const {
      currentArea, authUser, notificationIsRead, isLoggedIn,
    } = this.props;
    return (
      <HomeHeader
        currentArea={currentArea}
        area={area}
        goToProfileCenter={this.goToProfileCenter}
        changeSelectModal={this.changeSelectModal}
        notificationIsRead={notificationIsRead}
        isLoggedIn={isLoggedIn}
        authUser={authUser}
      />
    );
  };
  // 短租、一天起灵活租车
  renderContent = (content) => {
    const { title, tips } = content;
    return (
      <View style={styles.content}>
        <Text style={styles.contentTitle}>{translate(title)}</Text>
        <Text style={styles.contentText}>{translate(tips)}</Text>
      </View>
    );
  }
  // 车图片
  renderImage = (content) => {
    const { imgName } = content;
    return (
      <Image source={imgName} resizeMode="contain" style={styles.image} />
    );
  }
  // 选择区域dom
  renderPlaceSelect = () => {
    const { allArea } = this.props;
    const {
      pickupLocation,
      returnLocation,
      back,
      selectPlace,
    } = RENT_FORM_CONTEXT;
    const { pickupAddress, returnAddress } = this.state;
    return (
      <View>
        <Text style={styles.addressText}>{translate(pickupLocation)}</Text>
        <View style={styles.addressPicker}>
          <Picker
            style={styles.pickerHeight}
            selectedValue={pickupAddress}
            onValueChange={(val) => this.setState({ pickupAddress: val })}
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
                style={styles.careDown}
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
            onValueChange={(val) => this.setState({ returnAddress: val })}
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
                style={styles.careDown}
                type="AntDesign"
              />
            )
          }
        </View>
      </View>
    );
  }
  // 选择时间dom
  renderTimeSelect = () => {
    const {
      pickupTimeTips, returnTimes, pickupTimeHeader, returnTimeHeader, returnTimeHeadBottom,
    } = RENT_FORM_CONTEXT;
    const {
      pickupTime, returnTime, pickupTimeVisible, returnTimeVisible,
    } = this.state;
    return (
      <View style={styles.timeBox}>
        <View style={styles.selectTime}>
          <Text style={[styles.addressText, { width: 200 }]}>{translate(pickupTimeTips)}</Text>
          <TouchableOpacity onPress={() => this.handleTimePickerModal('pickupTimeVisible')}>
            <View style={styles.timePicker}>
              <Text>{pickupTime.slice(5, pickupTime.length)}</Text>
              <DateTimePicker
                is24Hour
                mode="datetime"
                isVisible={pickupTimeVisible}
                minuteInterval={30}
                date={new Date(pickupTime)}
                titleIOS={translate(pickupTimeHeader)}
                titleStyle={styles.timePickerTitle}
                onCancel={() => this.setState({ pickupTimeVisible: false })}
                minimumDate={new Date(moment().add(2, 'days').format('YYYY/MM/DD 09:00').valueOf())}
                maximumDate={new Date(moment().add(1, 'years').format('YYYY/MM/DD 21:00').valueOf())}
                onConfirm={(date) => this.handleTimePickerConfirm(date, 'pickupTime')}
                cancelTextIOS={translate('cancel')}
                confirmTextIOS={translate('confirm')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.centerBox}>
          <Icon name="caretright" style={{ fontSize: 12 }} type="AntDesign" />
          <Text style={styles.addressTextConcat}>
            {`${Math.ceil(moment(new Date(returnTime)).diff(moment(new Date(pickupTime)), 'day', true))}${translate('day')}`}
          </Text>
        </View>
        <View style={styles.selectTime}>
          <Text style={styles.addressText}>{translate(returnTimes)}</Text>
          <TouchableOpacity onPress={() => this.handleTimePickerModal('returnTimeVisible')}>
            <View style={styles.timePicker}>
              <Text>{returnTime.slice(5, returnTime.length)}</Text>
              <DateTimePicker
                is24Hour
                mode="datetime"
                isVisible={returnTimeVisible}
                minuteInterval={30}
                customTitleContainerIOS={(
                  <View style={styles.returnTimeHead}>
                    <Text style={styles.returnTimeHeadTop}>
                      {translate(returnTimeHeader)}
                    </Text>
                    <Text style={styles.returnTimeHeadBody}>
                      {`${Math.ceil(moment(new Date(returnTime)).diff(moment(new Date(pickupTime)), 'day', true))}${translate('day')}`}
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
                maximumDate={new Date(moment(new Date(pickupTime)).add(1, 'years').format('YYYY/MM/DD 21:00').valueOf())}
                onConfirm={(date) => this.handleTimePickerConfirm(date, 'returnTime')}
                cancelTextIOS={translate('cancel')}
                confirmTextIOS={translate('confirm')}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  // 立即租车按钮
  renderBottomPart = () => {
    const { rentNow } = RENT_FORM_CONTEXT;
    return (
      <View style={styles.bottomPart}>
        <Button rounded style={styles.bottomBtn} onPress={() => this.handleRent()}>
          <Text style={styles.bottomBtnText}>{translate(rentNow)}</Text>
        </Button>
      </View>
    );
  }
  renderRentForm = () => (
    <View style={styles.rentForm}>
      {this.renderPlaceSelect()}
      {this.renderTimeSelect()}
      {this.renderBottomPart()}
      {this.renderBottomTips()}
    </View>
  )
  // footer
  renderBottomTips = () => {
    const { buttonPrivilege, rentTipsDescription } = RENT_FORM_CONTEXT;
    return (
      <View style={styles.bottomText}>
        <TouchableOpacity onPress={() => Actions.push('member')}>
          <Text style={styles.colorText}>{translate(buttonPrivilege)}</Text>
        </TouchableOpacity>
        <Text style={styles.normalText}>{translate(rentTipsDescription)}</Text>
      </View>
    );
  }
  render() {
    const { allArea } = this.props;
    const area = Object.keys(allArea);
    const { isShowSelectModal } = this.state;
    return (
      <Container>
        <ImageBackground {...styles.bgImageProps}>
          {this.renderHeader(area)}
          {this.renderContent(RENT_CONTENT)}
          {this.renderImage(RENT_CONTENT)}
          {this.renderRentForm()}
          {isShowSelectModal && this.renderAreaSelect(area)}
        </ImageBackground>
      </Container>
    );
  }
}

RentScene.defaultProps = {
  isLoggedIn: false,
  notificationIsRead: false,
  saveTimeAndAddress: false,
  rentInfo: {},
  loadInventory: false,
  // isLoading: true,
  // notice: null,
  // loadInventory: false,
  // area: 'bayArea',
  // loadRentInventory: false,
};

// 父级props
// 自身 mapStateToProps => other selectors => self selectors
// 自身 mapDispatchToProps
RentScene.propTypes = {
  allArea: PropTypes.object.isRequired,
  currentArea: PropTypes.string.isRequired,
  authUser: PropTypes.object.isRequired,
  notificationIsRead: PropTypes.any,
  saveTimeAndAddress: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  rentInfo: PropTypes.object,
  loadInventory: PropTypes.func,
  // area: PropTypes.string,
  // isLoading: PropTypes.bool,
  // inventories: PropTypes.array.isRequired,
  // typeOfInventory: PropTypes.array.isRequired,
  // filterData: PropTypes.object.isRequired,
  // notice: PropTypes.object,
  // versionInfo: PropTypes.object.isRequired,
  // loadInventory: PropTypes.func,
  // loadRentInventory: PropTypes.func,

};

const mapStateToProps = createPropsSelector({
  authUser: selectAuthUserInfo,
  allArea: selectAreaConfig,
  currentArea: selectArea,
  notificationIsRead: selectNotificationListIsRead,
  isLoggedIn: selectIsLoggedIn,
  rentInfo: selectRentInfo,
  // isLoading: selectIsLoading,
  // inventories: selectAllInventory,
  // typeOfInventory: selectInventoryByType,
  // filterData: selectFilterData,
  // notice: selectNotice,
  // versionInfo: selectVersionInfo,
  // rentInfo: selectRentInfo,
  // rentInventory: selectRentInventory,
});

const mapDispatchToProps = (dispatch) => ({
  // logout: () => dispatch(logoutByUserAction()),
  // loadInventory: (params) => dispatch(loadInventoryAction(params)),
  // changeFilter: (name, value) => dispatch(changeFilterAction(name, value)),
  // loadNotifications: () => dispatch(loadNotificationsAction()),
  // getFavouriteCar: () => dispatch(getFavouriteCarAction()),
  // notificationsLastReadTime: (time) => dispatch(setNotificationsLastReadTimeAction(time)),
  // loadAppVersion: () => dispatch(loadAppVersionAction()),
  // loadRentInventory: (params) => dispatch(loadRentInventoryAction(params)),
  saveTimeAndAddress: (params) => dispatch(saveTimeAddress(params)),
  loadInventory: (params) => dispatch(loadInventoryAction(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'rentScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  newsReducer,
  versionReducer,
  ...withSagas,
  ...newsWithSagas,
  ...versionSagas,
  withConnect,
)(RentScene);
