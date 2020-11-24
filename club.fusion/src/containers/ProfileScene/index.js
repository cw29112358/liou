/**
 *
 * ProfileScene Container
 *
 */

/* global translate */
import React from 'react';
import PropTypes from 'prop-types';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  View,
} from 'native-base';
import {
  SectionList,
  ImageBackground,
  ScrollView,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { LINEAR_PROPS } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  selectAuthUserId,
  selectIsLoading,
  selectAuthUserInfo,
} from 'containers/AppRouter/selectors';
import {
  loadFormAction,
  updatePublicProfilesAction,
} from 'containers/AppRouter/actions';
import {
  selectIsLoading as selectFavouritesLoading,
} from 'containers/MyFavouritesScene/selectors';
import { selectConnectionsUserIds } from 'containers/MyConnectionScene/selectors';

import FormScene from 'components/FormScene';
import ProfileCard from 'components/ProfileCard';
import AppHeader from 'components/AppHeader';
import AppStatusBar from 'components/AppStatusBar';
import ProfileButtonGroup from 'components/ProfileButtonGroup';
import FilterBar from 'components/FilterBar';
import ProjectLargeList from 'components/ProjectLargeList';
import EmptyList from 'components/EmptyList';
import ImageViewerModal from 'components/ImageViewerModal';

import ProfileForm from 'forms/ProfileForm';

import {
  SHOW_OPTIONS,
} from './constants';
import { loadUserActivitiesAction } from './actions';
import {
  selectSortActivities,
  selectActivitiesLoading,
  selectProfile,
} from './selectors';
import reducer from './reducer';
import sagas from './sagas';
import styles, { topPartHeight } from './styles';

export class ProfileScene extends React.Component {
  constructor(props) {
    super(props);

    const profile = props.profile || {};
    this.realAuthUser = profile;

    this.initActivities = [{
      dimHeight: topPartHeight,
      rowRenderer: this.renderTopPart,
    }];

    this.hasRefresh = true;
    const showOptionIndex = 0;
    this.state = {
      headerHeight: styles.headerHeight,
      showOptionIndex,
      isOthers: profile.id !== props.myProfileId,
      showAvatarModal: false,
    };
    this.loadActivities(true);
    this.loadProfile();
  }
  componentWillUnmount() {
    this.setState = () => null;
  }

  loadActivities = (isFirstLoad = false) => {
    if (!this.hasRefresh) return;
    const { profile: { user }, loadUserActivities } = this.props;
    loadUserActivities(user, isFirstLoad);
  }
  loadProfile = () => {
    if (!this.hasRefresh) return;
    const { profile: { id: profileId }, loadForm, updatePublicProfiles } = this.props;
    this.formloading = true;
    const onSuccess = (profile) => {
      updatePublicProfiles(profile);
      this.formloading = false;
    };
    loadForm(`api/profiles/${profileId}`, ['profileScene', 'profile'], onSuccess);
  }

  setHasRefresh = (nextHasRefresh) => {
    if (this.hasRefresh !== nextHasRefresh) {
      this.hasRefresh = nextHasRefresh;
      this.refreshRef.setNativeProps({
        enabled: this.hasRefresh,
      });
    }
  }
  onScrollList = (e) => {
    const { contentOffset: { y } } = e.nativeEvent;
    this.setHasRefresh(y === 0);
  }

  onLayoutHeader = (e) => {
    const { layout: { height } } = e.nativeEvent;
    if (height) this.setState({ headerHeight: height });
  }
  linkToProject = (route, params) => {
    Actions.push(route, params);
  }

  onShowAvatarModal = () => {
    this.setState({ showAvatarModal: true });
  }
  onHideAvatarModal = () => {
    this.setState({ showAvatarModal: false });
  }
  onPressShowOption = ({ index }) => {
    const { showOptionIndex } = this.state;
    if (showOptionIndex !== index) {
      this.setState({ showOptionIndex: index });
      this.listScrollView.scrollToIndex(0, 0, false);
      this.formScrollView.scrollTo({ x: 0, y: 0, animated: false });
      this.setHasRefresh(true);
    }
  }

  /* render */
  renderTopPart = (optionIndex = 0) => (
    <View style={styles.topPart}>
      <ImageBackground
        {...styles.halfCircleImageProps}
      >
        <ProfileCard user={this.realAuthUser} onPress={this.realAuthUser.avatar ? this.onShowAvatarModal : undefined} />
      </ImageBackground>
      { this.renderShowOptions(optionIndex) }
    </View>
  )
  renderShowOptions = (optionIndex) => {
    const showOption = SHOW_OPTIONS[optionIndex].label;
    const options = SHOW_OPTIONS.map((item, index) => {
      if (item.label !== showOption) return item;

      return {
        ...item,
        ...LINEAR_PROPS,
        linearStyle: {
          borderRadius: 6,
          [index === 0 ? 'marginRight' : 'marginLeft']: 31,
        },
      };
    });

    return (
      <FilterBar
        showTitle={false}
        options={options}
        onSelect={this.onPressShowOption}
        selectedOption={showOption}
        buttonStyle={styles.showButton}
        textStyle={styles.showText}
        activeButtonStyle={styles.showActiveButton}
        activeTextStyle={styles.showActiveText}
        filterViewStyle={styles.showFilterView}
      />
    );
  }

