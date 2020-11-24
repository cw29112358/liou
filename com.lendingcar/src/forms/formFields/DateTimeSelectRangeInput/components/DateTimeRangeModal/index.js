/**
*
* DateTimeRangeModal Component
*
*/

/* global translate window */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import moment from 'moment';
import {
  View,
  Icon,
  Text,
  Button,
} from 'native-base';

import { DATE_FORMAT, CALCULATE_DATE_FORMAT } from 'utils/constants';
import ReactCalendar from 'components/ReactCalendar';
import TimeRangePicker from 'components/TimeRangePicker';

import styles from './styles';

class DateTimeRangeModal extends React.Component {
  constructor(props) {
    super(props);
    const { defaultDateArray } = props;
    const defaultMarkDays = [];
    if (defaultDateArray.length > 0) {
      defaultDateArray.forEach((item) => {
        const itemDate = item.substring(0, 10);
        const itemDateArray = itemDate.split('/');
        // 日历时间格式要求为 'YYYY-MM-DD',此处将'MM/DD/YYYY'时间格式转换
        defaultMarkDays.push(`${itemDateArray[2]}-${itemDateArray[0]}-${itemDateArray[1]}`);
      });
    }
    this.state = {
      selectDate: '',
      markDays: defaultMarkDays,
      selectDateArray: defaultDateArray,
      isShowPicker: false,
      isShowToast: false,
    };
  }

  setDateArray = () => {
    const { getDateArray, closeCalendar } = this.props;
    const { selectDateArray } = this.state;
    getDateArray(selectDateArray);
    closeCalendar();
  }

  setSelectDate = (value) => {
    const { isShowTime } = this.props;
    const { selectDateArray, markDays } = this.state;
    if (selectDateArray.length >= 3) {
      this.setState({ isShowToast: true });
      setTimeout(() => this.setState({ isShowToast: false }), 2500);
    } else {
      // 展示时间格式
      const selectDate = moment(value).format(DATE_FORMAT);
      // 标记时间格式
      const markDay = moment(value).format(CALCULATE_DATE_FORMAT);
      markDays.push(markDay);
      if (isShowTime) {
        this.setState({ selectDate, markDays });
        this.showPicker();
      } else {
        selectDateArray.push(selectDate);
        this.setState({ selectDateArray, markDays });
      }
    }
  }
  selectTime = (value) => {
    const { selectDateArray, selectDate } = this.state;
    selectDateArray.push(`${selectDate}\n${value[0]}-${value[1]}`);
    this.setState({ selectDateArray });
    this.hiddenPicker();
  }
  onCancel = () => {
    const { markDays } = this.state;
    markDays.pop();
    this.setState({ markDays });
    this.hiddenPicker();
  }

  showPicker = () => {
    this.setState({ isShowPicker: true });
  }
  hiddenPicker = () => {
    this.setState({ isShowPicker: false });
  }

  clearAllDate = () => {
    this.setState({ selectDateArray: [], markDays: [] });
  }
  deleteDate = (deleteItem) => {
    const { selectDateArray, markDays } = this.state;
    const itemIndex = selectDateArray.findIndex((item) => deleteItem === item);
    markDays.splice(itemIndex, 1);
    selectDateArray.splice(itemIndex, 1);
    this.setState({ selectDateArray, markDays });
  }

  onBack = () => {
    const { closeCalendar } = this.props;
    window.alert(
      'appointmentAlertTitle',
      'calendarAlertMessage',
      [
        {
          text: 'confirm',
          onPress: closeCalendar,
        },
        {
          text: 'cancel',
          onPress: () => null,
        },
      ],
    );
  }
  renderHeader = () => {
    const { calendarTitle, calendarRightText } = this.props;
    return (
      <View style={styles.header}>
        <Button style={styles.headerLeftButton} onPress={this.onBack}>
          <Icon name="close" style={styles.icon} />
        </Button>
        <Text style={styles.headerTitle}>{translate(calendarTitle)}</Text>
        <Button style={styles.headerButton} onPress={this.clearAllDate}>
          <Text style={styles.leftText}>{translate(calendarRightText)}</Text>
        </Button>
      </View>
    );
  }

  renderDateList = () => {
    const { isShowTime } = this.props;
    const { selectDateArray } = this.state;
    const dateItemStyles = [styles.itemShadow];
    if (!isShowTime) dateItemStyles.push(styles.withoutTime);
    return (
      <View style={styles.dateGroup}>
        {selectDateArray && selectDateArray.map((item, index) => {
          const key = `${item}_${index}`;
          return (
            <View key={key} style={styles.groupItem}>
              <View style={dateItemStyles}>
                <Text style={styles.itemText}>{item}</Text>
              </View>
              <Button style={styles.closeButton} onPress={() => this.deleteDate(item)}>
                <Text style={styles.closeIcon}>X</Text>
              </Button>
            </View>
          );
        })}
      </View>
    );
  }
  renderToast = () => (
    <View style={styles.toastContainerView}>
      <View style={styles.toastContentView}>
        <Text style={styles.toastText}>{translate('selectComplete')}</Text>
      </View>
    </View>
  )

  render() {
    const {
      visible,
      minDate,
      options, pickerTitle,
    } = this.props;
    const {
      isShowPicker, selectDateArray, markDays, isShowToast,
    } = this.state;
    const confirmButtonStyles = [styles.confirmButton];
    const disabled = selectDateArray.length < 3;
    if (disabled) confirmButtonStyles.push(styles.disabledButton);
    return (
      <Modal
        visible={visible}
        transparent={false}
        animationType="slide"
        onRequestClose={this.hiddenPicker}
      >
        { this.renderHeader() }

        <Text style={styles.message}>{translate('datesMessage')}</Text>
        { this.renderDateList() }
        <ReactCalendar
          onChange={this.setSelectDate}
          markDays={markDays}
          minDate={minDate}
          isShowDefault={false}
        />

        <Button
          disabled={disabled}
          style={confirmButtonStyles}
          onPress={this.setDateArray}
        >
          <Text>{translate('confirm')}</Text>
        </Button>
        {isShowPicker && (
          <TimeRangePicker
            isVisible={isShowPicker}
            options={options}
            title={pickerTitle}
            onConfirm={this.selectTime}
            onCancel={this.onCancel}
          />
        )}
        {isShowToast && this.renderToast()}
      </Modal>
    );
  }
}

DateTimeRangeModal.defaultProps = {
  visible: false,
  calendarTitle: '',
  calendarRightText: '',
  defaultDateArray: [],
  minDate: '',
  isShowTime: true,
  pickerTitle: '',
  options: [],
  closeCalendar: () => null,
  getDateArray: () => null,
};

DateTimeRangeModal.propTypes = {
  visible: PropTypes.bool,
  calendarTitle: PropTypes.string,
  calendarRightText: PropTypes.string,
  defaultDateArray: PropTypes.array,
  minDate: PropTypes.string,
  isShowTime: PropTypes.bool,
  pickerTitle: PropTypes.string,
  options: PropTypes.array,
  closeCalendar: PropTypes.func,
  getDateArray: PropTypes.func,
};

export default DateTimeRangeModal;
