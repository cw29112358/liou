/**
*
* LoanFirstStep Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'native-base';

import BorrowerInformationForm from 'forms/BorrowerInformationForm';

import styles from './styles';

const LoanFirstStep = (props) => {
  const {
    carInfo, renderPayMentCard, defaultCardOptions, onSubmit,
  } = props;
  return (
    <View style={styles.firstStep}>
      <Text style={styles.firstStepLabel}>{translate('loanReference')}</Text>
      <Text style={styles.firstStepNote}>{translate('itemDeposit')} {translate(carInfo.depositPrice, 'dollar')} {translate('loanReferenceNote')}</Text>
      { renderPayMentCard(defaultCardOptions) }
      <Text style={styles.formTitle}>{translate('firstFormTitle')}</Text>
      <BorrowerInformationForm onSubmit={onSubmit} />
    </View>
  );
};

LoanFirstStep.defaultProps = {
  carInfo: null,
  defaultCardOptions: [],
  renderPayMentCard: () => null,
  onSubmit: () => null,
};

LoanFirstStep.propTypes = {
  carInfo: PropTypes.object,
  defaultCardOptions: PropTypes.array,
  renderPayMentCard: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default LoanFirstStep;
