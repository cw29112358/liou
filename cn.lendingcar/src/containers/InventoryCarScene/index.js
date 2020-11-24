/**
 *
 * InventoryCarScene Container
 *
 */
/* global window translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { Animated, ScrollView } from 'react-native';
import {
  Container,
  View,
  Button,
  Icon,
} from 'native-base';
import { remove } from 'lodash';

import { setCarFilterConfig } from 'apis/strapi';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  selectAuthUserMembership,
  selectFavouriteCar,
  selectFavouriteCarId,
  selectIsFavouriteError,
} from 'containers/AppRouter/selectors';
import { updateFavouriteCarAction } from 'containers/AppRouter/actions';
import { selectAreaConfig } from 'containers/HomeScene/selectors';
import { selectFilterData } from 'containers/InventoryScene/selectors';

import Loader from 'components/Loader';
import BookingFooter from 'components/BookingFooter';

import ConfigurationModal from './components/ConfigurationModal';
import Location from './components/Location';
import CarouselImages from './components/CarouselImages';
import ConfigurationInfo from './components/ConfigurationInfo';
import CarFeatures from './components/CarFeatures';
import SimilarVehicles from './components/SimilarVehicles';
import InstallmentPayment from './components/InstallmentPayment';
import {
  selectGetCarIdKey,
  selectIsLoading,
  selectCarInfoGroup,
} from './selectors';
import {
  loadCarDetailAction,
  loadSingleCarAction,
} from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class InventoryCarScene extends React.Component {
  constructor(props) {
    super(props);
    const carInfo = Object.values(props.carInfoGroup[props.currentCarKey])[0];

    this.state = {
      headerOpacity: new Animated.Value(0),
      currentInfo: carInfo,
      isFirstCarId: true,
      isFavourited: false,
    };
  }
  componentWillMount() {
    const {
      carInfoGroup,
      filterData, isSetFilterConfig,
      loadCarDetail, currentCarKey,
      carId, loadSingleCar, favouriteCarId,
    } = this.props;
    const { currentInfo, isFirstCarId } = this.state;
    if (currentCarKey <= 0 && carInfoGroup.length > 0) {
      if (carId && isFirstCarId) {
        loadSingleCar(carId, currentCarKey);
      } else {
        loadCarDetail(currentInfo, currentCarKey);
      }
    }
    if (isSetFilterConfig) {
      window.validIsLoggedIn(() => {
        setCarFilterConfig(filterData);
      }, false);
    }
    this.setState({
      isFavourited: favouriteCarId.includes(currentInfo.id),
    });
  }
  componentWillReceiveProps(nextProps) {
    const {
      currentCarKey, carInfoGroup, loadCarDetail, carId,
    } = this.props;
    const { isFirstCarId } = this.state;
    if (carId && isFirstCarId) {
      this.setState({
        currentInfo: Object.values(nextProps.carInfoGroup[nextProps.currentCarKey])[0],
        isFirstCarId: false,
      });
    }
    if (nextProps.currentCarKey !== currentCarKey && carInfoGroup.length - 1 > nextProps.currentCarKey) {
      loadCarDetail(Object.values(carInfoGroup[nextProps.currentCarKey])[0], currentCarKey);
    }
    if (this.scrollView && nextProps.currentCarKey >= currentCarKey && currentCarKey > this.getCarRoutes().length - 1) {
      this.scrollView.scrollTo({ x: 0, y: 0, animated: false });
    }
  }

  shouldComponentUpdate() {
    const { currentCarKey } = this.props;

    if (this.getCarRoutes().length === 1) {
      return true;
    }
    if (currentCarKey < this.getCarRoutes().length - 1) {
      return false;
    }
    return true;
  }

  getCarRoutes = () => Actions._state.routes // eslint-disable-line
    .filter((item) => item.routeName === 'inventoryCar');

  onScroll = (event) => {
    const { headerOpacity } = this.state;
    const scrollY = event.nativeEvent.contentOffset.y;
    Animated.timing(headerOpacity, {
      toValue: scrollY,
      duration: 50,
    }).start();
  }
  getHeaderStyles() {
    const {
      headerOpacity,
    } = this.state;
    const backgroundColor = headerOpacity.interpolate({
      inputRange: [0, 100],
      outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
    });
    const shadowOpacity = headerOpacity.interpolate({
      inputRange: [0, 100, 101],
      outputRange: [0, 1, 1],
    });
    const elevation = headerOpacity.interpolate({
      inputRange: [0, 100, 10000],
      outputRange: [0, 3, 3],
    });
    const animatedCarStyles = {
      backgroundColor,
      shadowOpacity,
      elevation,
    };
    return animatedCarStyles;
  }

  changeCarId = (carInfo) => {
    const { loadCarDetail, currentCarKey } = this.props;
    loadCarDetail(carInfo, currentCarKey + 1);
    Actions.inventoryCar({ carInfo });
  }

  openFeaturesModal = () => {
    Actions.modal({
      component: ConfigurationModal,
      headerStyle: { marginTop: 18 },
      scrollEnabled: true,
    });
  }

  openCalendarModal = (pickDate) => {
    window.validIsLoggedIn(() => {
      this.openCalendarModalAfterLoggedIn(pickDate);
    });
  }
  openCalendarModalAfterLoggedIn = (pickDate) => {
    const { currentInfo } = this.state;
    const { authUserMembership: { isMembership, status } } = this.props;
    if (isMembership) {
      if (status === 'active') {
        window.alert(
          null,
          'validMembershipStatus',
          [
            {
              text: 'confirm',
            },
          ],
        );
      } else {
        Actions.push('carCalendarModal', { pickDate, carInfo: currentInfo });
      }
    } else {
      Actions.push('member');
    }
  }

  onPressBack = () => {
    Actions.pop();
  }
  onPressHeart = () => {
    window.validIsLoggedIn(this.onPressHeartAfterLoggedIn);
  }
  onPressHeartAfterLoggedIn = () => {
    const {
      favouriteCar,
      updateFavouriteCar,
    } = this.props;
    const { isFavourited, currentInfo } = this.state;

    const deletedCar = [...favouriteCar];
    this.setState({
      isFavourited: !isFavourited,
    });
    if (isFavourited) {
      window.toast(translate('unFavourite'));
      remove(deletedCar, (item) => item.id === currentInfo.id);
    } else {
      window.toast(translate('favouriteSuccess'));
    }
    updateFavouriteCar([currentInfo.id], deletedCar, favouriteCar);
  }
  renderHeader() {
    const headerStyle = [
      styles.header,
      this.getHeaderStyles(),
      styles.headerShadow,
    ];
    const { isFavourited } = this.state;
    const heartIconStyles = [styles.heartIcon];
    if (isFavourited) {
      heartIconStyles.push(styles.activeHeart);
    }
    return (
      <Animated.View style={headerStyle}>
        <Button
          transparent
          style={styles.button}
          onPress={this.onPressBack}
        >
          <Icon active name="ios-arrow-back" style={styles.backIcon} />
        </Button>
        <Button
          transparent
          style={styles.buttonHeart}
          onPress={this.onPressHeart}
        >
          <Icon active name="heart" type="FontAwesome" style={heartIconStyles} />
        </Button>
      </Animated.View>
    );
  }

  renderCarousel = (carInfo) => (
    <View>
      <CarouselImages carData={carInfo} />
      <ConfigurationInfo carInfo={carInfo} />
    </View>
  );
  renderCarFeatures = (carDetails) => (
    <CarFeatures
      carDetails={carDetails}
      showDetails={this.openFeaturesModal}
    />
  );
  renderLocation = (currentArea) => <Location currentArea={currentArea} />;
  renderSimilarCars = (similarCars) => (
    <SimilarVehicles
      similarCars={similarCars}
      changeCarId={this.changeCarId}
    />
  );
  renderInstallmentPayment = () => (
    <InstallmentPayment />
  );

  renderChildrenContent = () => {
    const { areaConfig } = this.props;
    const { currentInfo } = this.state;
    const currentArea = areaConfig[currentInfo.area];
    const isShowSimilarCar = currentInfo.similarCars && currentInfo.similarCars.length > 0;
    return (
      <View>
        {this.renderCarousel(currentInfo)}
        <View style={styles.separator} />
        {/* this.renderInstallmentPayment()
        <View style={styles.separator} /> */}
        {this.renderCarFeatures(currentInfo.carDetails)}

        <View style={styles.separator} />
        {this.renderLocation(currentArea)}

        {isShowSimilarCar && <View style={styles.separator} />}
        {isShowSimilarCar && this.renderSimilarCars(currentInfo.similarCars)}
      </View>
    );
  }
  renderChildren = () => {
    const { isLoading } = this.props;
    return (
      <ScrollView
        ref={(scrollView) => { this.scrollView = scrollView; }}
        contentContainerStyle={styles.contentContainer}
        style={styles.content}
        scrollEventThrottle={1}
        onScroll={this.onScroll}
      >
        { !isLoading && this.renderChildrenContent() }
      </ScrollView>
    );
  }

  renderFooter() {
    return (
      <BookingFooter
        buttonPress={this.openCalendarModal}
        buttonLabel="pickupDate"
      />
    );
  }

  render() {
    const { isLoading, favouriteError } = this.props;
    const { currentInfo, isFavourited } = this.state;
    if (!isFavourited && favouriteError) {
      if (favouriteError) {
        window.toast(translate('unFavouriteFail'));
        this.setState({
          isFavourited: true,
        });
      }
    } else if (isFavourited && favouriteError) {
      window.toast(translate('favouriteFail'));
      this.setState({
        isFavourited: false,
      });
    }
    return (
      <Container>
        { (!currentInfo || isLoading) && <Loader /> }
        {this.renderHeader()}

        {this.renderChildren()}

        {this.renderFooter()}
      </Container>
    );
  }
}

