import React from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import { DATE_FORMAT, DATE_CONFIG, CALCULATE_DATE_FORMAT } from 'utils/constants';

import { renderLabel, renderText } from 'formFields/helpers';
import LayoutItem from 'formFields/LayoutItem';

export class DateTimeSelectInput extends React.Component {
  constructor(props) {
    super(props);

    const { input: { value } } = props;
    this.state = {
      isVisible: false,
      dateTime: value * 1000 === 0 ? new Date() : new Date(moment(value).utcOffset(0)),
    };
  }
  componentWillMount() {
    const { input, defaultValue } = this.props;
    if (defaultValue && !input.value) {
      const realDefaultValue = this.getDefaultTime(defaultValue);
      input.onChange(realDefaultValue);
    }
  }

  getDefaultTime = (defaultValue) => {
    if (typeof defaultValue === 'number') return defaultValue;
    if (typeof defaultValue === 'function') return defaultValue();
    return defaultValue;
  }
  getShowTime = () => {
    const { input: { value }, dateFormat } = this.props;
    const { dateTime } = this.state;
    if (!value) return undefined;
    return this.getFormatTime(dateTime, dateFormat);
  }
  // dateTime 为 GMT 时间格式
  getFormatTime = (dateTime, dateFormat) => moment(dateTime).format(dateFormat)

  showDateTimePicker = () => {
    const { input, onClearFirstErrorFieldKey } = this.props;
    onClearFirstErrorFieldKey(input.name);
    this.setState({ isVisible: true });
  }
  onCancel = () => {
    this.setState({ isVisible: false });
  }
  onConfirm = (pickedDate) => {
    const { input } = this.props;
    // 后台存yyyy-mm-dd
    const formatStr = this.getFormatTime(pickedDate, CALCULATE_DATE_FORMAT);
    input.onChange(formatStr);
    this.setState({ dateTime: pickedDate });
    this.onCancel();
  }

  render() {
    const {
      mode, titleIOS, minimumDate, maximumDate,
    } = this.props;
    const { dateTime, isVisible } = this.state;

    return (
      <LayoutItem {...this.props}>
        {renderLabel(this.props)}
        {renderText.call(this, this.props, this.showDateTimePicker, this.getShowTime())}
        <DateTimePicker
          mode={mode}
          titleIOS={titleIOS}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          date={dateTime}
          isVisible={isVisible}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          {...DATE_CONFIG}
        />
      </LayoutItem>
    );
  }
}

DateTimeSelectInput.defaultProps = {
  minimumDate: undefined,
  maximumDate: undefined,
  defaultValue: '',
  mode: 'date',
  dateFormat: DATE_FORMAT,
  titleIOS: '',
};

DateTimeSelectInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }).isRequired,
  minimumDate: PropTypes.object,
  maximumDate: PropTypes.object,
  defaultValue: PropTypes.any,
  mode: PropTypes.string,
  dateFormat: PropTypes.string,
  titleIOS: PropTypes.string,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
};

export default DateTimeSelectInput;
