/*
 *
 * LandingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Select, Button, Form } from 'antd';
import moment from 'moment';
import TranslatedMessage from 'components/TranslatedMessage';
import { LOCATIONS, PASSENGERS, DATE } from './constants';
import messages from './messages';
import './style.scss';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;
const today = new Date(new Date().setHours(0, 0, 0, 0));

export class TripConfigurationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultDate: '',
      defaultPassengers: 1,
      minSelectabilyDate: '',
      hasError: false,
    };
  }

  componentWillMount() {
    const lastDate = sessionStorage.getItem('date');
    const lastPassengers = sessionStorage.getItem('passengers');
    if (lastDate) {
      const date = lastDate.split(',');
      this.setState({
        defaultDate: [moment(new Date(date[0])), moment(new Date(date[1]))],
        defaultPassengers: Number(lastPassengers) || 1,
      });
    }
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
    document.getElementsByClassName('ant-calendar-range-picker-separator')[0].textContent = ' _ ';
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.handle !== nextProps.handle) {
      this.handleSubmit();
    }
  }

  datedifference(dates) {    // sDate1和sDate2是2006-12-18格式
    const sDate1 = Date.parse(dates[0].format('YYYY-MM-DD'));
    const sDate2 = Date.parse(dates[1].format('YYYY-MM-DD'));
    let dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    const months = Math.floor(dateSpan / (24 * 3600 * 1000 * 30));
    const days = Math.floor(dateSpan / (24 * 3600 * 1000));
    sessionStorage.setItem('months', months);
    sessionStorage.setItem('days', days);
    return months;
  }

  handleSubmit = (e) => {
    if (e) e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!values.date && values.date.length <= 0) this.setState({ hasError: true });
      sessionStorage.setItem('passengers', values.passengers);
      if (!err && values.date && values.date.length > 0) {
        sessionStorage.setItem('date', values.date);
        const term = this.datedifference(values.date);
        this.props.changeCalculator({ area: values.area, term, passengers: values.passengers });
        if (term < 0) console.log('error back');
        if (this.props.landingPage && !this.state.hasError) this.props.linkTo('/inventory');
      }
    });
  }

  rangePickerPlaceholder = [this.props.intl.formatMessage(messages.placeholderStart), this.props.intl.formatMessage(messages.placeholderEnd)];

  renderLocation = (getFieldDecorator) => (
    <FormItem
      colon={false}
      className="start"
      label={
        <p className="p">
          <TranslatedMessage messages={messages} messageId={LOCATIONS.label} />
        </p>
      }
    >
      {getFieldDecorator('area', { initialValue: LOCATIONS.defaultValue })(
        <Select onChange={this.handleChange}>
          {LOCATIONS.options && LOCATIONS.options.map((option, index) =>
            <Option value={option.value} key={index} disabled={option.unSelect}><TranslatedMessage messages={messages} messageId={option.label} /></Option>
            )}
        </Select>
      )
    }
    </FormItem>
  );

  renderPerson = (getFieldDecorator) => (
    <FormItem
      colon={false}
      className="start vertical-line"
      label={
        <p className="p">
          <TranslatedMessage messages={messages} messageId={PASSENGERS.label} />
        </p>
      }
    >
      {getFieldDecorator('passengers', { initialValue: this.state.defaultPassengers })(
        <Select className="ant-select" onChange={this.handleChange}>
          {PASSENGERS.options && PASSENGERS.options.map((option, index) =>
            <Option value={option.value} key={index} disabled={option.unSelect}>{option.label}</Option>
              )}
        </Select>
      )
    }
    </FormItem>
  );

  renderDate = (getFieldDecorator) => {
    const hasError = this.state.hasError ? 'end vertical-line has-error' : 'end vertical-line';
    return (
      <FormItem
        colon={false}
        className={hasError}
        label={
          <p className="p">
            <TranslatedMessage messages={messages} messageId={DATE.label} />
          </p>
        }
      >
        {getFieldDecorator('date', {
          initialValue: this.state.defaultDate,
          rules: [
            {
              required: this.state.hasError,
              message: ' ',
            },
          ],
        })(
          <RangePicker
            placeholder={this.rangePickerPlaceholder}
            disabledDate={(date) => {
              const currentDate = Date.parse(date.format('YYYY-MM-DD'));
              if (this.state.minSelectabilyDate) {
                const maxDate = Date.parse(moment(this.state.minSelectabilyDate).add(30, 'days').format('YYYY-MM-DD'));
                const minDate = Date.parse(moment(this.state.minSelectabilyDate).subtract(30, 'days').format('YYYY-MM-DD'));
                if (minDate <= today) {
                  return currentDate < maxDate;
                }
                return (currentDate < maxDate && currentDate > minDate) || currentDate <= today;
              }
              return currentDate && currentDate <= today;
            }}
            onCalendarChange={(date) => {
              this.setState({ minSelectabilyDate: (new Date(date)).getTime() });
            }
            }
            onChange={(date) => {
              if (date && date.length <= 0) {
                this.setState({ hasError: true });
              } else {
                this.setState({ hasError: false });
              }
            }}
            renderExtraFooter={() => <p>所选日期范围不得小于一个月</p>}
          />
      )
    }
      </FormItem>
    );
  }


  renderSearchForm = (getFieldDecorator) => (
    <Form layout="inline" onSubmit={this.handleSubmit}>
      {this.renderLocation(getFieldDecorator)}
      {this.renderPerson(getFieldDecorator)}
      {this.renderDate(getFieldDecorator)}
      <FormItem className="submit-button-item">
        <Button className="submit-button" htmlType="submit" >
          <TranslatedMessage messages={messages} messageId={this.props.submitText} />
        </Button>
      </FormItem>
    </Form>
  )

  render() {
    const { form, landingPage } = this.props;
    const { getFieldDecorator } = form;
    const className = landingPage ? 'landing-bar' : 'inventory-bar';
    return (
      <div className="trip-bar">
        <div className={className}>
          {this.renderSearchForm(getFieldDecorator)}
        </div>
      </div>
    );
  }
}

TripConfigurationForm.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  changeCalculator: PropTypes.func,
  linkTo: PropTypes.func,
  landingPage: PropTypes.bool,
  handle: PropTypes.bool,
  submitText: PropTypes.string,
};

const TripConfigurationBar = Form.create()(TripConfigurationForm);

export default TripConfigurationBar;
