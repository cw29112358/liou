/**
 *
 * ConnectionSearchScene Container
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

import { LINEAR_PROPS } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import searchImage from 'assets/search.png';

import {
  selectProfilesIsLoading,
} from 'containers/AppRouter/selectors';
import {
  updatePublicProfilesAction,
} from 'containers/AppRouter/actions';

import FullScreenScene from 'components/FullScreenScene';
import DeleteNbInput from 'components/DeleteNbInput';
import Button from 'components/Button';
import ProfileCard from 'components/ProfileCard';
import ProfileButtonGroup from 'components/ProfileButtonGroup';
import EmptyList from 'components/EmptyList';

import { selectSearchProfiles } from './selectors';
import { changeSearchAction } from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class ConnectionSearchScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      inputKey: props.searchKey,
      inputValue: props.searchValue,
    };
  }
  componentWillMount() {
    this.onPressSearch();
  }

  onRefresh = () => {
    const { updatePublicProfiles } = this.props;
    updatePublicProfiles({ getAll: true });
  }
  onPressSearch = () => {
    const { changeSearch } = this.props;
    const { inputKey, inputValue } = this.state;

    const realValue = inputValue.trim();
    if (realValue) changeSearch(inputKey, realValue);
  }
  onPressCancel = () => {
    this.setInputNativeText(' ');
    setTimeout(() => {
      this.setState({ inputValue: '' });
      this.setInputNativeText('');
    }, 100);
  }
  setInputNativeText = (text) => {
    if (this.refInput) this.refInput._root.setNativeProps({ text }); // eslint-disable-line
  }
  onChangeInput = (e) => {
    const inputValue = e.nativeEvent ? e.nativeEvent.text : '';
    this.setState({ inputValue });
  }
  onSubmitEditing = () => {
    this.onPressSearch();
  }

  formatUser = (user, format) => ({
    ...format(user),
    avatarRowStyle: styles.avatarRow,
    blackTextStyle: styles.blackText,
    greyTextStyle: styles.greyText,
  })
  formatOptions = (options) => (
    options.map((item, index) => ({
      ...item,
      label: `${item.label}2`,
      [index === 0 ? 'buttonStyle' : 'undefined']: styles.firstButton,
      leftChildren: (
        <Button
          disabled
          {...LINEAR_PROPS}
          style={styles.imageButton}
          linearStyle={styles.imageLinearButton}
        >
          <Image source={item.image} style={styles.image} />
        </Button>
      ),
    }))
  );

  renderSearchInput = (inputValue) => (
    <View style={styles.searchView}>
      { this.renderSearchButton() }
      <DeleteNbInput
        inputRef={(ref) => { this.refInput = ref; }}
        value={inputValue}
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

  renderProfile = (item) => (
    <View key={item.id}>
      <View style={styles.itemContent}>
        <ProfileCard
          onlyAvatar
          user={item}
          format={this.formatUser}
          avatarProps={{
            avatarStyle: styles.avatarImage,
          }}
          onPress={() => { Actions.push('profile', { profile: item }); }}
        />
        <ProfileButtonGroup
          profile={item}
          formatOptions={this.formatOptions}
          viewStyle={{ flex: 1 }}
          buttonViewStyle={styles.buttonGroup}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
      <View style={styles.separateView} />
    </View>
  )
  render() {
    const { isLoading, profiles } = this.props;
    const { inputValue } = this.state;

    return (
      <FullScreenScene
        hasRefresh
        refreshing={isLoading}
        onRefresh={this.onRefresh}
        headerProps={{
          middleButton: this.renderSearchInput(inputValue),
          hasRight: true,
          leftFieldStyle: { flex: 0 },
          rightFieldStyle: { flex: 0 },
          rightButton: this.renderCalcelButton(),
        }}
      >
        { profiles.map((item) => this.renderProfile(item)) }
        { !profiles.length && <EmptyList label="noConnection" /> }
      </FullScreenScene>
    );
  }
}

ConnectionSearchScene.defaultProps = {
};

ConnectionSearchScene.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchKey: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  profiles: PropTypes.array.isRequired,
  updatePublicProfiles: PropTypes.func.isRequired,
  changeSearch: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectProfilesIsLoading,
  profiles: selectSearchProfiles,
});

const mapDispatchToProps = (dispatch) => ({
  updatePublicProfiles: (params) => dispatch(updatePublicProfilesAction(params)),
  changeSearch: (key, value) => dispatch(changeSearchAction(key, value)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'connectionSearchScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(ConnectionSearchScene);
