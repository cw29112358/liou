/**
 *
 * InventoryScene Container
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Container,
} from 'native-base';
import { Keyboard, TouchableOpacity } from 'react-native';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { loadCarDetailAction } from 'containers/InventoryCarScene/actions';
import {
  withReducer as carReducer,
} from 'containers/InventoryCarScene';

import Mask from 'components/Mask';
import FilterBar from 'components/FilterBar';
import PriceFilter from 'components/PriceFilter';

import TopPart from './components/TopPart';
import SearchHeader from './components/SearchHeader';
import RangeSlide from './components/RangeSlide';
import SizeList from './components/SizeList';
import OtherFilter from './components/OtherFilter';
import ProductList from './components/ProductList';

import {
  FILTER_OPTIONS,
  FILTER_CAR_TYPE_LIST,
  SORT_FILTER,
} from './constants';
import {
  selectOrderedSearchedFilterInventory,
  selectIsLoading,
  selectYearRange,
  selectColorOptions,
  selectBrandOptions,
  selectSearch,
  selectSortData,
  selectFilterData,
} from './selectors';
import {
  loadInventoryAction,
  changeSearchAction,
  changeSortAction,
  changeFilterAction,
  changeClearAction,
} from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class InventoryScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      showOption: '',
      showSearchHeader: true,
      isFirstLoading: true,
    };
    this.scrollListData = {
      isScroll: false,
      startTouchY: 0,
    };
    this.isSetFilterConfig = false;
  }
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.onKeyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onKeyboardDidHide);
  }
  componentWillReceiveProps(nextProps) {
    this.onReinitIsSetFilterConfig(nextProps);
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.onFilterYear('');
    this.onFilterClear();
  }

  // keyboard event
  onKeyboardDidShow = () => {
    this.showKeyboard = true;
  }
  onKeyboardDidHide = () => {
    this.showKeyboard = false;
  }
  onHideKeyboard() {
    if (this.showKeyboard) Keyboard.dismiss();
  }

  // header event
  onPressBack = () => {
    Actions.pop();
  }
  onChangeHeader = (e) => {
    const { changeSearch } = this.props;
    changeSearch(e.nativeEvent ? e.nativeEvent.text : '');
  }
  onFocusHeader = () => {
    this.setState({ showOption: 'mask' });
  }
  onBlurHeader = () => {
    const { showOption } = this.state;
    if (showOption === 'mask') this.onPressFilterMask();
  }

  // filterBar event
  onSelectFilterBar = (item) => {
    const { showOption } = this.state;
    const { label } = item;
    const option = showOption === label ? '' : label;
    this.setState({ showOption: option });
  }
  onPressFilterMask = () => {
    const { inventories } = this.props;
    this.onHideKeyboard();
    this.setState({ showOption: '' });
    if (inventories.length === 0) this.onShowSearchHeader(true);
  }

  // InventoryCarScene need isSetFilterConfig
  onReinitIsSetFilterConfig(nextProps) {
    const { filterData } = this.props;
    const prevLength = Object.keys(filterData).length;
    const currentLength = Object.keys(nextProps.filterData).length;
    if (currentLength > 1 && prevLength !== currentLength) {
      this.isSetFilterConfig = true;
    }
  }
  // list press event
  onPressList = (item) => {
    const { loadCarInfo } = this.props;
    loadCarInfo(item, 0);
    Actions.inventoryCar({
      carInfo: item,
      isSetFilterConfig: this.isSetFilterConfig,
    });
    this.isSetFilterConfig = false;
  }
  // list pull refresh
  onRefresh = () => {
    const { loadInventory } = this.props;
    loadInventory({ update: true });
    this.setState({ isFirstLoading: false });
  }
  // list scroll event
  onTouchBeginList = (e, listHeight, viewHeight) => {
    if (listHeight > viewHeight) {
      this.scrollListData.isScroll = true;
      this.scrollListData.startTouchY = e.nativeEvent.pageY;
    } else {
      this.onShowSearchHeader(true);
    }
  }
  onTouchMoveList = (e) => {
    if (this.scrollListData.isScroll) {
      const { pageY } = e.nativeEvent;
      const distanceY = pageY - this.scrollListData.startTouchY;
      this.onListDyChange(distanceY);
    }
  }
  onTouchEndList= () => {
    this.scrollListData.isScroll = false;
  }
  onListDyChange(dy, y) {
    const { showSearchHeader } = this.state;

    if (dy < 0 && showSearchHeader) {
      this.onShowSearchHeader(false);
    } else if ((y === 0 || dy > 0) && !showSearchHeader) { // 下
      this.onShowSearchHeader(true);
    }
  }
  onShowSearchHeader(targetValue) {
    const { showSearchHeader } = this.state;
    if (showSearchHeader !== targetValue) {
      this.setState({ showSearchHeader: targetValue });
    }
  }

  // filter event
  onFilterType = (item, active) => {
    const value = active ? '' : item.label;
    this.onChangeSingleOption('carType', value);
    this.onPressFilterMask();
  }
  onFilterYear = (values) => {
    this.onChangeSingleOption('yearRange', values);
  }
  // filter more event
  onFilterClear = () => {
    const { changeClear } = this.props;
    changeClear();
  }
  onFilterSort = (item, title, active) => {
    const { changeSort } = this.props;
    const value = active ? '' : item.label;
    this.onChangeSingleOption(title, value, changeSort);
  };
  onFilterColor = (item, active, selectedOptions) => {
    this.onChangeMultiOptions('color', selectedOptions, active, item.value);
  }
  onFilterBrand = (item, title, active, selectedOption, selectedOptions) => {
    this.onChangeMultiOptions('brand', selectedOptions, active, item.label);
  }
  // public filter
  onChangeSingleOption(filterKey, value, func) {
    const { changeFilter } = this.props;
    const filterFunc = func || changeFilter;
    filterFunc(filterKey, value);
  }
  onChangeMultiOptions(filterKey, prevOptions, active, value) {
    const { changeFilter } = this.props;
    let options;
    if (active) {
      options = prevOptions.filter((opt) => opt !== value);
    } else {
      options = prevOptions.slice(0);
      options.push(value);
    }
    changeFilter(filterKey, options);
  }

  // render content
  rederProductList() {
    const { inventories, isLoading } = this.props;
    const { showSearchHeader, isFirstLoading } = this.state;
    return (
      <ProductList
        showSearchHeader={showSearchHeader}
        list={inventories}
        refreshing={isLoading}
        isFirstLoading={isFirstLoading}
        onRefresh={this.onRefresh}
        onPress={this.onPressList}
        onTouchBegin={this.onTouchBeginList}
        onTouchMove={this.onTouchMoveList}
        onTouchEnd={this.onTouchEndList}
      />
    );
  }

  renderTopPart() {
    const { showSearchHeader } = this.state;

    return (
      <TopPart
        showSearchHeader={showSearchHeader}
        renderSearchHeader={this.renderSearchHeader}
        renderFilterBar={this.renderFilterBar}
      />
    );
  }
  renderSearchHeader = () => {
    const { search } = this.props;
    return (
      <SearchHeader
        onBack={this.onPressBack}
        value={search}
        onChange={this.onChangeHeader}
        onFocus={this.onFocusHeader}
        onBlur={this.onBlurHeader}
      />
    );
  }
  renderFilterBar = () => {
    const { showOption } = this.state;
    const options = FILTER_OPTIONS.map((item) => {
      if (item.label === showOption) {
        return {
          ...item,
          iconName: 'md-arrow-dropup',
        };
      }

      return item;
    });
    return (
      <FilterBar
        filterViewStyle={styles.filterView}
        buttonStyle={styles.filterButton}
        textStyle={styles.filterButtonText}
        activeButtonStyle={styles.activeFilterButton}
        activeTextStyle={styles.activeFilterText}
        activeIconStyle={styles.activeFilterText}
        options={options}
        selectedOption={showOption}
        onSelect={this.onSelectFilterBar}
      >
        { this.renderFilterBarChildren(showOption) }
      </FilterBar>
    );
  }

  // filterBar children
  renderFilterBarChildren(showOption) {
    switch (showOption) {
      case 'price':
        return this.renderFilterPrice();
      case 'type':
        return this.renderFilterType();
      case 'year':
        return this.renderFilterYear();
      default:
        return null;
    }
  }
  renderFilterPrice() {
    const { inventories, changeFilter, filterData } = this.props;

    return (
      <PriceFilter
        slideWidth={styles.slideLength}
        translateLeft={false}
        leftLabel={`${inventories.length}  `}
        rightLabel="cars"
        viewStyle={styles.filterPriceView}
        filterData={filterData}
        titleViewStyle={styles.titleViewStyle}
        changeFilter={changeFilter}
      />
    );
  }
  renderFilterType() {
    const { filterData } = this.props;
    return (
      <SizeList
        options={FILTER_CAR_TYPE_LIST}
        selectedOption={filterData.carType}
        onSelect={this.onFilterType}
      />
    );
  }
  renderFilterYear() {
    const { inventories, yearRange, filterData } = this.props;
    return (
      <RangeSlide
        leftLabel={`${inventories.length}  `}
        rightLabel="cars"
        min={yearRange[0]}
        max={yearRange[1]}
        step={1}
        values={filterData.yearRange || yearRange}
        onValuesChange={this.onFilterYear}
        containerViewStyle={styles.filterPriceView}
        titleViewStyle={styles.titleViewStyle}
      />
    );
  }
  renderFilterMore() {
    const {
      inventories,
      colorOptions, brandOptions,
      sortData, filterData,
    } = this.props;
    const { showSearchHeader } = this.state;
    SORT_FILTER[0].selectedOption = sortData.price;
    SORT_FILTER[1].selectedOption = sortData.year;
    const sortProps = {
      title: 'sort',
      onSelect: this.onFilterSort,
      options: SORT_FILTER,
    };
    const colorProps = {
      title: 'color',
      options: colorOptions,
      selectedOptions: filterData.color,
      onSelect: this.onFilterColor,
    };
    const brandProps = {
      title: 'brand',
      options: brandOptions,
      selectedOptions: filterData.brand,
      onSelect: this.onFilterBrand,
    };

    const top = styles.filterMaskMore.top + (showSearchHeader ? styles.headerOccupyHeight : styles.headerMarginTop);
    const maskStyle = {
      ...styles.filterMaskMore,
      top,
      paddingBottom: top,
    };

    return (
      <Mask
        style={maskStyle}
        onPress={this.onPressFilterMask}
      >
        <OtherFilter
          onClear={this.onFilterClear}
          quantity={inventories.length}
          sortProps={sortProps}
          colorProps={colorProps}
          brandProps={brandProps}
        />
      </Mask>
    );
  }
  renderMask(option) {
    if (!option || option === 'more') return null;
    return <TouchableOpacity style={styles.mask} onPress={this.onPressFilterMask} />;
  }

  render() {
    const { showOption } = this.state;

    return (
      <Container style={styles.container}>
        { this.renderTopPart() }
        { this.rederProductList() }
        { showOption === 'more' && this.renderFilterMore() }
        { this.renderMask(showOption) }
      </Container>
    );
  }
}

InventoryScene.defaultProps = {
  loadCarInfo: () => null,
  loadInventory: () => null,
};

InventoryScene.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  inventories: PropTypes.array.isRequired,
  yearRange: PropTypes.array.isRequired,
  colorOptions: PropTypes.array.isRequired,
  brandOptions: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  sortData: PropTypes.object.isRequired,
  filterData: PropTypes.object.isRequired,
  changeSearch: PropTypes.func.isRequired,
  changeSort: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  changeClear: PropTypes.func.isRequired,
  loadCarInfo: PropTypes.func,
  loadInventory: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
  inventories: selectOrderedSearchedFilterInventory,
  yearRange: selectYearRange,
  colorOptions: selectColorOptions,
  brandOptions: selectBrandOptions,
  search: selectSearch,
  sortData: selectSortData,
  filterData: selectFilterData,
});

const mapDispatchToProps = (dispatch) => ({
  changeSearch: (value) => dispatch(changeSearchAction(value)),
  changeSort: (name, value) => dispatch(changeSortAction(name, value)),
  changeFilter: (name, value) => dispatch(changeFilterAction(name, value)),
  changeClear: () => dispatch(changeClearAction()),
  loadCarInfo: (carInfo, key) => dispatch(loadCarDetailAction(carInfo, key)),
  loadInventory: (params) => dispatch(loadInventoryAction(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'inventoryScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  carReducer,
  withConnect,
)(InventoryScene);
