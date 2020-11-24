/**
*
* RangePicker
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import TranslatedMessage from 'components/TranslatedMessage';
import { Slider } from 'antd';

import messages from './messages';
import './style.scss';

class RangePicker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { yearRangeData: { yearRangeStart, yearRangeEnd }, priceRangeData: { priceRangeStart, priceRangeEnd } } = this.props;
    this.state = {
      yearStart: yearRangeStart,
      yearEnd: yearRangeEnd,
      priceStart: priceRangeStart,
      priceEnd: priceRangeEnd,
    };
  }
  getDefaultValue = (selectedRange, start, range) => {
    if (!selectedRange || !selectedRange.length) return [0, range];

    return selectedRange.map((item) => item - start);
  }

  yearTipFormatter = (val) => val + this.props.yearRangeData.yearRangeStart
  yearChange = (value) => {
    const { yearRangeStart } = this.props.yearRangeData;
    this.setState({
      yearStart: value[0] + yearRangeStart,
      yearEnd: value[1] + yearRangeStart,
    });
  }
  yearAfterChange = (value) => {
    const { yearRangeStart } = this.props.yearRangeData;
    const newValue = value.map((val) => val + yearRangeStart);
    this.props.changeYearRange(newValue);
  }

  priceTipFormatter = (val) => `$${val}`
  priceChange = (value) => {
    this.setState({
      priceStart: value[0],
      priceEnd: value[1],
    });
  }
  priceAfterChange = (value) => this.props.changePriceRange(value)

  render() {
    const { yearStart, yearEnd, priceStart, priceEnd } = this.state;
    const { yearRange, yearRangeData, priceRange, priceRangeData } = this.props;
    const defaultYear = this.getDefaultValue(yearRange, yearRangeData.yearRangeStart, yearRangeData.yearRange);
    const defaultPrice = this.getDefaultValue(priceRange, priceRangeData.priceRangeStart, priceRangeData.priceRange);

    return (
      <div className="range-options">
        <div className="range-slider">
          <p className="range-info">
            <span className="range-title">
              <TranslatedMessage messages={messages} messageId="yearRange" />
            </span>
            <span className="range-detail">{`${yearStart} - ${yearEnd}`}</span>
          </p>
          <Slider
            range
            defaultValue={defaultYear}
            max={yearRangeData.yearRange}
            marks={yearRangeData.yearMarks}
            tipFormatter={this.yearTipFormatter}
            onChange={this.yearChange}
            onAfterChange={this.yearAfterChange}
          />
        </div>
        <div className="range-slider">
          <p className="range-info">
            <span className="range-title">
              <TranslatedMessage messages={messages} messageId="priceRange" />
            </span>
            <span className="range-detail">{`$${priceStart} - $${priceEnd}`}</span>
          </p>
          <Slider
            range
            defaultValue={defaultPrice}
            max={priceRangeData.priceRangeEnd}
            marks={priceRangeData.priceMarks}
            tipFormatter={this.priceTipFormatter}
            onChange={this.priceChange}
            onAfterChange={this.priceAfterChange}
          />
        </div>
      </div>
    );
  }
}

RangePicker.propTypes = {
  changeYearRange: PropTypes.func,
  changePriceRange: PropTypes.func,
  yearRange: PropTypes.array,
  yearRangeData: PropTypes.object,
  priceRange: PropTypes.array,
  priceRangeData: PropTypes.object,
};

export default RangePicker;
