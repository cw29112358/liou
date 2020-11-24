/**
*
* Avatar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { getImageUrl } from 'utils/helpers';
import classNames from 'classnames';
import defaultLogo from './default.png';
import './style.scss';

function Avatar(props) {
  const { url, className, width, height, ...otherProps } = props;
  const absoluteUrl = url ? getImageUrl(url, '300x300') : defaultLogo;
  const imgClassName = classNames({
    avatar: true,
    [className]: true,
  });
  return (
    <img className={imgClassName} role="presentation" src={absoluteUrl} width={width} height={height} {...otherProps} />
  );
}

Avatar.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Avatar;
