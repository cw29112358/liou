/**
*
* ModalScene Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import FullScreenScene from 'components/FullScreenScene';


class ModalScene extends React.Component {
  getHeaderProps() {
    return {
      leftIconName: 'close',
      hasRight: false,
      hiddenBorder: true,
      hasShadow: false,
    };
  }

  render() {
    const { scrollEnabled, ...otherProps } = this.props;
    const headerProps = this.getHeaderProps();

    return (
      <FullScreenScene
        headerProps={headerProps}
        isWithPadding
        scrollEnabled={scrollEnabled}
        {...otherProps}
      />
    );
  }
}

ModalScene.defaultProps = {
  scrollEnabled: false,
};

ModalScene.propTypes = {
  scrollEnabled: PropTypes.bool,
};

export default ModalScene;
