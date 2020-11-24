/**
*
* RangeSlide Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'native-base';
import {
  Image,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import {
  nullFunction,
} from 'utils/helpers';

import FilterTitle from '../FilterTitle';

import sliderImage from './assets/slider.png';
import styles from './styles';

class RangeSlide extends React.Component {
  constructor(props) {
    super(props);

    const { values } = props;
    this.state = {
      currentValues: values,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { values } = this.props;
    if (nextProps.values !== values) {
      this.setState({ currentValues: nextProps.values });
    }
  }

  onValuesChange = (values) => {
    this.setState({ currentValues: values });
  }
  customMarker = (e, style = {}) => (
    <View style={styles.markerView}>
      <Image
        source={sliderImage}
        style={[styles.marker, style]}
        currentValue={e.currentValue}
      />
    </View>
  );

  renderTitle() {
    const { hasTitle, leftLabel, rightLabel } = this.props;

    if (!hasTitle) return null;
    return <FilterTitle translateLeft={false} leftLabel={leftLabel} rightLabel={rightLabel} />;
  }
  renderSliderTitle() {
    const { valueFormat } = this.props;
    const { currentValues } = this.state;
    return (
      <View style={[styles.sliderValueView, { width: this.sliderLength }]}>
        <Text style={[styles.sliderValue, styles.sliderValueLeft]}>
          {valueFormat(currentValues[0])}
        </Text>
        <Text style={[styles.sliderValue, styles.sliderValueRight]}>
          {valueFormat(currentValues[1])}
        </Text>
      </View>
    );
  }
  renderSlider() {
    const {
      sliderLength, min, max, step, onValuesChange,
    } = this.props;
    const { currentValues } = this.state;
    this.sliderLength = sliderLength || styles.sliderLength;

    return (
      <View style={styles.sliderView}>
        { this.renderSliderTitle() }
        <MultiSlider
          sliderLength={this.sliderLength}
          containerStyle={styles.containerStyle}
          truckStyle={styles.truckStyle}
          selectedStyle={styles.selectedStyle}
          unselectedStyle={styles.unselectedStyle}
          customMarker={this.customMarker}
          min={min}
          max={max}
          step={step}
          values={currentValues}
          onValuesChange={this.onValuesChange}
          onValuesChangeFinish={onValuesChange}
          allowOverlap
          snapped
        />
      </View>
    );
  }
  render() {
    const { containerViewStyle } = this.props;

    return (
      <View style={containerViewStyle}>
        { this.renderTitle() }
        { this.renderSlider() }
      </View>
    );
  }
}

RangeSlide.defaultProps = {
  hasTitle: true,
  leftLabel: '',
  rightLabel: '',
  min: 0,
  max: 10,
  step: 1,
  values: [0, 5],
  sliderLength: 0,
  containerViewStyle: null,
  onValuesChange: nullFunction,
  valueFormat: (value) => value,
};

RangeSlide.propTypes = {
  hasTitle: PropTypes.bool,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  values: PropTypes.array,
  sliderLength: PropTypes.number,
  containerViewStyle: PropTypes.object,
  onValuesChange: PropTypes.func,
  valueFormat: PropTypes.func,
};

export default RangeSlide;
