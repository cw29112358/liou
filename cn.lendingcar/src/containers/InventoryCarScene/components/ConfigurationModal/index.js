/**
*
* ConfigurationModal Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Text,
  List,
  ListItem,
} from 'native-base';

import {
  selectCarFeatures,
  selectCarFeaturesList,
} from 'containers/InventoryCarScene/selectors';

import styles from './styles';

const ConfigurationModal = (props) => {
  const { carFeatures, carFeaturesList } = props;

  const detailsList = [];
  if (carFeaturesList.length > 0) {
    detailsList.push({
      label: 'details',
      value: carFeaturesList,
    });
  }
  if (carFeatures.length > 0) {
    detailsList.push({
      label: 'features',
      value: carFeatures,
    });
  }

  const renderItem = (detail, lastStyle) => {
    if (detail.label) {
      // const translatedValue = Number(detail.value) ? detail.value : translate(detail.value);
      const translatedValue = Number(detail.value) || (detail.label !== 'color' && detail.label !== 'size') ? detail.value : translate(detail.value);
      const value = detail.label === 'mileage'
        ? `${translate(detail.value, 'number')} ${translate('miles')}`
        : translatedValue;
      return (
        <ListItem
          style={[styles.item, styles.universalListItem, lastStyle]}
          key={detail.label}
        >
          <Text style={styles.label}>{translate(detail.label)}</Text>
          <Text style={styles.value}>{value}</Text>
        </ListItem>
      );
    }
    return (
      <ListItem style={[styles.item, styles.featureListItem, lastStyle]} key={detail}>
        <Text style={styles.value}>{detail}</Text>
      </ListItem>
    );
  };
  const renderList = (detailsValue, isLast) => (
    detailsValue.map((detail, index) => {
      const lastStyle = isLast && index === (detailsValue.length - 1)
        ? { marginBottom: 68 }
        : {};
      return renderItem(detail, lastStyle);
    })
  );

  return (
    detailsList.map((detailsValue, detailsIndex) => {
      const isLast = detailsList.length - 1 === detailsIndex;
      if (detailsValue.value.length > 0) {
        return (
          <List key={detailsValue.label}>
            <ListItem itemHeader style={[styles.item, styles.titleLineItem]}>
              <Text style={styles.title}>{translate(detailsValue.label)}</Text>
            </ListItem>
            { renderList(detailsValue.value, isLast) }
          </List>
        );
      }
      return null;
    })
  );
};

ConfigurationModal.defaultProps = {
  carFeaturesList: [],
  carFeatures: [],
};

ConfigurationModal.propTypes = {
  carFeaturesList: PropTypes.array,
  carFeatures: PropTypes.array,
};

const mapStateToProps = createPropsSelector({
  carFeatures: selectCarFeatures,
  carFeaturesList: selectCarFeaturesList,
});

export default connect(mapStateToProps, null)(ConfigurationModal);
