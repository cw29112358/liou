/**
 *
 * SimpleProfileScene Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ImageBackground } from 'react-native';

import variables from 'platform';

import { selectIsLoading } from 'containers/AppRouter/selectors';

import FormScene from 'components/FormScene';

import SimpleProfileForm from 'forms/SimpleProfileForm';
import styles from 'forms/styles';

const {
  deviceHeight,
} = variables;

class SimpleProfile extends React.Component {
  // refId input
  onFocusRefId = () => {
    this.focusRefId = true;
    if (this.showKeyboard) this.onScrollTarget();
  }
  onBlurRefId = () => {
    this.focusRefId = false;
  }

  // 键盘
  onKeyboardWillShow = () => {
    this.showKeyboard = true;
    if (this.focusRefId) this.onScrollTarget();
  }
  onKeyboardWillHide = () => {
    this.showKeyboard = false;
    this.onScrollTo(0);
  }

  // 滑动
  onScrollTarget() {
    const isScroll = deviceHeight < 840;
    if (!isScroll) return;
    this.onScrollTo(170);
  }
  onScrollTo(y) {
    if (!this.contentRef) return;
    this.contentRef.scrollToPosition(0, y);
  }

  getContentRef = (ref) => {
    this.contentRef = ref;
  }

  render() {
    const { isLoading } = this.props;
    return (
      <ImageBackground {...styles.bgImageProps}>
        <FormScene
          title="signUp"
          headerProps={{
            headerSettings: {
              transparent: true,
            },
            hasLeft: false,
            hasRight: false,
          }}
          isLoading={isLoading}
          contentRef={this.getContentRef}
          contentProps={{
            onKeyboardWillShow: this.onKeyboardWillShow,
            onKeyboardWillHide: this.onKeyboardWillHide,
            enableAutomaticScroll: false,
          }}
          containerStyle={{ backgroundColor: 'transparent' }}
        >
          <SimpleProfileForm
            onFocusRefId={this.onFocusRefId}
            onBlurRefId={this.onBlurRefId}
          />
        </FormScene>
      </ImageBackground>
    );
  }
}


SimpleProfile.defaultProps = {
};

SimpleProfile.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(SimpleProfile);
