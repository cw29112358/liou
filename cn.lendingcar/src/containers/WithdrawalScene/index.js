/**
 *
 * WithdrawalScene Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Icon,
  Text,
} from 'native-base';

import { SERVICE_TEL_SPLIT } from 'utils/constants';

import FormScene from 'components/FormScene';
import TranslateText from 'components/TranslateText';

import WithdrawalForm from 'forms/WithdrawalForm';

import { selectIsLoading } from 'containers/AppRouter/selectors';

import styles from './styles';

export class WithdrawalScene extends React.Component { // eslint-disable-line
  onLabelIconPress = () => {
    const ruleList = [
      { label: 'withdrawalRule', style: styles.ruleTitle },
      { label: 'withdrawalRule0', style: { marginTop: 7.5 } },
      { label: 'withdrawalRule1', style: { marginTop: 16 } },
      { label: 'withdrawalRule2' },
      { label: 'withdrawalRule3' },
      { label: 'withdrawalRule4' },
      { label: 'withdrawalRule5' },
      { label: 'withdrawalRule6', rightChildren: <Text style={[styles.ruleText, styles.tel]}>{ ` ${SERVICE_TEL_SPLIT}` }</Text> },
    ].map((item, index) => (
      <TranslateText
        {...item}
        style={[styles.ruleText, index > 2 ? { marginTop: 12 } : {}, item.style]}
        key={item.label}
        numberOfLines={5}
        leftChildren={index > 1 && <Text style={[styles.ruleText, { fontWeight: '600' }]}>{ `${index - 1}.` }</Text>}
      />
    ));

    Actions.modal({
      children: ruleList,
    });
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
    const { isLoading } = this.props;

    return (
      <FormScene
        isLoading={isLoading}
        validBack={false}
        title="withdrawal"
        rightButton={this.renderRightButton()}
        scrollEnabled={false}
        alertTitle="confirmWithdrawal"
        alertMessage="confirmWithdrawalTip"
        saveLabel="ensure"
        component={WithdrawalForm}
        availableBalance={600}
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
