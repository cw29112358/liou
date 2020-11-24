/**
*
* ProfileForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import Button from 'react-bootstrap-button-loader';
import { pick } from 'lodash';
import * as firebase from 'firebase';
import TranslatedMessage from 'components/TranslatedMessage';
import * as FormField from 'components/Form/BootstrapFormField';
import { isRequired, isPhone, isEmail, isAddress, isZipCode } from 'utils/formValidators';
import { isValidString, isValidLetter } from 'utils/validators';
import { STATE_OPTIONS, LANGUAGE_OPTIONS, GENDER_OPTIONS, DL_TYPE_OPTIONS } from 'utils/constants';
import { selectProfileUserId } from 'containers/App/selectors';
import { loadFormAction, updateFormAction, uploadFileFormAction } from 'containers/App/actions';
import formMessages from 'forms/messages';
import 'forms/style.scss';
import './style.scss';

const getFirebaseEndPoint = (props) => ['users', props.profileUserId];
const getReduxEndPoint = (props) => ['app', 'users', props.profileUserId];

class ProfileForm extends React.Component {
  componentDidMount() {
    this.props.onMount(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.profileUserId === null && this.props.profileUserId !== nextProps.profileUserId) {
      this.props.onMount(this.props);
    }
  }

  render() {
    const { intl, handleSubmit, dirty, isLoading, ...otherProps } = this.props;
    const formFieldsObject = {
      uid: {
        type: 'hidden',
        className: 'form-field',
      },
      logo: {
        type: 'profileLogo',
        fileType: 'image',
        className: 'col-md-6',
        width: 60,
        height: 60,
        fileDirectory: `users/${this.props.profileUserId}`,
      },
      companyName: {
        type: 'text',
        placeholder: intl.formatMessage(formMessages.placeholderCompanyName),
        className: 'form-field',
      },
      firstName: {
        type: 'text',
        placeholder: intl.formatMessage(formMessages.placeholderFirstName),
        className: 'col-md-6',
        validate: [isRequired],
      },
      lastName: {
        type: 'text',
        placeholder: intl.formatMessage(formMessages.placeholderLastName),
        className: 'col-md-6',
        validate: [isRequired],
      },
      gender: {
        type: 'radioInput',
        className: 'col-md-6',
        customOptions: GENDER_OPTIONS,
      },
      birthday: {
        type: 'date',
        placeholder: 'MM/DD/YYYY',
        className: 'col-md-6',
        validate: [isRequired],
      },
      email: {
        type: 'email',
        placeholder: intl.formatMessage(formMessages.placeholderEmail),
        className: 'col-md-6',
        validate: [isRequired, isEmail],
      },
      phoneNumber: {
        type: 'number',
        placeholder: intl.formatMessage(formMessages.placeholderPhoneNumber),
        className: 'col-md-6',
        validate: [isRequired, isPhone],
        numberFormat: {
          format: '+1 (###) ###-####',
          mask: '_',
        },
      },
      streetAddress: {
        type: 'text',
        placeholder: intl.formatMessage(formMessages.placeholderStreetAddress),
        className: 'form-field',
        validate: [isRequired, isAddress],
      },
      streetAddress2: {
        type: 'text',
        className: 'form-field',
      },
      city: {
        type: 'text',
        placeholder: intl.formatMessage(formMessages.placeholderCity),
        className: 'col-md-4',
        validate: [isRequired],
      },
      state: {
        type: 'selectInput',
        className: 'col-md-4',
        validate: [isRequired],
        customOptions: STATE_OPTIONS,
        defaultOption: 'choose a state',
      },
      zipCode: {
        type: 'number',
        placeholder: intl.formatMessage(formMessages.placeholderZipCode),
        className: 'col-md-4',
        validate: [isRequired, isZipCode],
        numberFormat: {
          format: '#####',
          mask: '#',
        },
      },
      driverLicenseType: {
        type: 'selectInput',
        // validate: [isRequired],
        customOptions: DL_TYPE_OPTIONS,
        className: 'col-md-4',
        defaultOption: 'Please choose a type',
        // hasLabel: !isMobile,
      },
      driverLicenseNum: {
        type: 'text',
        validate: [isValidString],
        className: 'col-md-4',
        // hasLabel: !isMobile,
      },
      driverLicenseState: {
        type: 'text',
        validate: [isValidLetter],
        placeholder: 'XX',
        className: 'col-md-4',
        // hasLabel: !isMobile,
      },
      driverLicenseCountry: {
        type: 'text',
        validate: [isValidLetter],
        className: 'col-md-4',
        // hasLabel: !isMobile,
      },
      // TODO: rewrite component, because can't change it's color when checked
      language: {
        type: 'selectInput',
        className: 'form-field',
        customOptions: LANGUAGE_OPTIONS,
        defaultOption: 'Please choose a language',
      },
    };

    const groups = [
      pick(formFieldsObject, 'logo'),
      pick(formFieldsObject, 'firstName', 'lastName'),
      pick(formFieldsObject, 'gender', 'birthday'),
      pick(formFieldsObject, 'email', 'phoneNumber'),
      pick(formFieldsObject, 'streetAddress'),
      pick(formFieldsObject, 'streetAddress2'),
      pick(formFieldsObject, 'city', 'state', 'zipCode'),
      // pick(formFieldsObject, 'language'),
    ];
    const groupDLUS = pick(formFieldsObject, 'driverLicenseType', 'driverLicenseNum', 'driverLicenseState');
    const groupDLNonUS = pick(formFieldsObject, 'driverLicenseType', 'driverLicenseNum', 'driverLicenseCountry');

    return (
      <div className="form-component">
        <form onSubmit={handleSubmit} className="m-t">
          {groups.map((group, i) => <FormField.Group key={i} fieldsObject={group} {...otherProps} intl={intl} messages={formMessages} />)}
          {this.props.selectedDLType !== 'United States' &&
          <FormField.Group fieldsObject={groupDLNonUS} {...otherProps} intl={intl} messages={formMessages} />}
          {this.props.selectedDLType === 'United States' &&
          <FormField.Group fieldsObject={groupDLUS} {...otherProps} intl={intl} messages={formMessages} />}

          <div className="actions clearfix">
            <div className="form-group">
              {/* <Button htmlType="submit" type="primary" disabled={!dirty} loading={isLoading}>
                <TranslatedMessage messages={formMessages} messageId="save" />
              </Button> */}
              <Button type="submit" bsStyle="primary" bsSize="lg" disabled={!dirty} loading={isLoading} >
                <TranslatedMessage messages={formMessages} messageId="save" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onUpload: PropTypes.func,
  onMount: PropTypes.func,
  submitting: PropTypes.bool,
  dirty: PropTypes.bool,
  isLoading: PropTypes.bool,
  profileUserId: PropTypes.string,
  selectedDLType: PropTypes.string,
};

