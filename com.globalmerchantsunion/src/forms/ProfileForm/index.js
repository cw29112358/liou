/**
*
* ProfileForm
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import startCase from 'lodash/startCase';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { createPropsSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import {
  Form,
  View,
} from 'native-base';
import { Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import {
  updateFormAction,
  uploadRefFileAction,
} from 'containers/AppRouter/actions';
import {
  selectAreaOptions,
  selectIndustryOptions,
} from 'containers/HomeScene/selectors';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';

import FilterBar from 'components/FilterBar';
import Button from 'components/Button';
import TranslateText from 'components/TranslateText';

import editImage from './assets/edit.png';
import styles from './styles';

const getAPIPath = (props) => `api/profiles/${props.authUserId}`;
const getReduxEndPoint = (props) => ['appRouter', 'users', props.authUserId, 'profile'];

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showChunk: '',
    };
  }

  onPressVerified = (status) => {
    const key = !status ? 'verified' : 'verifiedResult';
    Actions.push(key);
  }
  onPressOption = ({ title }) => {
    const { showChunk } = this.state;
    let nextShowChunk = title;
    if (showChunk === title) nextShowChunk = '';

    this.setState({ showChunk: nextShowChunk });
    if ((showChunk && !nextShowChunk) || (showChunk && nextShowChunk)) {
      this.onSubmitForm();
    }
  }
  onSubmitForm = () => {
    const { handleSubmit } = this.props;
    handleSubmit();
  }

  getOptions = (editable) => {
    const allOptions = [
      {
        label: 'edit',
        source: editImage,
        style: styles.editImage,
      },
      {
        label: 'finish',
        source: undefined,
      },
    ];
    const pickIndex = editable ? 1 : 0;
    const { source, label, style } = allOptions[pickIndex];

    return [
      {
        leftChildren: source && <Image source={source} style={style} />,
        label,
      },
    ];
  }

  renderTitleBar = (title, options) => (
    <FilterBar
      title={title}
      titleStyle={styles.showTitle}
      options={options}
      onSelect={this.onPressOption}
      buttonStyle={styles.showButton}
      textStyle={styles.showButtonText}
      filterViewStyle={styles.showView}
    />
  )
  renderFormFields = (formFieldsObject, array, editable, title) => {
    const isMyBusinessCard = title === 'myBusinessCard';
    let pickObj = pick(formFieldsObject, array);
    pickObj = Object.keys(pickObj)
      .reduce((result, key) => {
        const item = pickObj[key];
        const newItem = { ...item };
        if (item.editable === undefined) newItem.editable = editable; // 是否可编辑属性

        const isEditField = isMyBusinessCard && ['verifiedName', 'verifiedCompany', 'verifiedOccupation'].includes(key);
        if (isEditField) {
          newItem.editable = false;
          if (editable) {
            newItem.labelTip = 'verifyWrite';// 提示
          } else {
            newItem.inputStyle = styles.horizontalItem.inputStyle; // 样式
          }
        }

        result[key] = newItem;//eslint-disable-line
        return result;
      }, {});
    const formFields = [
      pickObj,
    ];

    return (
      formFields.map((formField) => (
        <Group
          fieldsObject={formField}
          key={formField}
          {...this.props}
        />
      ))
    );
  }
  renderVerifiedButton = (status) => (
    <View style={styles.verifyView}>
      <Button
        onPress={() => this.onPressVerified(status)}
        style={styles.linearButton}
        textLabel={`verify${startCase(status)}`}
        textStyle={styles.linearButtonText}
        {...styles.linearProps}
        shadowStyle={[styles.brandShadow, styles.linearShadow]}
      />
    </View>
  )

  render() {
    const {
      isOthers, areaOptions, industryOptions, authUser: { verificationStatus, verifiedFund },
    } = this.props;
    const { showChunk } = this.state;

    const unVerified = verificationStatus !== 'verified';
    const hasArrow = !isOthers && showChunk === 'myBusinessCard'; // 本人+我的名片编辑状态

    const formFieldsObject = {
      avatar: {
        type: 'avatar',
        hasLabel: true,
        fileType: 'image',
        ...styles.horizontalItem,
        itemstyle: {
          ...styles.horizontalItem.itemstyle,
          ...styles.avatarItem,
        },
      },
      area: {
        type: 'selectInput',
        hasLabel: true,
        label: 'profileArea',
        hasArrow,
        title: 'area',
        options: areaOptions,
        isTranslate: true,
        placeholder: hasArrow ? 'pleaseSelect' : '',
        ...styles.horizontalItem,
        textStyle: styles.horizontalItem.inputStyle,
      },
      industry: {
        type: 'selectInput',
        hasLabel: true,
        hasArrow,
        title: 'industry',
        options: industryOptions,
        isTranslate: true,
        placeholder: hasArrow ? 'pleaseSelect' : '',
        ...styles.horizontalItem,
        itemstyle: styles.noBorderItemStyle,
        textStyle: styles.horizontalItem.inputStyle,
      },
      school: {
        type: 'textInput',
        hasLabel: true,
        ...styles.horizontalItem,
        itemstyle: styles.firstItemStyle,
      },
      previousCompany: {
        type: 'textInput',
        hasLabel: true,
        ...styles.horizontalItem,
      },
      previousOccupation: {
        type: 'textInput',
        hasLabel: true,
        ...styles.horizontalItem,
        itemstyle: styles.noBorderItemStyle,
      },
      verifiedName: {
        type: 'textInput',
        hasLabel: true,
        editable: false,
        ...styles.horizontalItem,
        inputStyle: styles.noEditableInputStyle,
        [isOthers ? 'itemstyle' : undefined]: styles.firstItemStyle, // 其他人+我的名片
      },
      verifiedCompany: {
        type: 'textInput',
        hasLabel: true,
        editable: false,
        ...styles.horizontalItem,
        inputStyle: styles.noEditableInputStyle,
      },
      verifiedOccupation: {
        type: 'textInput',
        hasLabel: true,
        editable: false,
        ...styles.horizontalItem,
        inputStyle: styles.noEditableInputStyle,
      },
      verifiedPhoneNumber: {
        type: 'numberInput',
        hasLabel: true,
        editable: false,
        labelTip: 'noSee',
        ...styles.horizontalItem,
        inputStyle: styles.noEditableInputStyle,
      },
      verifiedEmail: {
        type: 'textInput',
        hasLabel: true,
        editable: false,
        labelTip: 'noSee',
        ...styles.horizontalItem,
        inputStyle: styles.noEditableInputStyle,
      },
      verifiedFund: {
        type: 'numberInput',
        hasLabel: true,
        editable: false,
        labelTip: 'noSee',
        interval: 3,
        spacer: ',',
        fromRight: true,
        ...styles.horizontalItem,
        inputStyle: styles.noEditableInputStyle,
        itemstyle: styles.noBorderItemStyle,
        rightChildren: verifiedFund ? <TranslateText label="usd" style={[styles.noEditableInputStyle, { lineHeight: 44, marginLeft: 12 }]} /> : undefined,
      },
    };
    let fields = [
      {
        // 其他人 隐藏头像
        title: 'myBusinessCard',
        array: [isOthers ? '' : 'avatar', 'verifiedName', 'verifiedCompany', 'area', 'verifiedOccupation', 'industry'],
      },
      // {
      //   title: 'personalInformation',
      //   array: ['school', 'previousCompany', 'previousOccupation'],
      // },
      {
        // 未认证 ？ 显示认证按钮 ：显示认证信息
        title: 'authenticationInformation',
        array: unVerified ? undefined : ['verifiedName', 'verifiedOccupation', 'verifiedPhoneNumber', 'verifiedEmail', 'verifiedCompany', 'verifiedFund'],
        hideOptions: true,
        children: unVerified ? this.renderVerifiedButton(verificationStatus) : undefined,
      },
    ];
    const formStyle = [styles.form];

    // 其他人 隐藏认证信息
    if (isOthers) {
      fields = fields.slice(0, 2);
      formStyle.push({ paddingBottom: 20 });
    }

    return (
      <Form style={formStyle}>
        { fields.map((item, index) => {
          const key = `chunk${index}`;
          const {
            title, array, hideOptions, children,
          } = item;
          const editable = showChunk === title; // 是否可编辑
          const options = (isOthers || hideOptions) // 是否显示编辑按钮
            ? undefined
            : this.getOptions(editable);


          return (
            <View key={key}>
              { this.renderTitleBar(title, options) }
              { this.renderFormFields(formFieldsObject, array, editable, title) }
              { children }
            </View>
          );
        })}
      </Form>
    );
  }
}

ProfileForm.defaultProps = {
};

ProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isOthers: PropTypes.bool.isRequired,
  areaOptions: PropTypes.array.isRequired,
  industryOptions: PropTypes.array.isRequired,
  authUser: PropTypes.object.isRequired,
};

const FormWithError = (props) => <ValidForm {...props} component={ProfileForm} />;

const form = reduxForm({
  form: 'profileForm',
  enableReinitialize: true,
})(FormWithError);

const connectedForm = connect((state, props) => ({
  initialValues: Immutable.fromJS(props.authUser),
}))(form);

const mapStateToProps = createPropsSelector({
  areaOptions: selectAreaOptions,
  industryOptions: selectIndustryOptions,
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (formMap, _dispatch, props) => {
      const { dirty } = props;
      if (dirty) {
        dispatch(updateFormAction(formMap, getAPIPath(props), getReduxEndPoint(props), false));
      }
    },
    onUpload: (field, fileBuffer, props) => {
      const { authUserId } = props;
      const reduxEndPoint = ['form', 'profileForm', 'values', field];
      dispatch(uploadRefFileAction('Profile', authUserId, field, fileBuffer, reduxEndPoint, true));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(connectedForm);
