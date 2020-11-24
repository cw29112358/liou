/**
 *
 * MyNewsScene Container
 *
 */
/* global translate */
import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import moment from 'moment';
import { TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import {
  Container,
  Text,
  View,
} from 'native-base';

import { momentFormat, getImageUrl, notificationLink } from 'utils/helpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import auth from 'utils/auth';

import { loadSingleCarAction } from 'containers/InventoryCarScene/actions';

import {
  withReducer as carReducer,
} from 'containers/InventoryCarScene';

import AppHeader from 'components/AppHeader';
import EmptyList from 'components/EmptyList';
import Loader from 'components/Loader';
import CarImage from 'components/CarImage';
import SeperatorText from 'components/SeperatorText';
import NoticeModal from 'components/NoticeModal';
import Mask from 'components/Mask';

import {
  loadNotificationsAction,
  setNotificationsLastReadTimeAction,
} from './actions';
import {
  selectIsLoading,
  selectOrderNotifications,
} from './selectors';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class MyNewsScene extends React.Component {
  state={
    isFirstLoading: true,
    isShowNotice: false,
    notice: null,
  };
  scrollTask = {};
  layoutItem = {};

  componentWillMount() {
    const { notificationId } = this.props;
    this.getNotifications();
    this.onScrollTask(notificationId);
  }
  componentDidMount() {
    const { notificationsLastReadTime } = this.props;
    const currentTime = moment().unix();
    auth.set(`${currentTime}`, 'notificationLastReadTime');
    setTimeout(() => notificationsLastReadTime(currentTime), 200);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ isFirstLoading: false });
    this.onScrollTask(nextProps.notificationId);
  }
  componentWillUnmount() {
    this.onClearScrollTask();
  }

  getNotifications = () => {
    const { loadNotifications } = this.props;
    loadNotifications();
  }
  // scroll to notification
  onClearScrollTask = () => {
    this.scrollTask.cycleTimes = 0;
    clearInterval(this.scrollTask.timer);
  }
  onScrollTask = (id) => {
    if (!id || this.scrollTask.beginId === id) return;

    this.onClearScrollTask();
    this.scrollTask.beginId = id;
    this.scrollTask.timer = setInterval(() => {
      this.scrollTask.cycleTimes += 1;
      if (this.scrollTask.endId === this.scrollTask.beginId // 任务结束
        || this.scrollTask.cycleTimes > 20 // 任务时间超过10s
      ) {
        this.onClearScrollTask();
      }
      this.onScrollToNotification(id);
    }, 500);
  }
  onScrollToNotification = (id) => {
    const index = this.getNotificationIndex(id);
    const layout = this.layoutItem[index];
    if (!layout) return;

    const { y } = layout;
    if (!this.scrollView) return;

    this.scrollTask.endId = id;
    this.scrollView.scrollTo({ x: 0, y, animated: false });
  }
  onLayoutItem = (e, index) => {
    this.layoutItem[index] = e.nativeEvent.layout;
  }
  getNotificationIndex = (id) => {
    const { notifications } = this.props;
    const index = notifications.findIndex((item) => (
      this.getItemId(item) === id
    ));
    return index;
  }
  getItemId = (item) => item.id || item._id; //eslint-disable-line

  onTouchMyNewsItem = (item) => {
    const { loadSingleCarInfo } = this.props;
    if (item.promotionImages.length > 0) {
      this.setState({
        isShowNotice: true,
        notice: item,
      });
    } else if (item.type === 'car' && item.carId) {
      loadSingleCarInfo(item.carId, 0);
      Actions.inventoryCar({ carId: item.carId });
    } else {
      notificationLink(item.promotionUrl);
    }
  }

  closeNotice = () => {
    this.setState({ isShowNotice: false });
  }

  renderTag = (value, label) => (
    <View style={styles.tag}>
      <Text style={styles.tagText}>
        {translate(value, 'dollar', styles.priceStyle)}
        {` ${translate(label)}`}
      </Text>
    </View>
  )
  renderTime = (createdTime) => (<Text style={styles.time}>{ momentFormat(createdTime)}</Text>)
  renderImage = (firstImage, type, carId) => {
    const imageStyles = (type === 'car' || carId) ? styles.padImage : styles.notMask;
    return (
      firstImage && (
        <CarImage url={firstImage} style={imageStyles} />
      )
    );
  }
  renderItemTitle = (title, createdTime) => (
    <View style={styles.titleLine}>
      {title && <Text style={styles.padTitle} numberOfLines={1}>{title}</Text>}
      { this.renderTime(createdTime) }
    </View>
  )
  renderContentLeft = (item, firstImage) => {
    const { type, carId } = item;
    let numberOfLines = 3;
    if (type === 'car' || carId)numberOfLines = 2;

    const messageStyles = [styles.padNote];
    if (!firstImage) messageStyles.push(styles.noImage);
    if (type === 'car' || carId) messageStyles.push(styles.carText);
    return (
      <View style={styles.contentLeft}>
        {item.message && <Text style={messageStyles} numberOfLines={numberOfLines}>{item.message}</Text>}
        {(item.carId || item.type === 'car') && (
          <View style={styles.tagLine}>
            {this.renderTag(item.metadata.price, 'startPay')}
          </View>
        )}
      </View>
    );
  }

  renderItemContent = (item) => {
    const {
      images = [], metadata = { images: [] }, type, carId,
    } = item;
    const firstImage = (images[0] && getImageUrl(images[0])) || metadata.images[0];

    return (
      <View style={styles.content}>
        { this.renderImage(firstImage, type, carId) }
        { this.renderContentLeft(item, firstImage) }
      </View>
    );
  }

  renderList(item, index) {
    const { title, createdTime } = item;
    const itemStyle = [styles.padItem];
    return (
      <View style={itemStyle} onLayout={(e) => { this.onLayoutItem(e, index); }}>
        {this.renderItemTitle(title, createdTime)}
        {this.renderItemContent(item)}
      </View>
    );
  }

  renderNotifications(notifications, isLoading) {
    if (!notifications.length && !isLoading) return <EmptyList label="noMessage" />;
    return notifications
      .map((item, index) => {
        const activeOpacity = item.carId ? 0.3 : 1;

        return (
          <TouchableOpacity
            key={this.getItemId(item)}
            onPress={() => this.onTouchMyNewsItem(item)}
            activeOpacity={activeOpacity}
            style={styles.touchableOpacity}
          >
            {this.renderList(item, index)}
          </TouchableOpacity>
        );
      });
  }
  renderContent = () => {
    const { notifications, isLoading } = this.props;
    const { isFirstLoading } = this.state;
    return (
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={isLoading && !isFirstLoading}
            onRefresh={this.getNotifications}
            title={translate('loading')}
          />
        )}
        ref={(scrollView) => { this.scrollView = scrollView; }}
      >
        { this.renderNotifications(notifications, isLoading) }
        { (!isLoading && notifications.length > 0) && <SeperatorText label="noNews" showSeperate="true" />}
      </ScrollView>
    );
  }
  render() {
    const { isLoading } = this.props;
    const { isFirstLoading, isShowNotice, notice } = this.state;
    return (
      <Container>
        <AppHeader
          title="myNews"
          hasRight={false}
          hiddenBorder={false}
          headerContainer={styles.headerContainer}
        />
        { (isLoading && isFirstLoading) && <Loader />}
        { this.renderContent()}
        { isShowNotice && (
          <NoticeModal
            isShowNotice={isShowNotice}
            onClose={this.closeNotice}
            notice={notice}
          />
        )}
        { isShowNotice && <Mask onPress={() => this.closeNotice()} />}
      </Container>
    );
  }
}

MyNewsScene.defaultProps = {
  notificationId: '',
};

MyNewsScene.propTypes = {
  notificationId: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  notifications: PropTypes.array.isRequired,
  loadSingleCarInfo: PropTypes.func.isRequired,
  loadNotifications: PropTypes.func.isRequired,
  notificationsLastReadTime: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
  notifications: selectOrderNotifications,
});

const mapDispatchToProps = (dispatch) => ({
  loadSingleCarInfo: (carId, key) => dispatch(loadSingleCarAction(carId, key)),
  loadNotifications: () => dispatch(loadNotificationsAction()),
  notificationsLastReadTime: (time) => dispatch(setNotificationsLastReadTimeAction(time)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'myNewsScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  carReducer,
  withConnect,
)(MyNewsScene);
