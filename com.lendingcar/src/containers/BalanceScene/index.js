/**
 *
 * BalanceScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Container,
  Content,
  Text,
  View,
  Button,
  Icon,
} from 'native-base';

import {
  selectAgentProfit,
  selectWithdrawalAndProfits,
  selectWithdrawalTimes,
} from 'containers/AgentScene/selectors';

import AppHeader from 'components/AppHeader';
import RecordDetailList from 'components/RecordDetailList';
import DetailsModal from 'components/DetailsModal';

import styles from './styles';

export class BalanceScene extends React.Component {
  linkTowithdrawal = () => {
    Actions.push('withdrawalDetails');
  }
  linkToDatailsModal = (headTitle, contentText) => {
    Actions.modal({
      children: <DetailsModal
        headTitle={headTitle}
        contentText={contentText}
      />,
    });
  }
  renderBalanceDetails = () => {
    const { agentProfit, times } = this.props;
    const { balance = 0, availableBalance = 0 } = agentProfit;
    const disabled = !availableBalance || availableBalance <= 0 || times >= 2;
    const buttonStyles = [styles.buttonPosition];
    const buttonTextStyles = [];
    if (disabled) {
      buttonStyles.push(styles.disabledStyle);
      buttonTextStyles.push(styles.disabledText);
    }
    return (
      <View style={[styles.balanceView, styles.viewPadding]}>
        <Text style={styles.balanceText}>{translate(balance, 'dollar', styles.priceStyle, true)}</Text>
        <Text style={styles.balanceUnit}>
          {translate('balanceUnit')}
          <Text style={styles.balanceMoney}>{Number(availableBalance).toFixed(2)}</Text>&nbsp;&nbsp;
          <Icon
            style={styles.questionIcon}
            name="question"
            type="SimpleLineIcons"
            onPress={() => this.linkToDatailsModal('balanceUnitTitle', 'balanceUnitText')}
          />
        </Text>
        <Button
          rounded
          style={buttonStyles}
          disabled={disabled}
          onPress={() => { Actions.push('withdrawal', { availableBalance }); }}
        >
          <Text style={buttonTextStyles}>{translate('withdrawal')}</Text>
        </Button>
        <Text style={styles.timesExplainText}>{translate('paymentNotice')}
          <Text style={styles.timesText}>{ 2 - times}/2</Text>
        </Text>
      </View>
    );
  }

  renderRecordDetailList = () => {
    const { recordData } = this.props;

    return (
      <View style={[styles.recodeView, styles.viewPadding]}>
        <View style={styles.recodeTitle}>
          <Text style={styles.titleText}>{translate('balanceListTitle')}</Text>
          <Button
            style={styles.titleLeft}
            onPress={this.linkTowithdrawal}
          >
            <Text style={styles.noteText}>{translate('balanceListNote')}</Text>
            <Icon name="ios-arrow-forward" style={styles.arrowIcon} />
          </Button>
        </View>
        <RecordDetailList data={recordData} />
      </View>
    );
  }

  render() {
    return (
      <Container>
        <AppHeader title="balance" />

        <Content
          contentContainerStyle={styles.contentContainer}
          scrollEnabled={false}
        >
          { this.renderBalanceDetails() }
          { this.renderRecordDetailList() }
        </Content>
      </Container>
    );
  }
}

BalanceScene.defaultProps = {
  recordData: [],
  agentProfit: {},
  times: 0,
};

BalanceScene.propTypes = {
  recordData: PropTypes.array,
  agentProfit: PropTypes.object,
  times: PropTypes.number,
};

const mapStateToProps = createPropsSelector({
  agentProfit: selectAgentProfit,
  recordData: selectWithdrawalAndProfits,
  times: selectWithdrawalTimes,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(BalanceScene);
