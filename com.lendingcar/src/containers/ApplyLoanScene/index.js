/**
 *
 * ApplyLoanScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { Image } from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getImmutableData } from 'utils/helpers';

import { updateFormAction } from 'containers/AppRouter/actions';

import AppHeader from 'components/AppHeader';
import EmergencyContactsForm from 'forms/EmergencyContactsForm';
import FurtherInfomationForm from 'forms/FurtherInfomationForm';

import stepOneImage from 'assets/stepOne.png';
import centerStepUnActiveImage from 'assets/centerStepUnActive.png';
import centerStepActiveImage from 'assets/centerStepActive.png';
import lastStepUnActiveImage from 'assets/lastStepUnActive.png';
import lastStepActiveImage from 'assets/lastStepActive.png';

import LoanFirstStep from './components/LoanFirstStep';
import LoanSecondStep from './components/LoanSecondStep';
import LoanSuccess from './components/LoanSuccess';

import { selectLoanBooking, selectIsLoading } from './selectors';
import { loadLoanBookingsActions } from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class ApplyLoanScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      currentForm: '',
    };
  }
  componentWillMount() {
    const { loanBooking, loadLoanBookings } = this.props;
    const { currentStep } = this.state;
    if (!loanBooking) {
      loadLoanBookings();
    } else {
      this.setState({
        currentForm: loanBooking,
        currentStep: currentStep + 1,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { loanBooking } = this.props;
    const { currentStep } = this.state;
    if (loanBooking !== nextProps.loanBooking) {
      this.setState({
        currentForm: nextProps.loanBooking,
        currentStep: currentStep + 1,
      });
    }
  }

  goBack = () => {
    Actions.pop();
  }

  getAPIPath = () => {
    const { loanBooking } = this.props;
    const { currentForm } = this.state;
    let formId = null;
    if (loanBooking || currentForm) {
      formId = currentForm.id || currentForm._id; // eslint-disable-line
      return `api/loan/${formId}`;
    }
    return 'api/loan';
  }
  onSubmit = (formValue) => {
    const { updateForm } = this.props;
    updateForm(formValue, this.getAPIPath(), null, true, this.submitNextStep);
  }
  updateProfileForm = (key, formValue) => {
    const { updateForm, loanBooking } = this.props;
    const { currentForm } = this.state;

    const formMap = getImmutableData(currentForm || loanBooking).update(key, () => formValue.get(key));
    updateForm(formMap, this.getAPIPath(), null, false, this.submitNextStep);
  }
  submitNextStep = (successMessage) => {
    const { currentStep } = this.state;
    if (successMessage) {
      this.setState({ currentForm: successMessage });
    }
    this.setState({ currentStep: currentStep + 1 });
  }
  nextStep = () => {
    const { currentStep } = this.state;
    this.setState({ currentStep: currentStep + 1 });
  }

  renderWarningView = () => (
    <View style={styles.warningView}>
      <Text style={styles.warningText}>{translate('loanWarning')}</Text>
    </View>
  )
  renderStepView = () => {
    const { currentStep } = this.state;
    const stepList = [
      {
        image: stepOneImage,
        label: 'profile',
      },
      {
        image: currentStep >= 2 ? centerStepActiveImage : centerStepUnActiveImage,
        label: 'testResult',
      },
      {
        image: currentStep >= 3 ? centerStepActiveImage : centerStepUnActiveImage,
        label: 'emergencyContact',
      },
      {
        image: currentStep >= 4 ? lastStepActiveImage : lastStepUnActiveImage,
        label: 'furtherInfomation',
      },
    ];
    return (
      <View style={styles.stepView}>
        {stepList.map((item, index) => {
          const itemImageStyles = [styles.itemImage];
          const labelViewStyles = [styles.labelView];
          if (index === 0) itemImageStyles.push(styles.firstImage);
          if (index === stepList.length - 1) {
            itemImageStyles.push(styles.lastImage);
            labelViewStyles.push(styles.lastLabelView);
          }
          return (
            <View style={styles.item} key={item.label}>
              <Image source={item.image} style={itemImageStyles} resizeMode="contain" />
              <View style={labelViewStyles}>
                <Text style={styles.itemText}>{translate(item.label)}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
  renderFirstStep = () => {
    const { carInfo } = this.props;
    const DEFAULT_CARD_OPTIONS = [
      {
        label: 'downPayment',
        value: carInfo.loanRelated.defaultDownPayment,
        note: 'refund',
      },
      {
        label: 'monthly',
        value: carInfo.loanRelated.defaultMonthly,
        note: 'noRefundable',
      },
    ];
    return (
      <LoanFirstStep
        carInfo={carInfo}
        onSubmit={this.onSubmit}
        renderPayMentCard={this.renderPayMentCard}
        defaultCardOptions={DEFAULT_CARD_OPTIONS}
      />
    );
  }
  renderSecondStep = () => {
    const { carInfo } = this.props;
    const CARD_OPTIONS = [
      {
        label: 'downPayment',
        value: carInfo.loanRelated.downPayment,
        note: 'refund',
      },
      {
        label: 'monthly',
        value: carInfo.loanRelated.monthly,
        note: 'noRefundable',
      },
    ];
    return (
      <LoanSecondStep
        carInfo={carInfo}
        onSubmit={this.nextStep}
        renderPayMentCard={this.renderPayMentCard}
        cardOptions={CARD_OPTIONS}
        nextStep={this.nextStep}
        goBack={this.goBack}
      />
    );
  }
  renderThirdStep = () => (
    <View style={styles.stepContent}>
      <EmergencyContactsForm onSubmit={(formValue) => this.updateProfileForm('emergencyContacts', formValue)} />
    </View>
  )
  renderFourthStep = () => (
    <View style={styles.stepContent}>
      <FurtherInfomationForm onSubmit={(formValue) => this.updateProfileForm('coApplicants', formValue)} />
    </View>
  )
  renderPayMentCard = (cardOptions) => (
    <View style={styles.payMentCard}>
      {cardOptions.map((item) => this.renderPayMentCardItem(item.label, item.value, item.note))}
    </View>
  )
  renderPayMentCardItem = (label, value, note) => (
    <View style={styles.cardItem} key={label}>
      <Text style={styles.cardItemLabel}>{translate(label)}</Text>
      {translate(value, 'dollar', styles.priceStyle)}
      <Text style={styles.cardItemNote}>{translate(note)}</Text>
    </View>
  )
  renderCurrentContent = () => {
    const { currentStep } = this.state;
    const contentList = [
      this.renderFirstStep(),
      this.renderSecondStep(),
      this.renderThirdStep(),
      this.renderFourthStep(),
    ];
    return contentList[currentStep - 1];
  }

  render() {
    const { isLoading } = this.props;
    const { currentStep } = this.state;
    return (
      <Container>
        <AppHeader title="applyLoan" />

        <Content
          contentContainerStyle={styles.contentContainer}
          keyboardDismissMode={styles.isIOS ? 'on-drag' : 'none'}
          enableOnAndroid
          enableResetScrollToCoords={false}
          style={styles.content}
        >
          { currentStep <= 4 && this.renderWarningView() }
          { (!isLoading && currentStep <= 4) && this.renderStepView() }
          { (!isLoading && currentStep <= 4) && this.renderCurrentContent() }
          { currentStep > 4 && <LoanSuccess goBack={this.goBack} /> }
        </Content>
      </Container>
    );
  }
}

ApplyLoanScene.defaultProps = {
  loanBooking: null,
  isLoading: true,
  updateForm: () => null,
  loadLoanBookings: () => null,
};

ApplyLoanScene.propTypes = {
  carInfo: PropTypes.object.isRequired,
  loanBooking: PropTypes.object,
  isLoading: PropTypes.bool,
  updateForm: PropTypes.func,
  loadLoanBookings: PropTypes.func,
};

const mapStateToProps = createPropsSelector({
  loanBooking: selectLoanBooking,
  isLoading: selectIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  updateForm: (formMap, _dispatch, endPoint, isCreate, onBack) => dispatch(updateFormAction(formMap, _dispatch, endPoint, isCreate, onBack)),
  loadLoanBookings: () => dispatch(loadLoanBookingsActions()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'applyLoanScene', reducer });

const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  withConnect,
)(ApplyLoanScene);