  renderOutsideContent = () => {
    const { isOthers, showAvatarModal } = this.state;

    return [
      <AppStatusBar key={0} />,
      isOthers ? this.renderFooter() : undefined,
      this.realAuthUser.avatar ? this.renderAvatarModal(showAvatarModal) : undefined,
    ];
  }
  renderAvatarModal = (showAvatarModal) => (
    <ImageViewerModal
      key={1}
      images={[this.realAuthUser.avatar]}
      modalVisible={showAvatarModal}
      onHideModal={this.onHideAvatarModal}
      renderIndicator={() => null}
    />
  )
  renderFooter = () => (
    <LinearGradient
      key={2}
      start={{ x: 0.3, y: 1 }}
      end={{ x: 0.8, y: 1 }}
      colors={LINEAR_PROPS.linearColors}
      style={styles.footer}
    >
      <ProfileButtonGroup
        hasSplit
        profile={this.realAuthUser}
      />
    </LinearGradient>
  )

  renderHeader = () => [
    <ImageBackground
      {...styles.topExtendImageProps}
    />,
    <AppHeader
      key={2}
      hasStatusBar={false}
      title="personalCenter"
      onLayout={this.onLayoutHeader}
    />,
  ]
  renderItem = () => {
    const { headerHeight, isOthers } = this.state;
    return (
      <View
        style={{
          height: styles.deviceHeight - headerHeight,
          paddingBottom: isOthers ? styles.footerHeight : 0,
        }}
      >
        { this.renderEmptyList() }
        { this.renderTwoColumn() }
      </View>
    );
  }
  renderEmptyList = () => (
    <View style={{ flex: 1 }}>
      { this.renderTopPart(0) }
      <EmptyList
        label="noContent"
        imageViewStyle={styles.emptyList}
        scrollEnabled={false}
      />
    </View>
  );

  renderTwoColumn = () => {
    const { activities } = this.props;
    const { showOptionIndex } = this.state;
    const noEmpty = !!activities.length;

    let translateX = 0;
    if (showOptionIndex === 1 || (showOptionIndex === 0 && noEmpty)) {
      translateX = (-showOptionIndex - 1) * styles.deviceWidth;
    }

    return (
      <View
        style={[
          styles.twoColumn,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        { this.renderActivityList(activities) }
        { this.renderProflieView() }
      </View>
    );
  }
  renderActivityList = (activities) => (
    <ProjectLargeList
      noRefresh
      listData={this.initActivities.concat(activities)}
      isLinkToProfile={false}
      isShowCardFooter={false}
      linkTo={this.linkToProject}
      style={styles.largeList}
      refList={(ref) => { this.listScrollView = ref; }}
      onScroll={this.onScrollList}
    />
  )

  renderProflieView = () => {
    const { myProfileId } = this.props;
    const { isOthers } = this.state;

    return (
      <ScrollView
        style={styles.secondColumn}
        ref={(ref) => { this.formScrollView = ref; }}
        onScroll={this.onScrollList}
      >
        { this.renderTopPart(1) }
        <ProfileForm
          authUser={this.realAuthUser} // 显示用户profile
          authUserId={myProfileId} // 登陆用户profileId
          isOthers={isOthers}
        />
      </ScrollView>
    );
  }

  render() {
    const {
      otherProfile, profile, myProfile, friendsUserIds,
      favouritesLoading, isLoading, activitiesLoading,
    } = this.props;
    const { isOthers, showOptionIndex } = this.state;

    if (!isOthers) { // 本人
      this.realAuthUser = myProfile;
    } else if (otherProfile.id) {
      this.realAuthUser = otherProfile;
    } else {
      this.realAuthUser = profile;
    }
    this.realAuthUser.isFriend = friendsUserIds.includes(profile.user);

    return (
      <FormScene
        noHeader
        contentContainerStyle={{ flex: 1 }}
        contentStyle={{ flex: 1 }}
        scrollEnabled={false}
        renderOutsideContent={this.renderOutsideContent}
        isLoading={favouritesLoading || (!this.formloading && isLoading)}
      >
        <SectionList
          stickySectionHeadersEnabled
          renderItem={this.renderItem}
          renderSectionHeader={this.renderHeader}
          sections={[{ key: 'header', data: [{ }] }]}
          keyExtractor={(item, index) => item + index}
          refreshControl={(
            <RefreshControl
              {...styles.refreshControlProps}
              ref={(ref) => { this.refreshRef = ref; }}
              refreshing={activitiesLoading || (this.formloading && isLoading)}
              onRefresh={showOptionIndex ? this.loadProfile : this.loadActivities}
              title={translate('loading')}
            />
          )}
        />
      </FormScene>
    );
  }
}

ProfileScene.defaultProps = {
  profile: {},
};

ProfileScene.propTypes = {
  profile: PropTypes.object,
  friendsUserIds: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  myProfileId: PropTypes.string.isRequired,
  myProfile: PropTypes.object.isRequired,
  otherProfile: PropTypes.object.isRequired,
  activities: PropTypes.array.isRequired,
  activitiesLoading: PropTypes.bool.isRequired,
  favouritesLoading: PropTypes.bool.isRequired,
  loadUserActivities: PropTypes.func.isRequired,
  loadForm: PropTypes.func.isRequired,
  updatePublicProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  friendsUserIds: selectConnectionsUserIds,
  isLoading: selectIsLoading,
  myProfileId: selectAuthUserId,
  myProfile: selectAuthUserInfo,
  otherProfile: selectProfile,
  activities: selectSortActivities,
  activitiesLoading: selectActivitiesLoading,
  favouritesLoading: selectFavouritesLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadUserActivities: (userId, isFirstLoad, onSuccess) => dispatch(loadUserActivitiesAction(userId, isFirstLoad, onSuccess)),
  loadForm: (path, reduxEndPoint, onSuccess) => dispatch(loadFormAction(path, reduxEndPoint, onSuccess)),
  updatePublicProfiles: (profile) => dispatch(updatePublicProfilesAction({ profile })),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(ProfileScene);
