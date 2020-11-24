/**
 *
 * AddConnectionScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  View,
} from 'native-base';
import {
  Image,
} from 'react-native';

import searchImage from 'assets/search.png';

import {
  selectLanguage,
} from 'containers/AppRouter/selectors';

import FullScreenScene from 'components/FullScreenScene';
import FilterBar from 'components/FilterBar';
import DeleteNbInput from 'components/DeleteNbInput';
import Button from 'components/Button';

import { FILTER_OPTIONS } from './constants';
import styles from './styles';

export class AddConnectionScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      filter: FILTER_OPTIONS[0],
    };
  }

  onSelectType = ({ item }) => {
    this.setState({ filter: item });
  }
  onPressSearch = () => {
    const { search, filter } = this.state;
    if (!search || !search.trim()) return;

    Actions.push('connectionSearch', {
      searchKey: filter.search,
      searchValue: search,
    });
  }
  onPressCancel = () => {
    this.setInputNativeText(' ');
    setTimeout(() => {
      this.setState({ search: '' });
      this.setInputNativeText('');
    }, 100);
  }
  setInputNativeText = (text) => {
    if (this.refInput) this.refInput._root.setNativeProps({ text }); // eslint-disable-line
  }
  onChangeInput = (e) => {
    const search = e.nativeEvent ? e.nativeEvent.text : '';
    this.setState({ search });
  }
  onSubmitEditing = () => {
    this.onPressSearch();
  }

  renderSearchInput = (search) => (
    <View style={[styles.blackShadow, styles.searchView]}>
      { this.renderSearchButton() }
      <DeleteNbInput
        inputRef={(ref) => { this.refInput = ref; }}
        value={search}
        onChange={this.onChangeInput}
        onSubmitEditing={this.onSubmitEditing}
        placeholder={translate('placeholderSearch')}
        style={styles.searchInput}
        hasDeleteIcon={false}
        returnKeyType="search"
      />
    </View>
  )
  renderSearchButton = () => (
    <Button
      transparent
      leftChildren={<Image source={searchImage} style={styles.searchImage} />}
      style={styles.searchButton}
      onPress={this.onPressSearch}
    />
  )
  renderCalcelButton = () => (
    <Button
      transparent
      onPress={this.onPressCancel}
      style={styles.cancelButton}
      textLabel="cancel"
      textStyle={styles.cancelButtonText}
    />
  )

  renderFilterBar = (language, selectedOption) => (
    <FilterBar
      title="searchTitle"
      options={FILTER_OPTIONS}
      filterViewStyle={styles.filterView}
      titleStyle={styles.filterTitle}
      buttonViewStyle={styles.filterButtonView}
      buttonStyle={{ ...styles.filterButton, width: language === 'en' ? 80 : 65 }}
      textStyle={styles.filterButtonText}
      activeButtonStyle={styles.filterActiveButton}
      activeTextStyle={styles.activeText}
      selectedOption={selectedOption}
      onSelect={this.onSelectType}
    />
  )
  render() {
    const { language } = this.props;
    const { search, filter } = this.state;
    return (
      <FullScreenScene
        headerTitle="addFriend"
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.searchPart}>
          { this.renderSearchInput(search) }
          { !!search && this.renderCalcelButton() }
        </View>
        { this.renderFilterBar(language, filter.label) }
      </FullScreenScene>
    );
  }
}

AddConnectionScene.defaultProps = {
};

AddConnectionScene.propTypes = {
  language: PropTypes.string.isRequired,
};

const mapStateToProps = createPropsSelector({
  language: selectLanguage,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(AddConnectionScene);
