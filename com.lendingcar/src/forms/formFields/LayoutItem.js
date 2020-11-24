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

class LayoutItem extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { onSetFirstErrorFieldKeLayout, name, firstErrorFieldKey } = this.props;
    if (nextProps.firstErrorFieldKey === name
      && firstErrorFieldKey !== nextProps.firstErrorFieldKey) {
      onSetFirstErrorFieldKeLayout(this.layout);
    }
  }
  onLayout = (e) => {
    this.layout = e.nativeEvent.layout;
  }

  render() {
    return (
      <Item
        {...this.props}
        onLayout={this.onLayout}
        ref={this.getItemRef}
      />
    );
  }
}

LayoutItem.defaultProps = {
  name: '',
  firstErrorFieldKey: null,
};

LayoutItem.propTypes = {
  name: PropTypes.string,
  firstErrorFieldKey: PropTypes.string,
  onSetFirstErrorFieldKeLayout: PropTypes.func.isRequired,
};

export default LayoutItem;
