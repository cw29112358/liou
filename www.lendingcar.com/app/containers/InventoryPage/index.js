/*
 *
 * InventoryPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import Pagination from 'react-js-pagination';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { isMobile } from 'react-device-detect';
import { Switch, Tabs } from 'antd';
import getSize from 'lodash/size';

import {
  purchaseCarAction,
  changeCalculatorAction,
} from 'containers/App/actions';
import {
  selectCalculator,
  selectActiveAreas,
  selectCurrentAreaConfig,
} from 'containers/App/selectors';
import Loader from 'components/Loader';
import { selectLocale } from 'containers/LanguageProvider/selectors';
import TranslatedMessage, { formatMessage } from 'components/TranslatedMessage';

import {
  selectPage,
  // selectTotalCount,
  selectItemCountPerPage,
  selectFilter,
  selectMakeOptions,
  selectColorOptions,
  selectColorFilter,
  selectColorFilterMakeOptions,
  selectColorFilterColorOptions,
  selectTotalMutltiFilterCount,
  selectMultiFilterCurrentPageInventory,
  selectMultiFilter,
  selectOrderType,
  selectSearch,
  selectIsLoading,
  selectYearRange,
  selectYearRangeData,
  selectPriceRange,
  selectPriceRangeData,
  selectAvailability,
} from './selectors';
import {
  loadInventoryAction,
  changeFilterAction,
  changeConfigAction,
  changePageAction,
  changeSearchAction,
  changeColorFilterAction,
  changeMultiColorFilterAction,
  changeMultiMakeFilterAction,
  changeOrderAction,
  changeAvailabilityAction,
  changeYearRangeAction,
  changePriceRangeAction,
} from './actions';
import GridFilter from './components/GridFilter';
import FilterBar from './components/FilterBar';
import ListProducts from './components/ListProducts';
import messages from './messages';
import './style.scss';
export class InventoryPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.firstRender = true;
    this.state = {
      priceOrder: true,
      yearOrder: false,
    };
  }
  componentDidMount() {
    const area = sessionStorage.getItem('area') || 'bayArea';
    // const passengers = sessionStorage.getItem('passengers') || 1;
    const size = sessionStorage.getItem('size') || 'all';
    const date = sessionStorage.getItem('date') || new Date().toISOString();
    const term = sessionStorage.getItem('term') || 1;
    this.props.changeCalculator({ area, size, date, term });
    if (!this.props.inventory || getSize(this.props.inventory) === 0) {
      this.props.loadInventory();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (getSize(this.props.inventory) !== 0 && this.props.calculator.area !== nextProps.calculator.area) {
      this.props.loadInventory({ forceReload: true });
    }
  }

  toggleAvailability = (checked) => {
    const availability = checked ? 'available' : '';
    this.props.changeAvailability(availability);
    this.props.changePage(1);
  }
  changeSorting = (key) => {
    if (key === 'price') {
      const currentPriceKey = this.state.priceOrder ? 'asc' : 'desc';
      this.setState({ priceOrder: !this.state.priceOrder });
      this.props.changeOrder(currentPriceKey);
    } else if (key === 'year') {
      const currentYearKey = this.state.yearOrder ? 'ascYear' : 'descYear';
      this.setState({ yearOrder: !this.state.yearOrder });
      this.props.changeOrder(currentYearKey);
    } else { this.props.changeOrder(key); }
  }
  firstRenderScroll = (none) => {
    if (isMobile && none && this.firstRender) {
      this.firstRender = false;
      none.scrollIntoView();
    }
  }
  translatedDefault = formatMessage(this.props.intl, messages, 'default');
  translatedPrice = <span>{formatMessage(this.props.intl, messages, 'price')} <i className="anticon anticon-swap rotate-icon"></i></span>;
  translatedYear = <span>{formatMessage(this.props.intl, messages, 'year')} <i className="anticon anticon-swap rotate-icon"></i></span>;
  // translatedPriceDesc = formatMessage(this.props.intl, messages, 'priceDesc');
  // translatedPriceAsc = formatMessage(this.props.intl, messages, 'priceAsc');
  // translatedYearDesc = formatMessage(this.props.intl, messages, 'yearDesc');
  // translatedYearAsc = formatMessage(this.props.intl, messages, 'yearAsc');
  translatedTitle = formatMessage(this.props.intl, messages, this.props.route.name);

  renderHelmet = () => <Helmet
    title={this.translatedTitle}
    meta={[{ name: 'description', content: 'Inventory' }]}
  />
  renderSearchOptions = () => <FilterBar {...this.props} />
  renderFilterOptions = () => <GridFilter {...this.props} />
  renderTotalCount = () => (
    <div className="total-count-box" >
      <div>
        <span className="total-count font-black" ref={this.firstRenderScroll}>{this.props.totalMultiFilterCount}</span>
        {isMobile ? <TranslatedMessage messages={messages} messageId="vehiclesMeetYourCriteria" tagName="span" />
        : <TranslatedMessage messages={messages} messageId="carsArePreparingForYou" tagName="span" />}
      </div>
      <div>
        {isMobile ? <TranslatedMessage messages={messages} messageId="mobileDisplay" tagName="span" />
        : <TranslatedMessage messages={messages} messageId="onlyDisplay" tagName="span" />}
        &nbsp;
        <span className="total-count font-black">
          <TranslatedMessage messages={messages} messageId="available" tagName="span" />
        </span>
        {!isMobile && <TranslatedMessage messages={messages} messageId="vehicles" tagName="span" />}
        <Switch className="availability-switch" defaultChecked={!!this.props.availability} onChange={this.toggleAvailability} style={{ marginLeft: '5px' }} />
      </div>
    </div>);
  renderSortingOptions = () => {
    const TabPane = Tabs.TabPane;
    return (<div className="sorting-options-box">
      <Tabs onTabClick={this.changeSorting} type="card">
        <TabPane tab={this.translatedDefault} key="none"></TabPane>
        <TabPane tab={this.translatedPrice} key="price"></TabPane>
        <TabPane tab={this.translatedYear} key="year"></TabPane>
        {/* <TabPane tab={this.translatedPriceDesc} key="desc"></TabPane>
        <TabPane tab={this.translatedPriceAsc} key="asc"></TabPane>
        <TabPane tab={this.translatedYearDesc} key="descYear"></TabPane>
        <TabPane tab={this.translatedYearAsc} key="ascYear"></TabPane>*/}
      </Tabs>
    </div>);
  }
  renderList = () => <ListProducts {...this.props} />;
  renderPagination = () => {
    const {
      pageNumber,
      changePage,
      itemCountPerPage,
      totalMultiFilterCount,
    } = this.props;
    const shouldPaginationShown = totalMultiFilterCount > itemCountPerPage;
    const activePage = pageNumber + 1;
    return (<div className="col-sm-9">
      <nav aria-label="Page navigation" className="text-center margin-b-30">
        <div>
          { shouldPaginationShown &&
            <Pagination
              activePage={activePage}
              itemsCountPerPage={itemCountPerPage}
              totalItemsCount={totalMultiFilterCount}
              pageRangeDisplayed={5}
              onChange={changePage}
            />
            }
        </div>
      </nav>
    </div>);
  }
  render() {
    let container;
    if (this.props.isLoading) container = <Loader />;
    else {
      container = (<div className="container page-container">
        { this.renderSearchOptions() }
        { this.renderFilterOptions() }
        { this.renderTotalCount() }
        { this.renderSortingOptions() }
        { this.renderList() }
        { this.renderPagination() }
      </div>);
    }

    return (
      <div className="inventory-page" style={{ backgroundColor: '#FFF' }}>
        { this.renderHelmet() }
        { container }
      </div>
    );
  }
}

