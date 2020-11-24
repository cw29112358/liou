/**
*
* ReleaseForm
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pick from 'lodash/pick';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { TouchableOpacity } from 'react-native';
import {
  Text,
  Form,
  View,
  Icon,
} from 'native-base';

import formValidators from 'utils/formValidators';
import { SEEK_METHODS, OPTIONS_INDUSTRY } from 'utils/constants';

import ModalSelect from 'components/ModalSelect';
import Button from 'components/Button';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';

import styles from './styles';

const {
  isRequired,
  isValidNumber,
} = formValidators;
export class ReleaseForm extends React.Component { // eslint-disable-line
  componentWillReceiveProps(nextProps) {
    const { isUploadSuccess, reset, activitiesLoading } = this.props;
    const uploadSuccess = isUploadSuccess.toString() === 'false';
    if ((uploadSuccess && nextProps.isUploadSuccess) || activitiesLoading) {
      reset();
    }
  }
  onSubmit = () => {
    const { handleSubmit } = this.props;
    handleSubmit();
  }
  renderRightChildren = () => {
    const {
      onShowPicker,
      isShowPicker,
      selectedValue,
      onConfirm,
      onCancel,
    } = this.props;
    const options = [
      { label: 'dollar', value: 'kdollar' },
      { label: 'rmb', value: 'krmb' },
    ];
    return (
      <View>
        <View style={styles.rightChildrenWrapper}>
          <Text
            onPress={onShowPicker}
            style={styles.rightChildrenTextStyle}
          >
            {selectedValue}
          </Text>
          <Icon type="FontAwesome" name="caret-down" style={styles.arrowIcon} />
        </View>
        <ModalSelect
          isVisible={isShowPicker}
          options={options}
          title={translate('currency')}
          isTranslate
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </View>
    );
  }
  renderTopForm = () => {
    const {
      selectedType,
      areaPotions,
      ...otherProps
    } = this.props;
    const formFieldsObject = {
      industry: {
        type: 'selectInput',
        validate: [isRequired],
        hasLabel: true,
        hasArrow: true,
        title: 'industry',
        placeholder: 'placeholderSelect',
        options: OPTIONS_INDUSTRY,
        ...styles.horizontalItem,
      },
      area: {
        type: 'selectInput',
        validate: [isRequired],
        hasLabel: true,
        hasArrow: true,
        title: 'country',
        placeholder: 'placeholderSelect',
        options: areaPotions,
        ...styles.horizontalItem,
      },
      type: {
        type: 'selectInput',
        validate: [isRequired],
        hasLabel: true,
        hasArrow: true,
        title: 'type',
        options: SEEK_METHODS,
        ...styles.horizontalItem,
      },
    };
    const formFields = [
      pick(formFieldsObject, 'industry', 'area', 'type'),
    ];
    return (
      <View>
        {formFields.map((formField) => (
          <Group
            fieldsObject={formField}
            key={formField}
            {...otherProps}
          />
        ))}
      </View>
    );
  }
  renderCenterForm = () => {
    const {
      selectedType,
      changeTab,
      activeTab,
      ...otherProps
    } = this.props;
    const formFieldsObject = {
      fundRequest: {
        type: 'numberInput',
        validate: [isRequired, isValidNumber],
        hasLabel: true,
        interval: 3,
        spacer: ',',
        fromRight: true,
        rightChildren: <Text>{translate('dollar')}</Text>,
        ...styles.centerFormHorizontalItem,
      },
      transferPercent: {
        type: 'numberInput',
        validate: [isRequired, isValidNumber],
        hasLabel: true,
        rightChildren: <Text>%</Text>,
        ...styles.centerFormHorizontalItem,
      },
      valuation: {
        type: 'numberInput',
        validate: [isRequired, isValidNumber],
        hasLabel: true,
        interval: 3,
        spacer: ',',
        fromRight: true,
        rightChildren: <Text>{translate('dollar')}</Text>,
        ...styles.centerFormHorizontalItem,
      },
      period: {
        type: 'numberInput',
        validate: [isRequired, isValidNumber],
        hasLabel: true,
        rightChildren: <Text>{translate('year')}</Text>,
        ...styles.centerFormHorizontalItem,
      },
      interestPercent: {
        type: 'numberInput',
        validate: [isRequired, isValidNumber],
        hasLabel: true,
        rightChildren: <Text>%</Text>,
        ...styles.centerFormHorizontalItem,
      },
    };
    let formFields = [pick(formFieldsObject, 'fundRequest', 'transferPercent', 'valuation')];

    const firstTabsStyle = [styles.tabStyle];
    const firstTabTextStyle = [styles.tabText];
    const secondTabsStyle = [styles.tabStyle];
    const secondTabTextStyle = [styles.tabText];

    if (activeTab === 0) {
      firstTabsStyle.push(styles.activeTabStyle);
      firstTabTextStyle.push(styles.activeTabTextStyle);
    } else if (activeTab === 1) {
      formFields = [
        pick(formFieldsObject, 'fundRequest', 'period', 'interestPercent'),
      ];
      secondTabsStyle.push(styles.activeTabStyle);
      secondTabTextStyle.push(styles.activeTabTextStyle);
    }
    const isShowCenterForm = (selectedType && selectedType !== 'collaboration') ? 1 : 0;
    if (isShowCenterForm) {
      return (
        <View style={styles.centerFormWrapper}>
          <View style={styles.tabsStyle}>
            <TouchableOpacity
              onPress={() => changeTab(0)}
              style={styles.tabWrapperStyle}
            >
              <View style={firstTabsStyle}>
                <Text style={firstTabTextStyle}>{translate('equity')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeTab(1)}
              style={styles.tabWrapperStyle}
            >
              <View style={secondTabsStyle}>
                <Text style={secondTabTextStyle}>{translate('debt')}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {formFields.map((formField) => (
            <Group
              fieldsObject={formField}
              key={formField}
              {...otherProps}
            />
          ))}
        </View>
      );
    }
    return null;
  }
  renderBottomForm = () => {
    const {
      ...otherProps
    } = this.props;
    const formFieldsObject = {
      fund: {
        type: 'numberInput',
        normalize: this.normalize,
        validate: [isRequired, isValidNumber],
        hasLabel: true,
        hasBorder: false,
        interval: 3,
        spacer: ',',
        fromRight: true,
        rightChildren: <Text>{translate('dollar')}</Text>,
        itemstyle: styles.itemstyle,
        labelStyle: styles.horizontalItem.labelStyle,
        inputStyle: styles.horizontalItem.inputStyle,
      },
      message: {
        type: 'textareaInput',
        placeholder: 'placeholderMessage',
        itemstyle: styles.textareaItemstyle,
        textareaStyle: styles.textareaStyle,
        validate: [isRequired],
      },
      images: {
        type: 'media',
        layout: 'vertical',
        hasLabel: true,
        label: 'pickMedia',
        itemstyle: styles.mediaItemStyle,
        labelStyle: styles.mediaLabelStyle,
        inputStyle: styles.mediaInputStyle,
      },
    };
    const formFields = [
      pick(formFieldsObject, 'fund', 'message', 'images'),
    ];
    return (
      <View>
        {formFields.map((formField) => (
          <Group
            fieldsObject={formField}
            key={formField}
            {...otherProps}
          />
        ))}
      </View>
    );
  }
  render() {
    return (
      <Form style={styles.form}>
        { this.renderTopForm() }
        { this.renderCenterForm() }
        { this.renderBottomForm() }
        <Button
          shadowStyle={[styles.brandShadow, styles.pointShadow]}
          {...styles.linearProps}
          textLabel="release"
          textStyle={styles.buttonText}
          style={styles.button}
          onPress={this.onSubmit}
        />
      </Form>
    );
  }
}

ReleaseForm.defaultProps = {
  selectedType: '',
  areaPotions: [],
  authUserId: '',
  area: '',
  industry: '',
  onConfirm: () => null,
  onCancel: () => null,
  onShowPicker: () => null,
  changeTab: () => null,
  activeTab: 0,
  isShowPicker: false,
  selectedValue: '',
  isUploadSuccess: true,
  activitiesLoading: false,
};

ReleaseForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  selectedType: PropTypes.string,
  areaPotions: PropTypes.array,
  authUserId: PropTypes.string,
  area: PropTypes.string,
  industry: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onShowPicker: PropTypes.func,
  changeTab: PropTypes.func,
  activeTab: PropTypes.number,
  isShowPicker: PropTypes.bool,
  selectedValue: PropTypes.string,
  isUploadSuccess: PropTypes.bool,
  activitiesLoading: PropTypes.bool,
};

const FormWithError = (props) => <ValidForm {...props} component={ReleaseForm} />;

const form = reduxForm({
  form: 'releaseForm',
  destroyOnUnmount: true,
})(FormWithError);
const selector = formValueSelector('releaseForm');
const connectedForm = connect((state, props) => {
  const { area, industry } = props;
  return ({
    selectedType: selector(state, 'type'),
    initialValues: {
      industry,
      area,
      type: 'collaboration',
    },
  });
})(form);
export default connectedForm;
