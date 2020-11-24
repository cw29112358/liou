/*
 *
 * CarPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { purchaseCarAction, changeCalculatorAction } from 'containers/App/actions';
import { selectTerm, selectCurrentAreaConfig } from 'containers/App/selectors';
import { selectLocale } from 'containers/LanguageProvider/selectors';
import { formatMessage } from 'components/TranslatedMessage';
// import { trackEvent } from 'utils/helpers';
import PathBar from 'components/PathBar';
import Loader from 'components/Loader';
import {
  // selectSelectedCar,
  selectCalculatedCar,
  selectSelectedCarImages,
  selectRecommendationFromInventory,
  selectBookingDetails,
  // selectSelectedCarCurPlan,
  // selectCurPlanCategory,
  selectIsLoading,
} from './selectors';
import { changePlanAction, changePlanCategoryAction } from './actions';
import CarDetail from './components/CarDetail';
import messages from './messages';
import './style.scss';

export class CarPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const area = sessionStorage.getItem('area') || 'bayArea';
    // const passengers = sessionStorage.getItem('passengers') || 1;
    const size = sessionStorage.getItem('size') || 'all';
    const date = sessionStorage.getItem('date') || new Date().toISOString();
    const term = sessionStorage.getItem('term') || 1;
    this.props.changeCalculator({ area, size, date, term });
  }

  // componentDidMount() {
  //   const setUpImages = () => {
  //     const slider = new window.MasterSlider();
  //     slider.control('scrollbar', {
  //       dir: 'h',
  //     });
  //     slider.control('thumblist', {
  //       autohide: false,
  //       dir: 'v',
  //       arrows: false,
  //       align: 'left',
  //       width: 127,
  //       height: 84,
  //       margin: 5,
  //       space: 5,
  //       hideUnder: 300,
  //     });
  //     slider.setup('masterslider', {
  //       width: 540,
  //       height: 586,
  //       space: 5,
  //     });
  //   };
  //   const interval = setInterval(() => {
  //     if (this.props.carImages.length) {
  //       clearInterval(interval);
  //       setUpImages();
  //       const { locale, carData } = this.props;
  //       const { make, model } = carData;
  //       const referralCode = window.localStorage.referralCode;
  //       trackEvent({
  //         eventName: 'Car Page',
  //         eventData: {
  //           make,
  //           model,
  //           referralCode,
  //           locale,
  //         },
  //       });
  //     }
  //   }, 50);
  // }

  translatedTitle = formatMessage(this.props.intl, messages, this.props.route.name);

  renderHelmet = () => <Helmet
    title={this.translatedTitle}
    meta={[{ name: 'description', content: 'Car details' }]}
  />;

  render() {
    const currHeight = document.body.clientHeight - 132;
    const style = isMobile ? { } : { minHeight: currHeight };
    let container;
    if (this.props.isLoading) container = <Loader />;
    else {
      container = (
        <div className="container page-container">
          <div className="path-bar"><PathBar {...this.props} /></div>
          <div className="car-detail-div" style={style}>
            <CarDetail {...this.props} intl={this.props.intl} />
          </div>
        </div>
      );
    }

    return (
      <div className="car-page" style={{ backgroundColor: '#FFF' }}>
        {this.renderHelmet()}
        { container }
      </div>
    );
  }
}

CarPage.propTypes = {
  intl: PropTypes.object,
  route: PropTypes.object,
  // carData: PropTypes.object,
  // carImages: PropTypes.array,
  // locale: PropTypes.string,
  isLoading: PropTypes.bool,
  changeCalculator: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  carData: selectCalculatedCar,
  carImages: selectSelectedCarImages,
  locale: selectLocale,
  term: selectTerm,
  recommendedCars: selectRecommendationFromInventory,
  bookingDetails: selectBookingDetails,
  isLoading: selectIsLoading,
  currentAreaConfig: selectCurrentAreaConfig,
});

function mapDispatchToProps(dispatch) {
  return {
    purchaseCar: (carData, locale) => dispatch(purchaseCarAction(carData, locale)),
    changePlan: (index) => dispatch(changePlanAction(index)),
    changePlanCategory: (type) => dispatch(changePlanCategoryAction(type)),
    changeCalculator: (calculator) => dispatch(changeCalculatorAction(calculator)),
    linkTo: (url) => dispatch(push(url)),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CarPage));
