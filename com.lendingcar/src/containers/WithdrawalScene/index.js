/**
 *
 * WithdrawalScene Container
 *
 */

// /* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Icon,
} from 'native-base';

import FormScene from 'components/FormScene';

import WithdrawalForm from 'forms/WithdrawalForm';

import { selectIsLoading } from 'containers/AppRouter/selectors';

import styles from './styles';

export class WithdrawalScene extends React.Component { // eslint-disable-line

  onLabelIconPress = () => { // TODO: need add new page

  }

  renderRightButton() {
    return (
      <Icon
        style={styles.questionIcon}
        name="question"
        type="SimpleLineIcons"
        onPress={this.onLabelIconPress}
      />
    );
  }
  render() {
    const { isLoading, availableBalance } = this.props;

    return (
      <FormScene
        isLoading={isLoading}
        validBack={false}
        title="withdrawal"
        rightButton={this.renderRightButton()}
        scrollEnabled={false}
        alertTitle="confirmWithdrawal"
        alertMessage="confirmWithdrawalTip"
        component={WithdrawalForm}
        availableBalance={availableBalance}
      />
    );
  }
}

WithdrawalScene.defaultProps = {
  availableBalance: 0,
};

WithdrawalScene.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  availableBalance: PropTypes.number,
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(WithdrawalScene);
