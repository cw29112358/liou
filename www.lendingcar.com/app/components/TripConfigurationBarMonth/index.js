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
import { LOCATIONS, PASSENGERS, DATE, TERM, SIZES } from './constants';
import messages from './messages';
import './style.scss';

const FormItem = Form.Item;
// const { RangePicker } = DatePicker;
const Option = Select.Option;
// const today = new Date(new Date().setHours(0, 0, 0, 0));

export class TripConfigurationMonthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      area: 'bayArea',
      date: moment().add(1, 'd'),
      // passengers: 1,
      size: 'all',
      term: 12,
      minSelectabilyDate: '',
      hasError: false,
    };
  }
  componentWillMount() {
    const area = sessionStorage.getItem('area');
    // const passengers = sessionStorage.getItem('passengers');
    const size = sessionStorage.getItem('size');
    const date = sessionStorage.getItem('date');
    const term = sessionStorage.getItem('term');
    if (date) {
      this.setState({
        area: area || 'bayArea',
        date: new Date(date),
        // passengers: Number(passengers) || 1,
        size: size || 'all',
        term: Number(term) || 12,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.handle !== nextProps.handle) {
      this.handleSubmit();
    }
  }

  handleSubmit = (e) => {
    if (e) e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!values.date) this.setState({ hasError: true });
      sessionStorage.setItem('area', values.area);
      // sessionStorage.setItem('passengers', values.passengers);
      sessionStorage.setItem('size', values.size);
      sessionStorage.setItem('term', values.term);
      if (!err && values.date) {
        sessionStorage.setItem('date', new Date(values.date).toISOString());
        if ((this.props.landingPage && !this.state.hasError) || (this.props.fromMobile && !this.state.hasError)) {
          this.props.linkTo('/inventory');
        } else {
          this.props.changeCalculator({
            area: values.area,
            // passengers: values.passengers,
            size: values.size,
            date: new Date(values.date).toISOString(),
            term: values.term,
          });
        }
      }
    });
  }
  handleChange = (item, value) => {
    // console.log(item, value);
    sessionStorage.setItem(item, value);
  }

  datePickerPlaceholder = this.props.intl.formatMessage(messages.placeholderDate);
  fontStyle = this.props.fromMobile ? { fontSize: '15px', fontFamily: 'Helvetica Neue' } : { fontSize: '18px', fontFamily: 'Helvetica Neue' };

  renderLocation = (getFieldDecorator) => {
    const locationsField = this.props.locationsField;

    return (
      <FormItem
        colon={false}
        className="start"
        label={
          <p className="p font-style">
            <TranslatedMessage messages={messages} messageId={locationsField.label} />
          </p>
      }

      >
        {getFieldDecorator('area', { initialValue: this.state.area })(
          <Select className="font-style" onChange={(value) => this.handleChange('area', value)}>
            {LOCATIONS.options && LOCATIONS.options.map((option, index) =>
              <Option value={option.value} key={index} disabled={option.unSelect} style={this.fontStyle}><TranslatedMessage messages={messages} messageId={option.value} /></Option>


          )}
          </Select>
      )}
      </FormItem>
    );
  };
  renderPerson = (getFieldDecorator) => (
    <FormItem
      colon={false}
      className="start vertical-line"
      label={
        <p className="p font-style">
          <TranslatedMessage messages={messages} messageId={PASSENGERS.label} />
        </p>
      }
    >
      {getFieldDecorator('passengers', { initialValue: this.state.passengers })(
        <Select className="ant-select font-style" onChange={(value) => this.handleChange('passengers', value)}>
          {PASSENGERS.options && PASSENGERS.options.map((option, index) =>
            <Option value={option.value} key={index} disabled={option.unSelect} style={this.fontStyle}>{option.label}</Option>
          )}
        </Select>
      )}
    </FormItem>
  );
  renderSize = (getFieldDecorator) => (
    <FormItem
      colon={false}
      className="start vertical-line"
      label={
        <p className="p font-style">
          <TranslatedMessage messages={messages} messageId={SIZES.label} />
        </p>
      }
    >
      {getFieldDecorator('size', { initialValue: this.state.size })(
        <Select className="ant-select font-style" onChange={(value) => this.handleChange('size', value)} style={{ width: '100%' }}>
          {SIZES.options && SIZES.options.map((option, index) =>
            <Option value={option.value} key={index} disabled={option.unSelect} style={this.fontStyle}><TranslatedMessage messages={messages} messageId={option.label} /></Option>
          )}
        </Select>
      )}
    </FormItem>
  );
  renderDate = (getFieldDecorator) => {
    const hasError = this.state.hasError ? 'end vertical-line has-error' : 'end vertical-line';
    const dateFormat = 'MM/DD/YYYY';

    return (
      <FormItem
        colon={false}
        className={hasError}
        label={
          <p className="p font-style">
            <TranslatedMessage messages={messages} messageId={DATE.label} />
          </p>
        }
      >
        {getFieldDecorator('date', {
          initialValue: moment(this.state.date, dateFormat),
          rules: [
            {
              required: this.state.hasError,
              message: ' ',
            },
          ],
        })(
          <DatePicker
            // placeholder={this.datePickerPlaceholder}
            disabledDate={(date) => date && date < moment().endOf('day')}
            onChange={(date) => {
              if (!date) {
                this.setState({ hasError: true });
              } else {
                this.setState({ hasError: false });
                this.handleChange('date', new Date(date.toDate()).toISOString());
              }
            }}
            renderExtraFooter={() => <TranslatedMessage messages={messages} messageId="selectPickUpdate" />}
            format={dateFormat}
          />
        )}
      </FormItem>
    );
  }
  renderTerm = (getFieldDecorator) => (
    <FormItem
      colon={false}
      className="start vertical-line"
      label={
        <p className="p font-style">
          <TranslatedMessage messages={messages} messageId={TERM.label} />
        </p>
      }
    >
      {getFieldDecorator('term', { initialValue: this.state.term })(
        <Select className="ant-select font-style" onChange={(value) => this.handleChange('term', value)} style={{ width: '100%' }} >
          {TERM.options && TERM.options.map((option, index) =>
            <Option value={option.value} key={index} disabled={option.unSelect} style={this.fontStyle}><TranslatedMessage messages={messages} messageId={option.label} /></Option>
          )}
        </Select>
      )}
    </FormItem>
  );
  renderSearchForm = (getFieldDecorator) => (
    <Form layout="inline" onSubmit={this.handleSubmit}>
      {this.renderLocation(getFieldDecorator)}
      {/* {this.renderPerson(getFieldDecorator)}*/}
      {this.renderSize(getFieldDecorator)}
      {this.renderDate(getFieldDecorator)}
      {this.renderTerm(getFieldDecorator)}
      <FormItem className="submit-button-item">
        <Button className="submit-button" htmlType="submit" >
          <TranslatedMessage messages={messages} messageId={this.props.submitText} />
        </Button>
      </FormItem>
    </Form>
  )
  render() {
    const { form, landingPage, fromMobile } = this.props;
    const { getFieldDecorator } = form;
    let className = '';
    // const className = landingPage ? 'landing-bar' : 'inventory-bar';
    // if (landingPage) {
    //   className = 'landing-bar';
    // } else if (fromMobile) {
    //   className = 'mobile-bar';
    // } else {
    //   className = 'inventory-bar';
    // }
    if (fromMobile) {
      className = 'mobile-bar';
    } else if (landingPage) {
      className = 'landing-bar';
    } else {
      className = 'inventory-bar';
    }
    return (
      <div className="trip-bar-month">
        <div className={className}>
          {this.renderSearchForm(getFieldDecorator)}
        </div>
      </div>
    );
  }
}

TripConfigurationMonthForm.propTypes = {
  intl: PropTypes.object,
  linkTo: PropTypes.func,
  form: PropTypes.object,
  handle: PropTypes.bool,
  landingPage: PropTypes.bool,
  fromMobile: PropTypes.bool,
  submitText: PropTypes.string,
  locationsField: PropTypes.object,
  changeCalculator: PropTypes.func,
};

const TripConfigurationBarMonth = Form.create()(TripConfigurationMonthForm);

export default TripConfigurationBarMonth;
