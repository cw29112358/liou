/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

 import React from 'react';
 // import PropTypes from 'prop-types';
 import { connect } from 'react-redux';
 // import { FormattedMessage } from 'react-intl';
 import { push } from 'react-router-redux';
 import { createPropsSelector } from 'reselect-immutable-helpers';
 import { selectTerm, selectCalculator } from 'containers/App/selectors';
 import { selectLocale } from 'containers/LanguageProvider/selectors';
 import { purchaseCarAction, changeCalculatorAction } from 'containers/App/actions';
 import ShowcaseCars from './components/ShowcaseCars';
 // import TextBlock from './components/TextBlock';
 // import InfoBlock2 from './components/InfoBlock2';
 // import InfoBlock1 from './components/InfoBlock1';
 // import InfoBlock21 from './components/InfoBlock21';
 // import InfoBlock11 from './components/InfoBlock11';
 import InfoBlock12 from './components/InfoBlock12';
 // import InfoBlock12M from './components/InfoBlock12M';
 // import ImagesBlock from './components/ImagesBlock';
 // import InfoBlock from './components/InfoBlock';
 import MainImage from './components/MainImage';
 // import ColorBlock from './components/ColorBlock';
 import * as selectors from './selectors';

 export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
   constructor(props) {
     super(props);
     this.state = {
       carType: 'All',
     };
     this.changeCarType = this.changeCarType.bind(this);
   }

   changeCarType(carType) {
     this.setState({ carType });
   }

   render() {
     return (
       <div >
         <MainImage
           {...this.props}
           changeCarType={this.changeCarType} selectedCarType={this.state.carType}
         />
         <InfoBlock12 {...this.props} />
         <ShowcaseCars {...this.props} />
       </div>
     );
   }
 }

 HomePage.propTypes = {
 };

 const mapStateToProps = createPropsSelector({
   inventory: selectors.selectAllInventory,
   locale: selectLocale,
   term: selectTerm,
   calculator: selectCalculator,
 });

 function mapDispatchToProps(dispatch) {
   return {
     purchaseCar: (carData, locale) => dispatch(purchaseCarAction(carData, locale)),
     linkTo: (url) => dispatch(push(url)),
     changeCalculator: (calculator) => dispatch(changeCalculatorAction(calculator)),
   };
 }

 export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
