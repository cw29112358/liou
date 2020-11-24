/**
*
* VerifiedForm
*
*/
/* global window translate */
import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import {
  View,
  Form,
} from 'native-base';
import {
  Image,
} from 'react-native';

import formValidators from 'utils/formValidators';

import {
  updateFormAction,
  uploadRefFileAction,
} from 'containers/AppRouter/actions';
import {
  selectAuthUserInfo,
  selectAuthUserId,
} from 'containers/AppRouter/selectors';

import FilterBar from 'components/FilterBar';
import Button from 'components/Button';
import TranslateText from 'components/TranslateText';

import { OPTIONS_FUND_UNIT } from 'utils/constants';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';

import addImage from './assets/add.png';
import styles from './styles';

const {
  isRequired, isPhone, isEmail,
} = formValidators;
const getAPIPath = () => 'api/profiles/verify';
const getReduxEndPoint = (props) => ['appRouter', 'users', props.authUserId, 'profile'];

const VerifiedForm = (props) => {
  const { handleSubmit } = props;

  const renderUploadChildren = (url) => (
    <View style={styles.cardImageView}>
      { !!url && <Image source={{ uri: url }} style={styles.cardImage} /> }
      { !url && <Image source={addImage} style={styles.cardAddImage} /> }
    </View>
  );
  const renderTitleBar = (title) => (
    <FilterBar
      title={title}
      titleStyle={styles.showTitle}
      titleOtherProps={{ numberOfLines: 2 }}
      options={undefined}
      filterViewStyle={styles.showView}
    />
  );
  const renderFormFields = (array, style) => {
    const formFields = [
      pick(formFieldsObject, array),
    ];

    return (
      formFields.map((formField) => (
        <View style={style} key={formField}>
          <Group
            fieldsObject={formField}
            {...props}
          />
        </View>
      ))
    );
  };
  const renderSubmitButton = () => (
    <View style={styles.verifyView}>
      <Button
        onPress={handleSubmit}
        style={styles.linearButton}
        textLabel="submitApplications"
        textStyle={styles.linearButtonText}
        {...styles.linearProps}
        shadowStyle={[styles.brandShadow, { borderRadius: 50 }]}
        linearStyle={[styles.linearButtonView, styles.brandShadow]}
      />
    </View>
  );

  const formFieldsObject = {
    verifiedName: {
      type: 'textInput',
      hasLabel: true,
      ...styles.horizontalItem,
      itemstyle: styles.firstItemStyle,
      validate: [isRequired],
    },
    verifiedCompany: {
      type: 'textInput',
      hasLabel: true,
      ...styles.horizontalItem,
      validate: [isRequired],
    },
    verifiedOccupation: {
      type: 'textInput',
      hasLabel: true,
      ...styles.horizontalItem,
      validate: [isRequired],
    },
    verifiedPhoneNumber: {
      type: 'numberInput',
      hasLabel: true,
      itemstyle: {
        paddingHorizontal: 16,
        justifyContent: 'space-between',
      },
      ...styles.numberInputStyle,
      validate: [isRequired, isPhone],
    },
    verifiedEmail: {
      type: 'textInput',
      hasLabel: true,
      ...styles.horizontalItem,
      validate: [isRequired, isEmail],
    },
    verifiedFund: {
      type: 'numberInput',
      hasLabel: true,
      interval: 3,
      spacer: ',',
      fromRight: true,
      maxLength: 17,
      itemstyle: styles.noBorderItemStyle,
      ...styles.numberInputStyle,
      rightChildren: <TranslateText label="usd" style={[styles.horizontalItem.inputStyle, { lineHeight: 44, marginLeft: 12 }]} />,
      validate: [isRequired],
    },
    verifiedFundUnit: {
      type: 'selectInput',
      hasArrow: true,
      title: 'fundUnitTitle',
      options: OPTIONS_FUND_UNIT,
      isTranslate: true,
      itemstyle: styles.fundUnitItem,
      textStyle: styles.horizontalItem.inputStyle,
      validate: [isRequired],
    },
    cardFrontImage: {
      type: 'avatar',
      hasLabel: true,
      hasDeleteIcon: true,
      fileType: 'image',
      itemstyle: styles.cardItem,
      renderUploadChildren,
      validate: [isRequired],
    },
    cardBackImage: {
      type: 'avatar',
      hasLabel: true,
      hasDeleteIcon: true,
      fileType: 'image',
      itemstyle: styles.cardItem,
      renderUploadChildren,
      validate: [isRequired],
    },
  };
  const fields = [
    {
      title: 'contactInformation',
      array: ['verifiedName', 'verifiedOccupation', 'verifiedPhoneNumber', 'verifiedEmail', 'verifiedCompany', 'verifiedFund'],
    },
    {
      title: 'uploadBusinessCard',
      array: ['cardFrontImage', 'cardBackImage'],
      style: styles.rowLR,
    },
  ];

  return (
    <Form style={[styles.form]}>
      { fields.map((item, index) => {
        const key = `chunk${index}`;
        const { title, array, style } = item;

        return (
          <View key={key}>
            { renderTitleBar(title) }
            { renderFormFields(array, style) }
          </View>
        );
      })}
      { renderSubmitButton() }
    </Form>
  );
};

VerifiedForm.defaultProps = {
};

VerifiedForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const FormWithError = (props) => <ValidForm {...props} component={VerifiedForm} />;

const form = reduxForm({
  form: 'verifiedForm',
})(FormWithError);

const connectedForm = connect((state, props) => ({
  initialValues: Immutable.fromJS(props.authUser),
}))(form);

const mapStateToProps = createPropsSelector({
  authUser: selectAuthUserInfo,
  authUserId: selectAuthUserId,
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (formMap, _dispatch, props) => {
      const { onBack } = props;
      const onSuccess = () => {
        onBack();
        window.toast(translate('submitVerification'));
      };
      const onSubmitForm = () => {
        dispatch(updateFormAction(formMap, getAPIPath(props), getReduxEndPoint(props), true, onSuccess));
      };

      window.alert(
        '',
        'verificationAlert',
        [
          {
            text: 'verificationCancel',
            style: 'destructive',
          },
          {
            text: 'verificationConfirm',
            onPress: onSubmitForm,
          },
        ]
      );
    },
    onUpload: (field, fileBuffer, props) => {
      const { authUserId } = props;
      const reduxEndPoint = ['form', 'verifiedForm', 'values', field];
      dispatch(uploadRefFileAction('Profile', authUserId, field, fileBuffer, reduxEndPoint, true));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(connectedForm);
