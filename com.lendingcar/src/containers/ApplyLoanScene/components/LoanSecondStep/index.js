/**
*
* LoanSecondStep Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Button,
  Text,
} from 'native-base';

import styles from './styles';

const LoanSecondStep = (props) => {
  const {
    carInfo, renderPayMentCard, cardOptions,
    nextStep, goBack,
  } = props;

  const renderLoanRatesPart = () => (
    <View style={styles.ratesPart}>
      <Text style={styles.ratePercent}>{carInfo.loanRate.toFixed(2)}%</Text>
      <Text style={styles.ratesNote}>{translate('ratesNotePrefix')}</Text>
      <Text style={styles.ratesNote}>{translate('ratesNoteSuffix')}</Text>
    </View>
  );
  return (
    <View style={styles.stepView}>
      <Text style={styles.stepTitle}>{translate('secondStepTitle')}</Text>
      { renderLoanRatesPart() }
      <Text style={styles.stepLabel}>{translate('loanReference')}</Text>
      <Text style={styles.stepNote}>{translate('itemDeposit')} {translate(carInfo.depositPrice, 'dollar')} {translate('loanReferenceNote')}</Text>
      { renderPayMentCard(cardOptions) }
      <Button style={styles.nextButton} onPress={nextStep}>
        <Text style={styles.nextButtonText}>{translate('next')}</Text>
      </Button>
      <Button transparent style={styles.backButton} onPress={goBack}>
        <Text style={styles.backButtonText}>{translate('back')}</Text>
      </Button>
    </View>
  );
};

LoanSecondStep.defaultProps = {
  carInfo: null,
  cardOptions: [],
  renderPayMentCard: () => null,
  nextStep: () => null,
  goBack: () => null,
};

LoanSecondStep.propTypes = {
  carInfo: PropTypes.object,
  cardOptions: PropTypes.array,
  renderPayMentCard: PropTypes.func,
  nextStep: PropTypes.func,
  goBack: PropTypes.func,
};

export default LoanSecondStep;