InventoryCarScene.defaultProps = {
  isLoading: true,
  carId: '',
  carInfoGroup: [],
  currentCarKey: 0,
  areaConfig: null,
  filterData: null,
  favouriteCarId: [],
  favouriteCar: [],
  favouriteError: false,
  isSetFilterConfig: false,
  loadCarDetail: () => null,
  loadSingleCar: () => null,
  updateFavouriteCar: () => null,
};

InventoryCarScene.propTypes = {
  authUserMembership: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  carId: PropTypes.string,
  carInfoGroup: PropTypes.array,
  currentCarKey: PropTypes.number,
  areaConfig: PropTypes.object,
  filterData: PropTypes.object,
  favouriteCarId: PropTypes.array,
  favouriteCar: PropTypes.any,
  favouriteError: PropTypes.bool,
  isSetFilterConfig: PropTypes.bool,
  loadCarDetail: PropTypes.func,
  loadSingleCar: PropTypes.func,
  updateFavouriteCar: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  authUserMembership: selectAuthUserMembership,
  isLoading: selectIsLoading,
  carInfoGroup: selectCarInfoGroup,
  currentCarKey: selectGetCarIdKey,
  areaConfig: selectAreaConfig,
  filterData: selectFilterData,
  favouriteCarId: selectFavouriteCarId,
  favouriteCar: selectFavouriteCar,
  favouriteError: selectIsFavouriteError,
});

const mapDispatchToProps = (dispatch) => ({
  loadCarDetail: (carInfo, key) => dispatch(loadCarDetailAction(carInfo, key)),
  loadSingleCar: (carId, key) => dispatch(loadSingleCarAction(carId, key)),
  updateFavouriteCar: (carId, deletedCar, initialCar) => dispatch(updateFavouriteCarAction(carId, deletedCar, initialCar)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'inventoryCarScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(InventoryCarScene);
