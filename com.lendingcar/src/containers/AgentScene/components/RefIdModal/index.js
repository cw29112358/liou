/**
*
* RefIdModal Component
*
*/

/* global translate toast */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
} from 'native-base';

import { selectIsLoading } from 'containers/AppRouter/selectors';

import RefIdForm from 'forms/RefIdForm';

import styles from './styles';

class RefIdModal extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { isLoading, setIsLoading } = this.props;
    if (isLoading !== nextProps.isLoading) {
      setIsLoading(nextProps.isLoading);
    }
  }
  onBack = () => {
    Actions.pop();
    toast(translate('recommendSuccess'));
  };

  render() {
    return (
      <View>
        <Text style={styles.title}>{translate('refIdTitle')}</Text>
        <Text style={styles.tip}>{translate('refIdTip')}</Text>
        <RefIdForm onFormSuccess={this.onBack} />
      </View>
    );
  }
}

RefIdModal.defaultProps = {
};

RefIdModal.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(RefIdModal);
