/**
*
* ReactCalendar Stateless Component
*
*/

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';
import mapKeys from 'lodash/mapKeys';
import isArray from 'lodash/isArray';
import merge from 'lodash/merge';
import { Calendar } from 'react-native-calendars-fei';

import { doubleDigitize } from 'utils/helpers';
import {
  CALCULATE_DATE_FORMAT,
  WEEK_DAYS_NAMES,
  TIME_SEPARATOR,
} from 'utils/constants';

import styles from './styles';

export class ReactCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectDay: props.defaultDay || props.minDate,
    };
  }

  onDayPress = (date) => {
    const { onChange, closeModal } = this.props;
    const { dateString } = date;
    this.setState({ selectDay: dateString });
    if (onChange) {
      onChange(dateString);
    }
    if (closeModal) {
      closeModal();
    }
  }

  onPressArrowLeft = (substractMonth) => {
    const { selectDay } = this.state;
    const { minDate } = this.props;
    let currentMonth;
    if (selectDay && selectDay !== 'Invalid date') currentMonth = selectDay.substring(5, 7);
    if (currentMonth > minDate.substring(5, 7)) {
      substractMonth();
      this.setState({
        selectDay: moment(new Date(selectDay)).subtract(1, 'months').format(CALCULATE_DATE_FORMAT),
      });
    }
  }
  onPressArrowRight = (addMonth) => {
    const { selectDay } = this.state;
    addMonth();
    this.setState({
      selectDay: moment(new Date(selectDay)).add(1, 'months').format(CALCULATE_DATE_FORMAT),
    });
  }

  setSelectedDay = (markDay) => {
    const { minDate, defaultDay, isShowDefault } = this.props;
    const marked = {
      defaultKey: { selected: true },
    };
    if (isArray(markDay) && markDay.length > 0) { // 标记日期为两个及以上时
      // 设置标记格式
      const markselectDays = markDay.map((item) => mapKeys(marked, () => item));
      const markedDayObject = {};
      // 转换类型为 Object
      markselectDays.forEach((item) => {
        merge(markedDayObject, item);
      });
      return markedDayObject;
    }
    // 单选标记日期
    if (isArray(markDay) && isShowDefault) {
      return mapKeys(marked, () => defaultDay || minDate);
    }
    return mapKeys(marked, () => markDay);
  }

  renderArrow = (direction, date) => {
    let prevLabel = `${date.year}${TIME_SEPARATOR}${doubleDigitize(date.month - 1)}`;
    let nextLabel = `${date.year}${TIME_SEPARATOR}${doubleDigitize(date.month + 1)}`;

    if (Number(date.month) === 1) {
      prevLabel = `${Number(date.year) - 1}${TIME_SEPARATOR}12`;
    }
    if (Number(date.month) === 12) {
      nextLabel = `${Number(date.year) + 1}${TIME_SEPARATOR}01`;
    }
    return <Text style={styles.arrow}>{direction === 'left' ? prevLabel : nextLabel}</Text>;
  }

  render() {
    const { selectDay } = this.state;
    const { minDate, markDays } = this.props;
    return (
      <View style={styles.calendarView}>
        <Calendar
          theme={styles.themeStyle}
          current={selectDay}
          markedDates={this.setSelectedDay(markDays || selectDay)}
          minDate={minDate}
          onDayPress={this.onDayPress}
          onDayLongPress={this.onDayPress}
          monthFormat={`yyyy${TIME_SEPARATOR}MM`}
          onPressArrowLeft={this.onPressArrowLeft}
          onPressArrowRight={this.onPressArrowRight}
          renderArrow={this.renderArrow}
          calendarWidth={styles.deviceWidth}
          weekDayNames={WEEK_DAYS_NAMES}
        />
      </View>
    );
  }
}

ReactCalendar.defaultProps = {
  defaultDay: '',
  markDays: [],
  isShowDefault: true,
  onChange: () => null,
  closeModal: () => null,
};

ReactCalendar.propTypes = {
  defaultDay: PropTypes.string,
  markDays: PropTypes.array,
  isShowDefault: PropTypes.bool,
  minDate: PropTypes.any.isRequired,
  onChange: PropTypes.func,
  closeModal: PropTypes.func,
};

export default ReactCalendar;
