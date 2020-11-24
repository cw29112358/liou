/**
*
* LoanFormFieldsArray
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import isArray from 'lodash/isArray';
import { fromJS } from 'immutable';
import { Animated, ListView, Image } from 'react-native';
import {
  Button,
  Text,
  Icon,
  View,
  List,
  ListItem,
} from 'native-base';

import Group from 'forms/formFields';
import DetailsModal from 'components/DetailsModal';

import profileCardImage from 'assets/profileCard.png';
import handshakeImage from 'assets/handshake.png';

import styles from './styles';

class LoanFormFieldsArray extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    // this.formContentHeight = props.itemHeight;
    this.formContentHeight = null;
    this.formContentPaddingTop = props.itemPaddingTop;
    this.state = {
      listViewData: [],
      currentFormNumber: props.minField,
      // 记录每一个 FormContent 对应的基数动值，数组内元素均为 Animated 值
      recordContentAnimated: [],
      // 记录每一个 FormContent 在动画后的高度
      formItemHeight: [],
      changeRow: -1,
    };
  }

  componentWillMount() {
    const { fields, minField } = this.props;
    if (fields.length <= 0) {
      const initFormLength = (new Array(minField)).fill('1');
      initFormLength.map(() => this.addFields());
    }
  }

  setFieldsArray = (item) => {
    const { fieldsArray } = this.props;
    return fieldsArray.map((field) => ({
      [`${item}.${field.fieldName}`]: field,
    }));
  }

  setFormHeight = (e) => {
    const { height } = e.nativeEvent.layout;
    if (!this.formContentHeight) this.formContentHeight = height;
  }

  getContentState = (formHeight) => !formHeight || formHeight.height === 'auto'
  getAnimatedStyles = (rowId) => {
    const { recordContentAnimated } = this.state;
    const height = recordContentAnimated[rowId].interpolate({
      inputRange: [0, 0.99, 1],
      outputRange: [0, this.formContentHeight, 'auto'],
    });
    const paddingTop = recordContentAnimated[rowId].interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.formContentPaddingTop],
    });
    const rotateZ = recordContentAnimated[rowId].interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg'],
    });

    const arrowAnimatedStyles = {
      transform: [{ rotateZ }],
    };
    const formAnimatedStyles = {
      height,
      paddingTop,
    };
    return [arrowAnimatedStyles, formAnimatedStyles];
  }

  rowHeightChanged = (rowId) => {
    const { formItemHeight, recordContentAnimated } = this.state;
    this.setState({ changeRow: rowId });
    const formHeightArray = [...formItemHeight];
    if (this.getContentState(formHeightArray[rowId])) {
      formHeightArray[rowId] = { height: 0, paddingTop: 0 };
      // 取对应行在 recordContentAnimated 中记录的值进行动画操作。
      // recordContentAnimated 记数从 0 开始。data 从 1 开始，故取值时 data 减 1
      Animated.timing(recordContentAnimated[rowId], {
        toValue: 0,
        duration: 300,
      }).start(() => this.setNewState(formHeightArray, recordContentAnimated));
    } else {
      formHeightArray[rowId] = { height: 'auto', paddingTop: this.formContentPaddingTop };
      Animated.timing(recordContentAnimated[rowId], {
        toValue: 1,
        duration: 300,
      }).start(() => this.setNewState(formHeightArray, recordContentAnimated));
    }
  }
  setNewState = (formHeightArray, recordContentAnimated) => {
    this.setState({
      formItemHeight: formHeightArray,
      recordContentAnimated,
    });
  }

  addFields = () => {
    const { fields } = this.props;
    const {
      listViewData, currentFormNumber,
      recordContentAnimated, formItemHeight,
    } = this.state;
    fields.push(fromJS({}));
    if (listViewData.length <= 0) {
      listViewData.push(listViewData.length + 1);
    } else {
      listViewData.push(listViewData[listViewData.length - 1] + 1);
    }
    // fields 每次新加时，更新 recordContentAnimated 记录的值，初始为 new Animated.Value(1)
    const newRecordContentAnimated = [...recordContentAnimated];
    newRecordContentAnimated.push(new Animated.Value(1));
    const newFormItemHeight = [...formItemHeight];
    newFormItemHeight.push(null);
    this.setState({
      listViewData,
      formItemHeight: newFormItemHeight,
      currentFormNumber: currentFormNumber + 1,
      recordContentAnimated: newRecordContentAnimated,
    });
  }
  deleteRow = (data, secId, rowId) => {
    const { fields } = this.props;
    const {
      listViewData, currentFormNumber, recordContentAnimated, formItemHeight,
    } = this.state;
    const newData = [...listViewData];
    fields.remove(rowId);
    newData.splice(rowId, 1);
    const newRecordContentAnimated = [...recordContentAnimated];
    newRecordContentAnimated.splice(rowId, 1);
    const newFormItemHeight = [...formItemHeight];
    newFormItemHeight.splice(rowId, 1);
    this.setState({
      listViewData: newData,
      recordContentAnimated: newRecordContentAnimated,
      formItemHeight: newFormItemHeight,
      changeRow: -1,
      currentFormNumber: currentFormNumber - 1,
    });
  }

  showModal = () => {
    const { fields } = this.props;
    Actions.modal({
      children: <DetailsModal
        headTitle={`${fields.name}HeadTitle`}
        contentText={`${fields.name}ContentText`}
      />,
    });
  }

  renderFormTitle = () => {
    const { fields, maxField } = this.props;
    const { currentFormNumber } = this.state;
    return (
      <View style={styles.formGroupoTitle}>
        <View style={styles.leftGroupContent}>
          <Text style={styles.emergencyContact}>{translate(fields.name)}</Text>
          <Icon onPress={this.showModal} name="ios-help-circle-outline" style={styles.icon} />
        </View>
        <Button style={styles.addButton} disabled={currentFormNumber > maxField} onPress={this.addFields}>
          <Text style={styles.addButonText}>+</Text>
        </Button>
      </View>
    );
  }
  renderFormItemTitleRight = (data, secId, rowId, rowMap) => {
    const { minField, fillContent } = this.props;
    const { listViewData, formItemHeight } = this.state;
    const fillContentObject = fillContent ? fillContent.toJSON() : fillContent;
    let contactName = '';
    if (isArray(fillContentObject)) {
      contactName = `${fillContentObject[rowId].firstName || ' '} ${fillContentObject[rowId].lastName || ' '}`;
    }

    const isShowFormFields = this.getContentState(formItemHeight[rowId]);
    const isShowDeleteButton = listViewData.length > minField && isShowFormFields;
    return (
      <View style={styles.itemContentRight}>
        {isShowDeleteButton && (
          <Button
            transparent
            style={styles.deleteButton}
            onPress={() => this.deleteRow(data, secId, rowId, rowMap)}
          >
            <Icon name="trash" style={styles.deleteIcon} />
          </Button>
        )}
        {!isShowFormFields && <Text style={styles.nameText}>{contactName}</Text>}
        <Button
          transparent
          style={styles.arrowButton}
          onPress={() => this.rowHeightChanged(rowId)}
        >
          <Animated.View style={this.getAnimatedStyles(rowId)[0]}>
            <Icon name="ios-arrow-down" style={styles.arrowIcon} />
          </Animated.View>
        </Button>
      </View>
    );
  }
  renderFormItemTitle = (data, secId, rowId, rowMap) => {
    const { fields } = this.props;
    return (
      <View style={styles.itemContent}>
        <View style={styles.itemContentLeft}>
          <Image source={profileCardImage} style={styles.profileCard} />
          <Text style={styles.itemLabel}> {`${translate(`${fields.name}Item`)} ${data}`} </Text>
        </View>
        { this.renderFormItemTitleRight(data, secId, rowId, rowMap) }
      </View>
    );
  }
  renderFormContent = (rowId) => {
    const { fields, ...otherProps } = this.props;
    const { changeRow, formItemHeight } = this.state;
    return (
      <Animated.View
        style={[
          styles.fieldsContent,
          changeRow === rowId ? this.getAnimatedStyles(rowId)[1] : formItemHeight[rowId],
          { overflow: 'hidden' },
        ]}
        onLayout={this.setFormHeight}
      >
        {this.setFieldsArray(`${fields.name}[${rowId}]`).map((formField) => (
          <Group
            fieldsObject={formField}
            key={Object.keys(formField)[0]}
            {...otherProps}
          />
        ))}
      </Animated.View>
    );
  }
  renderFormItem = (data, secId, rowId, rowMap) => (
    <ListItem style={styles.listItem}>
      { this.renderFormItemTitle(data, secId, rowId, rowMap) }
      { this.renderFormContent(rowId) }
    </ListItem>
  )
  renderFormList = () => {
    const { listViewData } = this.state;
    return (
      <List
        disableLeftSwipe
        disableRightSwipe
        dataSource={this.ds.cloneWithRows(listViewData)}
        renderRow={this.renderFormItem}
        renderRightHiddenRow={() => null}
      />
    );
  }

  renderEmptyList = () => (
    <View style={styles.emptyList}>
      <Image source={handshakeImage} style={styles.handshake} />
      <Text style={styles.emptyListNote}>{translate('emptyListNote')}</Text>
    </View>
  )
  render() {
    const { hasEmptyList } = this.props;
    const { listViewData } = this.state;
    return (
      <View>
        { this.renderFormTitle() }
        {(listViewData.length <= 0 && hasEmptyList) && this.renderEmptyList()}
        { this.renderFormList() }
      </View>
    );
  }
}

LoanFormFieldsArray.defaultProps = {
  itemstyle: null,
  hasEmptyList: false,
};

LoanFormFieldsArray.propTypes = {
  fields: PropTypes.object.isRequired,
  itemstyle: PropTypes.object,
  hasEmptyList: PropTypes.bool,
};

export default LoanFormFieldsArray;
