/**
 *
 * MyFavouritesScene Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import remove from 'lodash/remove';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  View,
  CheckBox,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  selectLanguage,
  selectAuthUserId,
} from 'containers/AppRouter/selectors';

import FullScreenScene from 'components/FullScreenScene';
import ProjectLargeList from 'components/ProjectLargeList';
import Loader from 'components/Loader';
import EmptyList from 'components/EmptyList';

import FavouritesFooter from './components/FavouritesFooter';
import {
  selectSortFavourites,
  selectIsLoading,
} from './selectors';
import {
  loadMyFavouritesAction,
  updateFavouritesAction,
} from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class MyFavouritesScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      isRefreshing: false,
      allChecked: false,
      selectedId: [],
      listData: props.favourites,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { favourites, isLoading } = this.props;
    if (favourites !== nextProps.favourites) {
      this.setState({ listData: nextProps.favourites });
    }
    if (nextProps.isLoading !== isLoading && !nextProps.isLoading) {
      this.setState({ isRefreshing: false });
    }
  }

  linkTo = (route, params) => {
    Actions.push(route, params);
  }

  onRefresh = () => {
    const { loadMyFavourites } = this.props;
    this.setState({ isRefreshing: true });
    loadMyFavourites({ forceReload: true });
  }

  setDataProps = (value) => {
    const { selectedId, listData } = this.state;
    const newListData = [...listData];
    return newListData.map((listItem) => {
      const newDataItem = listItem;
      newDataItem.isSelected = value;
      if (value) selectedId.push(listItem.id);
      return newDataItem;
    });
  }
  onEdit = () => {
    const { edit } = this.state;
    if (edit) {
      this.setState({
        listData: this.setDataProps(false),
        allChecked: false,
        selectedId: [],
      });
    }
    this.setState({
      listData: this.setDataProps(false),
      edit: !edit,
    });
  }
  selectAllChecked = () => {
    const { listData, selectedId } = this.state;
    let newListData = [];
    if (selectedId.length !== listData.length) {
      newListData = this.setDataProps(true);
      this.setState({
        listData: newListData,
        selectedId,
        allChecked: true,
      });
    } else {
      newListData = this.setDataProps(false);
      this.setState({
        listData: newListData,
        selectedId: [],
        allChecked: false,
      });
    }
  }
  multipleChangeFavourites = () => {
    const { updateFavourites } = this.props;
    const { selectedId } = this.state;
    updateFavourites({ activityId: selectedId });
  }
  selectProjectId = (projectId) => {
    const { selectedId, listData } = this.state;
    const isSelected = selectedId.findIndex((id) => id === projectId) !== -1;
    const currentProjectIndex = listData.findIndex((item) => item.id === projectId);
    const newListData = [...listData];
    if (newListData.length > 0) {
      if (isSelected) {
        remove(selectedId, (id) => projectId === id);
        newListData[currentProjectIndex].isSelected = false;
      } else {
        selectedId.push(projectId);
        newListData[currentProjectIndex].isSelected = true;
      }
      this.setState({
        selectedId,
        listData: newListData,
        allChecked: selectedId.length === newListData.length,
      });
    } else {
      this.setState({ selectedId, listData: [] });
    }
  }

  setHeaderProps = () => {
    const { edit } = this.state;
    const { favourites } = this.props;
    const rightLable = edit ? 'done' : 'edit';
    return ({
      title: 'myFavourites',
      hasRight: favourites.length > 0,
      leftFieldStyle: styles.leftField,
      rightLable,
      rightPress: this.onEdit,
      rightFieldStyle: { flex: 0.3 },
    });
  }

  renderFooter = () => {
    const { allChecked, selectedId } = this.state;
    return (
      <FavouritesFooter
        allChecked={allChecked}
        selectedId={selectedId}
        selectAllChecked={this.selectAllChecked}
        multipleChangeFavourites={this.multipleChangeFavourites}
      />
    );
  }

  renderCheckBox = (item) => {
    const checkBoxStyles = [styles.checkBox];
    if (item.isSelected) {
      checkBoxStyles.push(styles.activity);
    }
    return (
      <View style={styles.actionPart}>
        <CheckBox checked={item.isSelected} style={checkBoxStyles} onPress={() => this.selectProjectId(item.id)} />
      </View>
    );
  }
  renderEmptyList = (isListRefreshing) => (
    <EmptyList
      label="noFavourites"
      onRefresh={this.onRefresh}
      isRefreshing={isListRefreshing}
    />
  )
  renderChildren = () => {
    const {
      language, authUserId, favourites, isLoading,
    } = this.props;
    const { edit, listData, isRefreshing } = this.state;
    const listContentStyles = [styles.listContent];
    const spinnerStyles = [styles.spinner];

    const isListRefreshing = isRefreshing && isLoading;
    const isSceneLoading = isLoading && !isRefreshing;
    if (edit) {
      listContentStyles.push(styles.transformListContent);
      spinnerStyles.push(styles.editSpinner);
    }
    if (favourites.length <= 0) {
      return this.renderEmptyList(isListRefreshing);
    }
    return (
      <View style={listContentStyles}>
        { isSceneLoading && <Loader spinnerStyles={spinnerStyles} /> }
        <ProjectLargeList
          listData={listData}
          linkTo={this.linkTo}
          language={language}
          authUserId={authUserId}
          itemWidth={styles.itemWidth}
          renderCheckBox={this.renderCheckBox}
          onSelect={this.selectProjectId}
          isChangeListSize
          edit={edit}
          onRefresh={this.onRefresh}
          isListRefreshing={isListRefreshing}
        />
      </View>
    );
  }

  render() {
    const { favourites = [] } = this.props;
    const { edit } = this.state;
    const isShowFooter = edit && favourites.length > 0;
    return (
      <FullScreenScene
        headerProps={this.setHeaderProps()}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
      >
        { this.renderChildren()}
        { isShowFooter && this.renderFooter()}
      </FullScreenScene>
    );
  }
}

MyFavouritesScene.defaultProps = {
  favourites: [],
  isLoading: true,
  loadMyFavourites: () => null,
  updateFavourites: () => null,
};

MyFavouritesScene.propTypes = {
  authUserId: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  favourites: PropTypes.array,
  loadMyFavourites: PropTypes.func,
  updateFavourites: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  authUserId: selectAuthUserId,
  favourites: selectSortFavourites,
  isLoading: selectIsLoading,
  language: selectLanguage,
});

const mapDispatchToProps = (dispatch) => ({
  loadMyFavourites: (params) => dispatch(loadMyFavouritesAction(params)),
  updateFavourites: (id) => dispatch(updateFavouritesAction(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'myFavouritesScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(MyFavouritesScene);
