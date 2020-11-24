/**
*
* AppointmentForm
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import pick from 'lodash/pick';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { Actions } from 'react-native-router-flux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import {
  Form,
  Text,
  Item,
  Label,
  View,
} from 'native-base';

import LinearGradientButton from 'components/LinearGradientButton';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';

import {
  updateFormAction,
  updateMembershipAction,
} from 'containers/AppRouter/actions';
import { selectAuthUserInfo } from 'containers/AppRouter/selectors';
import {
  selectArea,
  selectCurrentAreaConfig,
} from 'containers/HomeScene/selectors';

import {
  CALCULATE_DATE_FORMAT,
  TIME_RANGLE,
  AREA_ADDRESS,
  CITY,
  PHONE_AREA_CODE,
} from 'utils/constants';
import formValidators from 'utils/formValidators';
import { getImmutableData } from 'utils/helpers';

import styles from './styles';

const {
  isRequired, isEmail, isInternationalPhone,
} = formValidators;
const getAPIPath = (props) => {
  const { formId } = props;
  return formId ? `api/appointment/${formId}` : 'api/appointment';
};
const minDate = moment().add(2, 'days').format(CALCULATE_DATE_FORMAT);

function AppointmentForm(props) {
  const {
    handleSubmit, preferDates, carInfo, privilege, currentCity, ...otherProps
  } = props;

  const getModalDetail = () => (
    <View>
      <Text style={styles.title}>{translate('city')}</Text>
      <Text style={styles.text}>{translate('cityMessage')}</Text>
    </View>
  );

  const formFieldsObject = {
    city: {
      type: 'selectInput',
      title: 'city',
      validate: [isRequired],
      hasLabel: true,
      options: CITY,
      isTranslate: false,
      hasLabelIcon: true,
      onLabelIconPress: () => {
        Actions.modal({
          children: getModalDetail(),
        });
      },
      iconStyles: styles.icon,
      itemstyle: styles.horizontalItem.itemstyle,
      labelStyle: styles.labelStyle,
      viewWrapStyles: styles.viewWrap,
      inputStyle: styles.disableInput,
    },
    name: {
      type: 'textInput',
      validate: [isRequired],
      hasLabel: true,
      placeholder: 'placeholderFirstName',
      ...styles.horizontalItem,
    },
    phoneNumber: {
      hasLabel: true,
      label: 'phone',
      validate: [isRequired, isInternationalPhone],
      selectOptions: PHONE_AREA_CODE,
      selectTitle: 'selectPhoneArea',
      selectPlaceholderStyle: styles.placeholderStyle,
      type: 'internationalPhoneField',
      inputPlaceholderText: 'placeholderPhoneNumber',
      ...styles.horizontalItem,
    },
    email: {
      type: 'textInput',
      validate: [isRequired, isEmail],
      hasLabel: true,
      placeholder: 'placeholderEmail',
      ...styles.horizontalItem,
    },
    preferDates: {
      hasLabel: true,
      label: 'pickupDate',
      validate: [isRequired],
      isShowTime: privilege.type === 'supercar',
      type: 'dateTimeSelectRangeInput',
      options: TIME_RANGLE,
      pickerTitle: 'timePickerTitle',
      minDate,
      ...styles.horizontalItem,
    },
  };
  const formFields = [
    pick(formFieldsObject, 'city'),
  ];
  const suffixFormFields = [
    pick(formFieldsObject, 'name', 'phoneNumber', 'email', 'preferDates'),
  ];

  const renderSubmitButton = () => (
    <LinearGradientButton
      linearGradientStyle={styles.linearGradient}
      disabled={!preferDates || preferDates.size <= 0}
      onButtonPress={handleSubmit}
    />
  );
  return (
    <Form style={styles.form}>
      {formFields.map((formField) => (
        <Group
          fieldsObject={formField}
          key={formField}
          {...otherProps}
        />
      ))}
      <Item style={styles.horizontalItem.itemstyle}>
        <Label style={styles.horizontalItem.labelStyle}>{translate('address')}</Label>
        <Text style={styles.disableInput}>{AREA_ADDRESS[currentCity]}</Text>
      </Item>
      {suffixFormFields.map((formField) => (
        <Group
          fieldsObject={formField}
          key={formField}
          {...otherProps}
        />
      ))}

      <Text style={styles.darkGreyText}>{translate('appointmentTip')}</Text>
      { renderSubmitButton() }
    </Form>
  );
}

AppointmentForm.defaultProps = {
  preferDates: undefined,
  currentCity: '',
  carInfo: null,
  privilege: null,
  formId: '',
};

AppointmentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  preferDates: PropTypes.any,
  currentCity: PropTypes.string,
  carInfo: PropTypes.object,
  privilege: PropTypes.object,
  formId: PropTypes.string,
};

const FormWithError = (props) => <ValidForm {...props} component={AppointmentForm} />;

const form = reduxForm({
  form: 'appointmentForm',
  destroyOnUnmount: true,
})(FormWithError);

const selector = formValueSelector('appointmentForm');

const mapStateToProps = createPropsSelector({
  authUser: selectAuthUserInfo,
  area: selectArea,
  areaConfig: selectCurrentAreaConfig,
});
const mapDispatchToProps = (dispatch) => ({
  updateMembership: (onSuccess, onFail) => dispatch(updateMembershipAction(onSuccess, onFail)),
  onSubmit: (formMap, _dispatch, props) => {
    const {
      area, privilege, carInfo, updateMembership, formId,
    } = props;
    const handledFormMap = formMap
      .delete('city')
      .set('area', area)
      .set('type', privilege.type)
      .set('detail', {
        name: carInfo.name,
        description: `${privilege.headTitle},${privilege.freeTitle}`,
        image: carInfo.image,
      });
    const onSuccess = (booking) => {
      updateMembership();
      // Actions.replace('appointmentSuccess', {
      Actions.push('bookingReview', {
        booking,
        carInfo,
        privilege,
      });
    };

    dispatch(updateFormAction(handledFormMap, getAPIPath(props), undefined, !formId, onSuccess));
  },
});

const connectedForm = connect((state, props) => {
  const {
    authUser: {
      firstName, lastName, phoneNumber, email,
    }, initPreferDates, appoinment,
  } = props;
  const address = 'City of Livermore.\nDetails will be given by the operator';
  let initialValues;
  if (appoinment) {
    initialValues = getImmutableData(appoinment).set('address', address)
      .set('city', appoinment.area);
  } else {
    initialValues = Immutable.fromJS({
      address,
      city: 'bayArea',
      name: `${firstName || ''} ${lastName || ''}`.trim(),
      phoneNumber: phoneNumber || '',
      email: email || '',
      preferDates: initPreferDates || [],
    });
  }
  return {
    initialValues,
    preferDates: selector(state, 'preferDates'),
    currentCity: selector(state, 'city') || appoinment.area,
  };
})(form);

export default connect(mapStateToProps, mapDispatchToProps)(connectedForm);
