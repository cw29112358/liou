/**
*
* LoginForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import pick from 'lodash/pick';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import {
  Form,
} from 'native-base';
import {
  Image,
} from 'react-native';

import formValidators from 'utils/formValidators';
import { getImmutableData } from 'utils/helpers';

import VerificationCodeTimer from 'components/VerificationCodeTimer';

import Group from 'forms/formFields';
import CompositeField from 'forms/formFields/CompositeField';
import ValidForm from 'forms/ValidForm';

import Button from 'components/Button';
import TranslateText from 'components/TranslateText';

import styles from './styles';
// import phoneImage from './assets/phone.png';
import passwordImage from './assets/password.png';

const {
  isRequired,
  // isPhone,
  isPassword,
  isPasswordLongEnough,
  isPasswordShortEnough,
  isRepeatPasswordSame,
} = formValidators;

class LoginForm extends React.Component {
  componentWillMount() {
    const { reset } = this.props;
    reset();
  }
  renderButton = (title, onPress) => (
    <Button
      onPress={onPress}
      style={styles.loginButton}
      textLabel={title}
      textStyle={styles.loginText}
    />
  );
  renderImage = (image = passwordImage, style = styles.iconPasswordStyle) => (
    <Image source={image} style={style} />
  )

  render() {
    const {
      formStyle, placeholderPassword, placeholderRepeatPassword,
      hasTakeLook, title, pickArray, phoneNumber, middleChildren, bottomChildren,
      onSendVerificationCode, handleSubmit, promptKeyErrorBeforeEvent,
      countryCode,
      ...otherProps
    } = this.props;

    const formFieldsObject = {
      password: {
        type: 'textInput',
        secureTextEntry: true,
        placeholder: placeholderPassword,
        validate: [isRequired, isPassword, isPasswordLongEnough, isPasswordShortEnough],
        itemStyle: styles.itemStyle,
        inputStyle: styles.inputStyle,
        leftChildren: this.renderImage(),
      },
      verificationCode: {
        type: 'numberInput',
        placeholder: 'placeholderVerificationCode',
        validate: [isRequired],
        itemStyle: styles.itemStyle,
        inputStyle: styles.inputStyle,
        rightChildren: (
          <VerificationCodeTimer
            label="sendVerificationCode"
            onPress={(onSuccess) => {
              const callback = () => onSendVerificationCode(countryCode, phoneNumber, 60, onSuccess);

              promptKeyErrorBeforeEvent('phoneNumber', callback);
            }}
          />
        ),
      },
      repeatPassword: {
        type: 'textInput',
        secureTextEntry: true,
        placeholder: placeholderRepeatPassword,
        validate: [isRequired, isRepeatPasswordSame],
        itemStyle: styles.itemStyle,
        inputStyle: styles.inputStyle,
        leftChildren: this.renderImage(),
      },
    };
    const formFields = [
      pick(formFieldsObject, ...pickArray),
    ];

    const hasPhoneNumber = pickArray.indexOf('phoneNumber') !== -1;
    return (
      <Form style={[styles.form, formStyle]}>
        {hasTakeLook && <TranslateText label="takeLook" style={styles.takeLook} onPress={() => { Actions.push('home'); }} />}
        { hasPhoneNumber && <CompositeField itemStyle={[styles.itemStyle, styles.composite]} {...this.props} />}
        {formFields.map((formField) => (
          <Group
            fieldsObject={formField}
            key={formField}
            {...otherProps}
          />
        ))}
        { middleChildren }
        { this.renderButton(title, handleSubmit) }
        { bottomChildren }
      </Form>
    );
  }
}

LoginForm.defaultProps = {
  hasTakeLook: false,
  title: 'login',
  pickArray: ['phoneNumber', 'verificationCode'],
  formStyle: {},
  placeholderPassword: 'placeholderPassword',
  placeholderRepeatPassword: 'placeholderRepeatPassword',
  middleChildren: undefined,
  bottomChildren: undefined,
  onSendVerificationCode: () => null,
  phoneNumber: null,
  countryCode: 86,
};

LoginForm.propTypes = {
  hasTakeLook: PropTypes.bool,
  title: PropTypes.string,
  pickArray: PropTypes.array,
  formStyle: PropTypes.object,
  placeholderPassword: PropTypes.string,
  placeholderRepeatPassword: PropTypes.string,
  middleChildren: PropTypes.any,
  bottomChildren: PropTypes.any,
  onSendVerificationCode: PropTypes.func,
  reset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  promptKeyErrorBeforeEvent: PropTypes.func.isRequired,
  phoneNumber: PropTypes.any,
  countryCode: PropTypes.number,
};

const FormWithError = (props) => <ValidForm {...props} component={LoginForm} />;

const form = reduxForm({
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
})(FormWithError);


const mapStateToProps = (state, props) => {
  const formName = props.formName || 'loginForm';
  const selector = formValueSelector(formName);

  return {
    initialValues: getImmutableData({
      countryCode: 86,
    }),
    form: formName,
    phoneNumber: selector(state, 'phoneNumber'),
    countryCode: selector(state, 'countryCode'),
  };
};

export default connect(mapStateToProps, null)(form);
