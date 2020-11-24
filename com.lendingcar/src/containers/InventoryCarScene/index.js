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
import PreferentialContrast from './components/PreferentialContrast';
import PaymentPart from './components/PaymentPart';
// import InstallmentPayment from './components/InstallmentPayment';
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
// import { PERCENTAGE } from './constants';
import styles from './styles';

export class InventoryCarScene extends React.Component {
  constructor(props) {
    super(props);
    const carInfo = Object.values(props.carInfoGroup[props.currentCarKey])[0];

    this.state = {
      headerOpacity: new Animated.Value(0),
      isScroll: true,
      // depositFinance: carInfo.depositFinance || {},
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
        // depositFinance: Object.values(nextProps.carInfoGroup[nextProps.currentCarKey])[0].depositFinance,
        isFirstCarId: false,
      });
    }
    // if (currentCarKey !== nextProps.currentCarKey) {
    //   this.setState({ depositFinance: Object.values(nextProps.carInfoGroup[nextProps.currentCarKey])[0].depositFinance });
    // }
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

  // header
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
      inputRange: [0, 50],
      outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
    });
    const shadowOpacity = headerOpacity.interpolate({
      inputRange: [0, 50, 51],
      outputRange: [0, 0, 1],
    });
    const elevation = headerOpacity.interpolate({
      inputRange: [0, 50, 10000],
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

  goToApplyLoan = () => {
    window.validIsLoggedIn(this.goToApplyLoanAfterLoggedIn);
  }
  goToApplyLoanAfterLoggedIn = () => {
    const { currentInfo } = this.state;
    Actions.push('applyLoan', { carInfo: currentInfo });
  }
  openCalendarModal = (pickDate) => {
    window.validIsLoggedIn(() => {
      this.openCalendarModalAfterLoggedIn(pickDate);
    });
  }
  openCalendarModalAfterLoggedIn = (pickDate) => {
    const { authUserMembership: { isMembership, status } } = this.props;
    // const { depositFinance } = this.state;

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
        Actions.push('carCalendarModal', {
          pickDate,
          // depositFinance,
        });
      }
    } else {
      Actions.push('member');
    }
  }

  // installment
  // setDepositFinance = ({ nextPercentage, nextInterestRate }) => {
  //   let { depositFinance: { percentage, interestRate } } = this.state;
  //   const { currentInfo: { price } } = this.state;
  //
  //   if (nextPercentage) percentage = nextPercentage;
  //   if (nextInterestRate) interestRate = nextInterestRate;
  //
  //   const depositFinance = window.Installment.depositFinance(price, percentage, interestRate);
  //   this.setState({ depositFinance });
  // };
  // setInterestRate = (interestRate) => {
  //   this.setDepositFinance({ nextInterestRate: interestRate });
  // }
  // setPercentage = (index) => {
  //   const percentage = PERCENTAGE[index];
  //   this.setDepositFinance({ nextPercentage: percentage });
  // };
  // setIsScroll =() => {
  //   const { isScroll } = this.state;
  //   this.setState({ isScroll: !isScroll });
  // }

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
    const iconName = isFavourited ? 'heart' : 'heart-o';
    const heartIconStyle = isFavourited ? [styles.heartIcon, styles.heartoIcon] : [styles.heartIcon];
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
          <Icon active name={iconName} type="FontAwesome" style={heartIconStyle} />
        </Button>
      </Animated.View>);
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
  renderLendingCar = (carInfo) => <PreferentialContrast carInfo={carInfo} />;
  renderPayment = (carInfo) => <PaymentPart carInfo={carInfo} goToApplyLoan={this.goToApplyLoan} />
  renderLocation = (currentArea) => <Location currentArea={currentArea} />;
  renderSimilarCars = (similarCars) => (
    <SimilarVehicles
      similarCars={similarCars}
      changeCarId={this.changeCarId}
    />
  );
  // renderInstallmentPayment = () => {
  //   const { depositFinance, currentInfo } = this.state;
  //   return (
  //     <InstallmentPayment
  //       carInfo={currentInfo}
  //       depositFinance={depositFinance}
  //       setInterestRate={this.setInterestRate}
  //       setPercentage={this.setPercentage}
  //       changeIsScroll={this.setIsScroll}
  //     />
  //   );
  // }

  renderChildrenContent = () => {
    const { areaConfig } = this.props;
    const { currentInfo } = this.state;
    const currentArea = areaConfig[currentInfo.area];
    const isShowSimilarCar = currentInfo.similarCars && currentInfo.similarCars.length > 0;
    return (
      <View>
        {this.renderCarousel(currentInfo)}
        {/* <View style={styles.separator} />
        {this.renderInstallmentPayment()} */}
        <View style={styles.separator} />
        {this.renderCarFeatures(currentInfo.carDetails)}
        <View style={styles.separator} />
        { this.renderLendingCar(currentInfo) }
        { <View style={styles.separator} /> }
        { this.renderPayment(currentInfo) }
        <View style={styles.separator} />
        {this.renderLocation(currentArea)}

        {isShowSimilarCar && <View style={styles.separator} />}
        {isShowSimilarCar && this.renderSimilarCars(currentInfo.similarCars)}
      </View>
    );
  }
  renderChildren = () => {
    const { isLoading } = this.props;
    const { isScroll } = this.state;
    return (
      <ScrollView
        ref={(scrollView) => { this.scrollView = scrollView; }}
        contentContainerStyle={styles.contentContainer}
        style={styles.content}
        scrollEventThrottle={1}
        onScroll={this.onScroll}
        scrollEnabled={isScroll}
      >
        { !isLoading && this.renderChildrenContent() }
      </ScrollView>
    );
  }

  renderFooter() {
    const { currentInfo } = this.state;
    let buttonStyles = {};
    if (currentInfo.promotion) {
      buttonStyles = { backgroundColor: currentInfo.promotion.colourCode };
    }
    return (
      <BookingFooter
        buttonPress={this.openCalendarModal}
        buttonLabel="booking"
        buttonStyles={buttonStyles}
      />
    );
  }

  render() {
    const { isLoading, favouriteError } = this.props;
    const { currentInfo, isFavourited } = this.state;
    if (!isFavourited && favouriteError) {
      window.toast(translate('unFavouriteFail'));
      this.setState({
        isFavourited: true,
      });
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
  favouriteCar: PropTypes.any,
  favouriteCarId: PropTypes.array,
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
  favouriteCar: selectFavouriteCar,
  favouriteCarId: selectFavouriteCarId,
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
