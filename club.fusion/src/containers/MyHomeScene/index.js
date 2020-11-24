/**
*
* MyHomeScene Component
*
*/

/* global window translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Container,
} from 'native-base';
import {
  SectionList,
  RefreshControl,
  ImageBackground,
} from 'react-native';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  selectAuthUserInfo,
} from 'containers/AppRouter/selectors';
import {
  selectNewsNoReadNumber,
} from 'containers/MyNewsScene/selectors';

import ProfileCard from 'components/ProfileCard';
import AppHeader from 'components/AppHeader';
import AppStatusBar from 'components/AppStatusBar';

import FootPrint from './components/FootPrint';
import BenefitPart from './components/BenefitPart';
import settingImage from './assets/setting.png';
import { TRACKS_OPTIONS } from './constants';
import { loadLoadMembershipsPointAction } from './actions';
import {
  selectPoints,
  selectPointsLoading,
} from './selectors';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

class MyHomeScene extends React.Component {
  componentWillMount() {
    if (Actions.currentScene === '_my') {
      this.loadLoadMembershipsPoint();
    }
  }
  loadLoadMembershipsPoint = () => {
    const { loadLoadMembershipsPoint } = this.props;
    loadLoadMembershipsPoint();
  }
  onPressAvatar = () => {
    const { authUser } = this.props;
    Actions.push('profile', { profile: authUser });
  }
  onPressTrack = ({ item, index }) => {
    const { sceneKey } = item;
    const callback = () => {
      Actions.push(sceneKey);
    };
    const isValid = index === 2;
    window.validRights(callback, false, isValid);
  }
  onPressBenefit = ({ index, options, points }) => {
    Actions.push('memberBenefit', {
      benefits: options,
      index,
      points,
    });
  }
  onPressSetting = () => {
    Actions.push('setting');
  }

  /* render */
  renderHeader = () => [
    <ImageBackground
      {...styles.topExtendImageProps}
    />,
    <AppHeader
      key={2}
      hasStatusBar={false}
      title="myHome"
      hasLeft={false}
      hasRight
      rightPress={this.onPressSetting}
      rightImage={settingImage}
      rightIconStyle={styles.settingImage}
    />,
  ]

  renderItem = ({ item: { authUser, newsNoReadNumber, points } }) => [
    this.renderProfileCard(authUser),
    this.renderTracks(newsNoReadNumber),
    this.renderBenefitPart(points),
  ]
  renderProfileCard = (authUser) => (
    <ImageBackground
      {...styles.halfCircleImageProps}
    >
      <ProfileCard
        user={authUser}
        onPress={this.onPressAvatar}
      />
    </ImageBackground>
  )
  renderTracks = (newsNoReadNumber) => (
    <FootPrint
      key={2}
      newsNoReadNumber={newsNoReadNumber}
      options={TRACKS_OPTIONS}
      onSelect={this.onPressTrack}
    />
  )
  renderBenefitPart = (points) => {
    const benefitOptions = Object
      .entries(points)
      .filter(([key]) => key !== 'total')
      .map(([key, value]) => ({
        title: key,
        detail: `${key}Detail`,
        moreDetail: `${key}Text`,
        ...value,
      }));
    return (
      <BenefitPart
        key={3}
        options={benefitOptions}
        onPress={this.onPressBenefit}
        points={points.total}
      />
    );
  }

  render() {
    const {
      authUser, newsNoReadNumber, points, pointsLoading,
    } = this.props;
    return (
      <Container>
        <AppStatusBar />
        <SectionList
          contentContainerStyle={styles.sectionList}
          stickySectionHeadersEnabled
          renderItem={this.renderItem}
          renderSectionHeader={this.renderHeader}
          sections={[{ key: '0', data: [{ authUser, newsNoReadNumber, points }] }]}
          keyExtractor={(item, index) => item + index}
          refreshControl={(
            <RefreshControl
              {...styles.refreshControlProps}
              refreshing={pointsLoading}
              onRefresh={this.loadLoadMembershipsPoint}
              title={translate('loading')}
            />
          )}
        />
      </Container>
    );
  }
}

MyHomeScene.defaultProps = {
};

MyHomeScene.propTypes = {
  authUser: PropTypes.object.isRequired,
  newsNoReadNumber: PropTypes.number.isRequired,
  points: PropTypes.object.isRequired,
  pointsLoading: PropTypes.bool.isRequired,
  loadLoadMembershipsPoint: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  authUser: selectAuthUserInfo,
  newsNoReadNumber: selectNewsNoReadNumber,
  points: selectPoints,
  pointsLoading: selectPointsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadLoadMembershipsPoint: () => dispatch(loadLoadMembershipsPointAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);


const withReducer = injectReducer({ key: 'myHomeScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(MyHomeScene);
