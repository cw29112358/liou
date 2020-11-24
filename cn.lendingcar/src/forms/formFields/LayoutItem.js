/**
*
* LayoutItem
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import {
  Item,
} from 'native-base';

import { getIsError } from 'formFields/helpers';

import styles from './styles';

class LayoutItem extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.setFirstErrorFieldKeLayout(nextProps);
  }

  // 如果第一个错误key===input.name, 设置当前的layout
  setFirstErrorFieldKeLayout(nextProps) {
    const {
      input: { name }, firstErrorFieldKey,
      onSetFirstErrorFieldKeLayout,
    } = this.props;

    if (nextProps.firstErrorFieldKey === name
      && nextProps.firstErrorFieldKey !== firstErrorFieldKey) {
      onSetFirstErrorFieldKeLayout(this.layout);
    }
  }
  onLayout = (e) => {
    this.layout = e.nativeEvent.layout;
  }

  render() {
    const {
      layout, itemSettings, defaultStyle, itemStyle,
    } = this.props;
    let newItemStyle = [styles.field];
    if (layout === 'vertical') newItemStyle.push(styles.fieldVertical);
    newItemStyle = newItemStyle.concat(defaultStyle, itemStyle);
    if (getIsError(this.props)) {
      newItemStyle.push(styles.fieldError);
    }

    return (
      <Item
        {...this.props}
        {...itemSettings}
        style={newItemStyle}
        onLayout={this.onLayout}
        ref={this.getItemRef}
      />
    );
  }
}

LayoutItem.defaultProps = {
  layout: 'horizontal',
  firstErrorFieldKey: null,
  itemSettings: {},
  defaultStyle: {},
  itemStyle: {},
  showAllError: false,
  errorKeys: {},
};

LayoutItem.propTypes = {
  layout: PropTypes.string,
  input: PropTypes.object.isRequired,
  firstErrorFieldKey: PropTypes.string,
  onSetFirstErrorFieldKeLayout: PropTypes.func.isRequired,
  itemSettings: PropTypes.object,
  defaultStyle: PropTypes.object,
  itemStyle: PropTypes.object,
  showAllError: PropTypes.bool,
  errorKeys: PropTypes.object,
};

export default LayoutItem;
