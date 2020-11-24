/**
 *
 * MyReleaseScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  loadActivitiesAction,
} from 'containers/HomeScene/actions';
import {
  selectAreaOptions,
  selectIndustryOptions,
} from 'containers/HomeScene/selectors';
import {
  selectAuthUserId,
  selectAuthUserInfo,
  selectIsUploadSuccess,
} from 'containers/AppRouter/selectors';


import ReleaseForm from 'forms/ReleaseForm';

import Loader from 'components/Loader';
import FullScreenScene from 'components/FullScreenScene';

import { releaseActivitiesAction, saveUploadFileField } from './actions';
import { selectActivitiesLoading } from './selectors';

import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class MyReleaseScene extends React.Component { // eslint-disable-line

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      isShowPicker: false,
      selectedValue: translate('kdollar'),
    };
  }
  componentWillReceiveProps(nextProps) {
    const { loadActivities, isUploadSuccess } = this.props;
    const uploadSuccess = isUploadSuccess.toString() === 'false';
    if ((uploadSuccess && nextProps.isUploadSuccess) || !nextProps.activitiesLoading) {
      loadActivities({ forceReload: true });
      Actions.push('project');
    }
  }
  getHeaderProps = () => ({
    hasLeft: false,
  })

  onRelease = (formObject) => {
    const { onReleaseActivities } = this.props;
    const { activeTab } = this.state;
    let financingType;
    // let fundUnit = '10kusd';
    // if (selectedValue === '×10k CNY') {
    //   fundUnit = '10kcny';
    // }
    if (activeTab === 0) {
      financingType = 'equity';
    } else if (activeTab === 1) {
      financingType = 'debt';
    }
    const mergeObject = formObject
      .set('financingType', financingType);
    onReleaseActivities(mergeObject.toJS());
  }
  onConfirm = (value) => {
    this.setState({
      isShowPicker: false,
      selectedValue: translate(value),
    });
  }
  onShowPicker = () => {
    this.setState({ isShowPicker: true });
  }
  onCancel=() => {
    this.setState({ isShowPicker: false });
  }
  changeTab = (index) => {
    this.setState({
      activeTab: index,
    });
  }
  renderChildren = () => {
    const {
      areaPotions,
      industryOptions,
      authUserId,
      authUserInfo,
      onUpload,
      isUploadSuccess,
      activitiesLoading,
    } = this.props;
    const { activeTab, isShowPicker, selectedValue } = this.state;
    return (
      <ReleaseForm
        onSubmit={this.onRelease}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        onShowPicker={this.onShowPicker}
        changeTab={this.changeTab}
        onUpload={onUpload}
        activeTab={activeTab}
        areaPotions={areaPotions}
        industryOptions={industryOptions}
        isShowPicker={isShowPicker}
        selectedValue={selectedValue}
        authUserId={authUserId}
        isUploadSuccess={isUploadSuccess}
        activitiesLoading={activitiesLoading}
        {...authUserInfo}
      />
    );
  }
  render() {
    const { activitiesLoading, isUploadSuccess } = this.props;
    return (
      <FullScreenScene
        headerTitle="release"
        headerProps={this.getHeaderProps()}
        contentStyle={styles.content}
      >
        { this.renderChildren() }
        { (activitiesLoading || !isUploadSuccess) && <Loader /> }
      </FullScreenScene>
    );
  }
}

MyReleaseScene.defaultProps = {
  areaPotions: [],
  industryOptions: [],
  authUserId: '',
  authUserInfo: {},
  isUploadSuccess: true,
  activitiesLoading: true,
  onUpload: () => null,
  loadActivities: () => null,
  onReleaseActivities: () => null,
};

MyReleaseScene.propTypes = {
  areaPotions: PropTypes.array,
  industryOptions: PropTypes.array,
  authUserId: PropTypes.string,
  authUserInfo: PropTypes.object,
  isUploadSuccess: PropTypes.bool,
  activitiesLoading: PropTypes.bool,
  onUpload: PropTypes.func,
  loadActivities: PropTypes.func,
  onReleaseActivities: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  areaPotions: selectAreaOptions,
  industryOptions: selectIndustryOptions,
  authUserId: selectAuthUserId,
  authUserInfo: selectAuthUserInfo,
  isUploadSuccess: selectIsUploadSuccess,
  activitiesLoading: selectActivitiesLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onUpload: (field, fileBuffer) => {
    dispatch(saveUploadFileField({ field, fileBuffer }));
  },
  onReleaseActivities: (formData, uploadFilefiled) => dispatch(releaseActivitiesAction(formData, uploadFilefiled)),
  loadActivities: (params) => dispatch(loadActivitiesAction(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'myReleaseScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(MyReleaseScene);
