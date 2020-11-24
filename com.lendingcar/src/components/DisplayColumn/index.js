/**
*
* DisplayColumn Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'native-base';

import TranslateText from 'components/TranslateText';
import styles from './styles';

class DisplayColumn extends React.Component {
  getLabelText = (label, isTranslate, style) => (
    <TranslateText
      label={label}
      isTranslate={isTranslate}
      style={style}
    />
  );
  renderColumn = (item, index) => {
    const {
      itemComponent: ItemComponent = View,
      vertical = true, viewStyle,
      key, keyTranslate = true, keyStyle = {},
      value, valueTranslate = true, valueStyle = {},
      ...itemProps
    } = item;
    const viewKey = `${key}_${index}`;

    const newViewStyle = vertical ? [styles.verticalView] : [styles.horizontalView];
    if (viewStyle) newViewStyle.push(viewStyle);

    return (
      <ItemComponent style={newViewStyle} key={viewKey} {...itemProps}>
        { this.getLabelText(key, keyTranslate, keyStyle) }
        { this.getLabelText(value, valueTranslate, valueStyle) }
      </ItemComponent>
    );
  };
  render() {
    const {
      component: Component, componentRef, list, listViewStyle, ...otherProps
    } = this.props;

    return (
      <Component
        style={listViewStyle}
        ref={(ref) => { if (componentRef) componentRef(ref); }}
        {...otherProps}
      >
        { list.map((item, index) => this.renderColumn(item, index)) }
      </Component>
    );
  }
}

DisplayColumn.defaultProps = {
  component: View,
  componentRef: undefined,
  list: [],
  listViewStyle: {},
};

DisplayColumn.propTypes = {
  component: PropTypes.any,
  componentRef: PropTypes.func,
  list: PropTypes.array,
  listViewStyle: PropTypes.object,
};

export default DisplayColumn;
