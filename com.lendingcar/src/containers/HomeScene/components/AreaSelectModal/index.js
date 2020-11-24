/**
*
* AreaSelectModal Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ListItem,
  Text,
  Icon,
} from 'native-base';
import { ScrollView } from 'react-native';

import Mask from 'components/Mask';

import styles from './styles';

const AreaSelectModal = (props) => {
  const {
    changeSelectModal, area, changeArea, currentArea,
  } = props;

  const renderItem = (item) => {
    const isSelected = currentArea
      ? item === currentArea
      : item === area[0];

    return (
      <ListItem
        key={item}
        style={styles.listItem}
        onPress={() => changeArea(item)}
      >
        <Text style={styles.itemText}>{translate(item)}</Text>
        {isSelected
          && <Icon name="checkmark" style={styles.markIcon} />
        }
      </ListItem>
    );
  };

  return (
    <View style={styles.modalMask}>
      <Mask
        onPress={changeSelectModal}
        style={styles.mask}
        childrenStyle={styles.maskChildren}
      >
        <View style={styles.modalContent}>
          <ScrollView
            style={styles.listStyle}
            contentContainerStyle={styles.scrollContent}
          >
            {area && area.map((item) => renderItem(item))}
          </ScrollView>
        </View>
      </Mask>
    </View>
  );
};

AreaSelectModal.defaultProps = {
  area: [],
  currentArea: '',
  changeSelectModal: () => null,
  changeArea: () => null,
};

AreaSelectModal.propTypes = {
  area: PropTypes.array,
  currentArea: PropTypes.string,
  changeSelectModal: PropTypes.func,
  changeArea: PropTypes.func,
};

export default AreaSelectModal;