InventoryPage.propTypes = {
  intl: PropTypes.object,
  route: PropTypes.object,
  // locale: PropTypes.string,
  isLoading: PropTypes.bool,
  calculator: PropTypes.object,
  availability: PropTypes.string,
  inventory: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  pageNumber: PropTypes.number,
  // totalCount: PropTypes.number,
  itemCountPerPage: PropTypes.number,
  totalMultiFilterCount: PropTypes.number,
  // linkTo: PropTypes.func,
  loadInventory: PropTypes.func,
  changeCalculator: PropTypes.func,
  changeAvailability: PropTypes.func,
  changeOrder: PropTypes.func,
  changePage: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  locale: selectLocale,
  isLoading: selectIsLoading,
  currentSearchKeywords: selectSearch,
  calculator: selectCalculator,
  locationsField: selectActiveAreas,
  yearRange: selectYearRange,
  yearRangeData: selectYearRangeData,
  priceRange: selectPriceRange,
  priceRangeData: selectPriceRangeData,
  makeOptions: selectMakeOptions,
  colorOptions: selectColorOptions,
  colorFilter: selectColorFilter,
  colorFilterMakeOptions: selectColorFilterMakeOptions,
  colorFilterColorOptions: selectColorFilterColorOptions,
  filter: selectFilter,
  multiFilter: selectMultiFilter,
  inventory: selectMultiFilterCurrentPageInventory,
  availability: selectAvailability,
  orderType: selectOrderType,
  pageNumber: selectPage,
  // totalCount: selectTotalCount,
  itemCountPerPage: selectItemCountPerPage,
  totalMultiFilterCount: selectTotalMutltiFilterCount,
  currentAreaConfig: selectCurrentAreaConfig,
});

function mapDispatchToProps(dispatch) {
  return {
    linkTo: (url) => dispatch(push(url)),
    loadInventory: (params) => dispatch(loadInventoryAction(params)),
    changeCalculator: (calculator) => dispatch(changeCalculatorAction(calculator)),
    changeSearch: (keyword) => dispatch(changeSearchAction(keyword)),
    changeYearRange: (yearRange) => dispatch(changeYearRangeAction(yearRange)),
    changePriceRange: (priceRange) => dispatch(changePriceRangeAction(priceRange)),
    changeColorFilter: (colorFilter) => dispatch(changeColorFilterAction(colorFilter)),
    changeMultiColorFilter: (multiFilterColor) => dispatch(changeMultiColorFilterAction(multiFilterColor)),
    changeMultiMakeFilter: (multiFilterMake) => dispatch(changeMultiMakeFilterAction(multiFilterMake)),
    changeFilter: (filter) => dispatch(changeFilterAction(filter)),
    changeAvailability: (availability) => dispatch(changeAvailabilityAction(availability)),
    changeOrder: (orderType) => dispatch(changeOrderAction(orderType)),
    changePage: (pageNumber) => dispatch(changePageAction(pageNumber - 1)),
    changeConfig: (config) => dispatch(changeConfigAction(config)),
    purchaseCar: (carData, locale) => dispatch(purchaseCarAction(carData, locale)),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(InventoryPage));