const mapStateToProps = createPropsSelector({
  profileUserId: selectProfileUserId,
});

function mapDispatchToProps(dispatch) {
  return {
    onMount: (props) => {
      dispatch(loadFormAction(getFirebaseEndPoint(props), getReduxEndPoint(props)));
    },
    onSubmit: (formMap, _dispatch, props) => {
      if (props.onHide) props.onHide();

      if (!formMap.get('createdTime')) {
        const newFormMap = formMap.set('createdTime', firebase.database.ServerValue.TIMESTAMP) // { '.sv': 'timestamp' }
                                  .set('role', formMap.get('role', 'lead'));
        return dispatch(updateFormAction(newFormMap, getFirebaseEndPoint(props), getReduxEndPoint(props)));
      }
      return dispatch(updateFormAction(formMap, getFirebaseEndPoint(props), getReduxEndPoint(props)));
    },
    onUpload: (fileName, fileBlob, fieldName, props) => {
      dispatch(uploadFileFormAction(fileName, fileBlob, fieldName, getReduxEndPoint(props), getFirebaseEndPoint(props)));
    },
  };
}

const form = injectIntl(reduxForm({
  form: 'ProfileForm',
  destroyOnUnmount: true,
  // enableReinitialize: true,
})(ProfileForm));

const selector = formValueSelector('ProfileForm');

const connectedForm = connect((state, props) => {
  const selectedDLType = selector(state, 'driverLicenseType');
  return {
    initialValues: state.getIn(getReduxEndPoint(props)),
    selectedDLType,
  };
})(form);

export default connect(mapStateToProps, mapDispatchToProps)(connectedForm);
