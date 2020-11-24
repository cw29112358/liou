/**
*
* ColorFilterPart Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Icon,
} from 'native-base';
import {
  TouchableOpacity,
  Image,
} from 'react-native';
import chunk from 'lodash/chunk';

import {
  nullFunction,
} from 'utils/helpers';

import styles from './styles';

class ColorFilterPart extends React.Component {
  state = {
    iconName: 'md-add',
  }

  onIconPress = () => {
    const { iconName } = this.state;
    const newIconName = iconName === 'md-add' ? 'md-remove' : 'md-add';
    this.setState({
      iconName: newIconName,
    });
  }
  renderIcon(showIcon) {
    if (!showIcon) return null;

    const { iconName } = this.state;
    return (
      <TouchableOpacity style={styles.iconTouch} onPress={this.onIconPress}>
        <View style={styles.iconView}>
          <Icon name={iconName} style={styles.icon} />
        </View>
      </TouchableOpacity>
    );
  }

  renderFilterOptions(chunkOption, groupLength) {
    return (
      chunkOption
        .map((group, index) => {
          const key = `colorGroup${index}`;
          const viewStyle = [styles.fiterBox];
          let mapGroup = group;
          const resetLength = groupLength - group.length;
          if (resetLength) {
            const resetGroup = '*'.repeat(resetLength - 1).split('*');
            mapGroup = [...group, ...resetGroup];
          }

          return (
            <View style={viewStyle} key={key}>
              { mapGroup.map((item, i) => this.renderRowFilterOptions(item, i)) }
            </View>
          );
        })
    );
  }
  renderRowFilterOptions = (item, index) => {
    const { selectedOptions, onSelect } = this.props;
    const {
      label, value, color, url,
    } = item;
    const key = value || `color_${index}`;

    const colorStyle = [styles.colorSize, styles.colorStyle];
    if (color) colorStyle.push({ backgroundColor: color });

    const colorViewStyle = [styles.colorView];
    const active = selectedOptions.includes(value);
    if (active) colorViewStyle.push(styles.activeColorView);

    return (
      <View styles={styles.fiterView} key={key}>
        <TouchableOpacity
          style={colorViewStyle}
          onPress={() => onSelect(item, active, selectedOptions)}
        >
          { color && <View style={colorStyle}></View> }
          { (!color && url) && <Image source={url} style={[styles.colorSize]} /> }
        </TouchableOpacity>
        <Text style={styles.filterTitle}>{translate(label)}</Text>
      </View>
    );
  };

  render() {
    const { title, groupLength, options } = this.props;
    const { iconName } = this.state;
    const chunkOptions = chunk(options, groupLength);
    const showIcon = chunkOptions.length > 2;
    const showOptions = showIcon && iconName === 'md-add' ? chunkOptions.splice(0, 2) : chunkOptions;

    return (
      <View style={styles.content}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{translate(title)}</Text>
          { this.renderIcon(showIcon) }
        </View>
        <View style={styles.fiterBoxView}>
          { this.renderFilterOptions(showOptions, groupLength) }
        </View>
      </View>
    );
  }
}

ColorFilterPart.defaultProps = {
  title: '',
  groupLength: 4,
  options: [],
  selectedOptions: [],
  onSelect: nullFunction,
};

ColorFilterPart.propTypes = {
  title: PropTypes.string,
  groupLength: PropTypes.number,
  options: PropTypes.array,
  selectedOptions: PropTypes.array,
  onSelect: PropTypes.func,
};

export default ColorFilterPart;
