/**
*
* ProjectButtonGroup Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { LINEAR_PROPS } from 'utils/constants';
import ProfileButtonGroup from 'components/ProfileButtonGroup';

import styles from './styles';

const ProjectButtonGroup = (props) => {
  const { profile, containerStyle, ...otherProps } = props;
  const formatOptions = (options) => (
    options.map((item) => ({
      ...item,
      ...LINEAR_PROPS,
      linearStyle: styles.linear,
    }))
  );

  return (
    <ProfileButtonGroup
      profile={profile}
      formatOptions={formatOptions}
      viewStyle={containerStyle}
      buttonViewStyle={styles.buttonGroup}
      buttonStyle={styles.button}
      {...otherProps}
    />
  );
};
ProjectButtonGroup.defaultProps = {
  profile: {},
  containerStyle: {},
};

ProjectButtonGroup.propTypes = {
  profile: PropTypes.object,
  containerStyle: PropTypes.object,
};

export default ProjectButtonGroup;
