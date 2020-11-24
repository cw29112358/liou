/**
 *
 * VerifiedResultScene Stateless Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Image,
} from 'react-native';

import {
  selectIsLoading,
  selectAuthUserInfo,
} from 'containers/AppRouter/selectors';
import {
  loadFormAction,
  updatePublicProfilesAction,
} from 'containers/AppRouter/actions';

import FullScreenScene from 'components/FullScreenScene';
import TranslateText from 'components/TranslateText';
import Button from 'components/Button';

import { RESOURCE } from './constants';
import styles from './styles';

class VerifiedResultScene extends React.Component {
  constructor(props) {
    super(props);

    this.validStatus(props);
  }
  validStatus(props) {
    const { profile: { verificationStatus } } = props;
    if (!Object.keys(RESOURCE).includes(verificationStatus)) {
      Actions.pop();
    }
  }
  loadProfile = () => {
    const { profile: { id: profileId }, loadForm, updatePublicProfiles } = this.props;
    const onSuccess = (profile) => {
      updatePublicProfiles(profile);
    };
    loadForm(`api/profiles/${profileId}`, ['appRouter', 'users', profileId, 'profile'], onSuccess);
  }

  render() {
    const { isLoading, profile: { verificationStatus } } = this.props;
    const currentResource = RESOURCE[verificationStatus] || RESOURCE.pending;
    const {
      image, title, content, buttonLabel, buttonOnPress,
    } = currentResource;

    return (
      <FullScreenScene
        headerTitle="verifiedResult"
        contentStyle={styles.content}
        contentContainerStyle={styles.contentContainer}
        hasRefresh
        refreshing={isLoading}
        onRefresh={this.loadProfile}
      >
        <Image source={image} style={styles.image} />
        <TranslateText label={title} style={styles.title} />

        {
          content.map(({ style, ...otherProps }, id) => {
            const key = id;
            return <TranslateText key={key} style={[styles.text, style]} {...otherProps} numberOfLines={4} />;
          })
        }
        <Button
          onPress={buttonOnPress}
          style={styles.linearButton}
          textLabel={buttonLabel}
          textStyle={styles.linearButtonText}
          {...styles.linearProps}
          shadowStyle={styles.linearParent}
        />
      </FullScreenScene>
    );
  }
}

VerifiedResultScene.defaultProps = {
};

VerifiedResultScene.propTypes = {
};

VerifiedResultScene.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  loadForm: PropTypes.func.isRequired,
  updatePublicProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
  profile: selectAuthUserInfo,
});

const mapDispatchToProps = (dispatch) => ({
  loadForm: (path, reduxEndPoint, onSuccess) => dispatch(loadFormAction(path, reduxEndPoint, onSuccess)),
  updatePublicProfiles: (profile) => dispatch(updatePublicProfilesAction({ profile })),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(VerifiedResultScene);
