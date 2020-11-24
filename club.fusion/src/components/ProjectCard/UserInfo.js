/**
*
* ProjectCard Component
*
*/

// /* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  View,
} from 'native-base';

import ProfileCard from 'components/ProfileCard';

import defaultCollectionImage from './assets/defaultCollection.png';
import activeCollectionImage from './assets/activeCollection.png';
import styles from './styles';

const UserInfo = (props) => {
  const {
    project, linkTo, isLinkToProfile, changeFavourites,
  } = props;
  const collectionImageSource = project.isFavourite ? activeCollectionImage : defaultCollectionImage;
  const avatarProps = {
    avatarStyle: styles.avatarStyle,
  };
  const formatProfile = (user, format) => ({
    ...format(user),
    avatarRowStyle: { flex: 1 },
  });
  return (
    <View style={styles.useInfoLine}>
      <ProfileCard
        onlyAvatar
        user={project.profile || {}}
        format={formatProfile}
        avatarProps={avatarProps}
        onPress={isLinkToProfile ? () => linkTo('profile', { profile: project.profile }) : null}
      />
      <View style={styles.toucableView}>
        <TouchableOpacity onPress={() => changeFavourites(project)}>
          <Image source={collectionImageSource} style={styles.collectionImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

UserInfo.defaultProps = {
  isLinkToProfile: true, // 设置为 false 可阻止 profile 跳转
  linkTo: () => null,
  changeFavourites: () => null,
};

UserInfo.propTypes = {
  project: PropTypes.object.isRequired,
  isLinkToProfile: PropTypes.bool,
  linkTo: PropTypes.func,
  changeFavourites: PropTypes.func,
};

export default UserInfo;
