/**
 *
 * UserInfoScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { TouchableOpacity, RefreshControl } from 'react-native';
import {
  Container,
  Content,
  List,
  View,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import AppHeader from 'components/AppHeader';
import FilterBar from 'components/FilterBar';
import Loader from 'components/Loader';
import AvatarListItem from 'components/AvatarListItem';
import EmptyList from 'components/EmptyList';

import FilterSearch from './components/FilterSearch';
import { FILTER_OPTIONS, LEVEL_OPTIONS, DATE_OPTIONS } from './constants';
import {
  selectIsLoading,
  selectSearch,
  selectFilterCustomerInfo,
} from './selectors';
import {
  changeSearchAction,
  changeFilterAction,
  getCustomerAction,
} from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class UserInfoScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      showOption: '',
      showFilterOptions: '',
      hideMask: false,
      isFirstLoading: true,
    };
  }
  componentDidMount() {
    const { getCustomer } = this.props;
    getCustomer();
  }
  componentWillUnmount() {
    const { changeFilter, changeSearch } = this.props;
    changeFilter('', '');
    changeSearch('', '');
  }
  onPressFilterMask = () => {
    this.setState({
      hideMask: true,
      showOption: '',
    });
  }
  onSelectFilterOptions = (item, key, state, filterSort) => {
    const { changeFilter } = this.props;
    const { label } = item;
    const option = state === label ? '' : label;
    this.setState({
      [key]: option,
      hideMask: false,
    });
    if (key === 'showFilterOptions') changeFilter(option, filterSort);
  }
  onChangeSearch = (e) => {
    const { changeSearch } = this.props;
    changeSearch(e.nativeEvent ? e.nativeEvent.text : '', 'search');
  }
  linkToCustomerDetail = (item) => {
    Actions.push('customerDetail', {
      customerInfo: item,
    });
  }
  onRefresh = () => {
    const { getCustomer } = this.props;
    this.setState({ isFirstLoading: false });
    getCustomer();
  }
  renderFilterBar = () => {
    const { showOption } = this.state;
    const filterViewStyle = showOption
      ? [styles.filterBaseStyle, styles.filterActiveView]
      : [styles.filterBaseStyle, styles.filterView];
    return (
      <FilterBar
        options={FILTER_OPTIONS}
        filterViewStyle={filterViewStyle}
        buttonViewStyle={styles.buttonViewStyle}
        buttonStyle={styles.buttonStyle}
        textStyle={styles.buttonTextStyle}
        activeButtonStyle={styles.activeButtonStyle}
        activeTextStyle={styles.activeTextStyle}
        selectedOption={showOption}
        onSelect={(item) => this.onSelectFilterOptions(item, 'showOption', showOption)}
      >
        { this.renderFilterBarChildren(showOption) }
      </FilterBar>
    );
  }
  renderFilterBarChildren = (showOption) => {
    switch (showOption) {
      case 'level':
        return this.renderFilterOptions(LEVEL_OPTIONS, 'level');
      case 'date':
        return this.renderFilterOptions(DATE_OPTIONS, 'date');
      case 'search':
        return this.renderFilterSearch();
      default:
        return null;
    }
  }
  renderFilterOptions = (options, filterSort) => {
    const { showFilterOptions } = this.state;
    return (
      <FilterBar
        options={options}
        filterViewStyle={styles.filterOptionsView}
        buttonViewStyle={styles.buttonViewOptionsStyle}
        buttonStyle={styles.buttonOptionsStyle}
        textStyle={styles.buttonTextOptionsStyle}
        activeButtonStyle={styles.activeButtonOptionsStyle}
        activeTextStyle={styles.activeTextOptionsStyle}
        selectedOption={showFilterOptions}
        onSelect={(item) => this.onSelectFilterOptions(item, 'showFilterOptions', showFilterOptions, filterSort)}
      />
    );
  };
  renderFilterSearch = () => {
    const { search } = this.props;
    return (
      <FilterSearch
        value={search}
        onChange={this.onChangeSearch}
      />
    );
  }
  renderFilterListItem = (item) => {
    const dataInfo = {
      avatarUrl: item.logo ? item.logo.url : '',
      bodyTopText: `${item.firstName} ${item.lastName}`,
      bodyBottomText: item.createdDate,
      rightTopText: translate(item.parentCommissionFee, 'dollar'),
      rightBottomText: translate(item.membershipLevel),
    };
    return (
      <AvatarListItem
        dataInfo={dataInfo}
        key={item.phoneNumber}
        onPress={() => this.linkToCustomerDetail(item)}
      />
    );
  }
  renderFilterList = () => {
    const { filterCustomerInfo } = this.props;
    if (!filterCustomerInfo.length) return (<EmptyList label="emptySearch" />);
    return (
      <List>
        { filterCustomerInfo.map((item) => this.renderFilterListItem(item)) }
      </List>
    );
  }
  renderMask(showOption) {
    const { hideMask } = this.state;
    if (!showOption || hideMask) return null;
    return (
      <TouchableOpacity style={styles.mask} onPress={this.onPressFilterMask} />
    );
  }
  render() {
    const { isLoading } = this.props;
    const { showOption, isFirstLoading } = this.state;
    return (
      <Container>
        <View style={styles.filterWrapper}>
          <AppHeader title="userInfo" hasShadow={false} />
          { this.renderFilterBar() }
        </View>
        <Content
          refreshControl={(
            <RefreshControl
              refreshing={!isLoading && !isFirstLoading}
              onRefresh={this.onRefresh}
              title={translate('loading')}
            />
          )}
          style={styles.listStyle}
        >
          { (isLoading || !isFirstLoading) && this.renderFilterList() }
        </Content>
        { this.renderMask(showOption) }
        { (!isLoading && isFirstLoading) && <Loader />}
      </Container>
    );
  }
}

UserInfoScene.defaultProps = {
  isLoading: false,
  filterCustomerInfo: [],
  changeSearch: () => null,
  changeFilter: () => null,
  getCustomer: () => null,
};

UserInfoScene.propTypes = {
  isLoading: PropTypes.bool,
  search: PropTypes.string.isRequired,
  filterCustomerInfo: PropTypes.array,
  changeSearch: PropTypes.func,
  changeFilter: PropTypes.func,
  getCustomer: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
  search: selectSearch,
  filterCustomerInfo: selectFilterCustomerInfo,
});

const mapDispatchToProps = (dispatch) => ({
  changeSearch: (searchKey, filterSort) => dispatch(changeSearchAction(searchKey, filterSort)),
  changeFilter: (filterKey, filterSort) => dispatch(changeFilterAction(filterKey, filterSort)),
  getCustomer: () => dispatch(getCustomerAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userInfoScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(UserInfoScene);
