/**
*
* TabIcon Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Image,
} from 'react-native';
import {
  View,
} from 'native-base';


import {
  selectNewsNoReadNumber,
} from 'containers/MyNewsScene/selectors';
import TranslateText from 'components/TranslateText';

import {
  FOOTER_BUTTONS,
} from './constants';
import styles from './styles';

const TabIcon = (props) => {
  const { noReadNumber, focused, navigation: { state: { key } } } = props;

  let source = FOOTER_BUTTONS[key].greyImage;
  const footerLabelStyles = [styles.footerText];
  if (focused) {
    source = FOOTER_BUTTONS[key].activeImage;
    footerLabelStyles.push(styles.footerActiveText);
  }

  return (
    <View style={styles.columnCenter}>
      <View style={[styles.columnCenter, styles.redDotView]}>
        <Image source={source} style={styles.footerImage} />
        { (key === 'my' && !!noReadNumber) && <View style={styles.redDot} /> }
      </View>
      <TranslateText label={key} style={footerLabelStyles} />
    </View>
  );
};

TabIcon.defaultProps = {
  noReadNumber: 0,
};

TabIcon.propTypes = {
  navigation: PropTypes.object.isRequired,
  focused: PropTypes.bool.isRequired,
  noReadNumber: PropTypes.number,
};

const mapStateToProps = createPropsSelector({
  noReadNumber: selectNewsNoReadNumber,
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(TabIcon);
