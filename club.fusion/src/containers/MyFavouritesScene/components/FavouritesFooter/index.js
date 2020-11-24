/**
*
* FavouritesFooter Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Footer,
  FooterTab,
  Text,
  Button,
  CheckBox,
} from 'native-base';

import styles from './styles';

const FavouritesFooter = (props) => {
  const {
    allChecked, selectedId, selectAllChecked, multipleChangeFavourites,
  } = props;
  const disabled = selectedId.length === 0;
  const footerButtonStyles = [styles.footerButtonStyle];
  const allCheckedBoxStyles = [styles.allCheckedBox];
  if (disabled) {
    footerButtonStyles.push(styles.footerDisableButtonStyle);
  }
  if (allChecked) {
    allCheckedBoxStyles.push(styles.activity);
  }

  return (
    <Footer style={styles.footerShadow}>
      <FooterTab style={styles.allChecked}>
        <CheckBox
          checked={allChecked}
          onPress={selectAllChecked}
          style={allCheckedBoxStyles}
        />
        <Text style={styles.selectAll}>{translate('selectAll')}</Text>
      </FooterTab>
      <FooterTab style={styles.buttonFooter}>
        <Button
          onPress={multipleChangeFavourites}
          disabled={disabled}
          style={footerButtonStyles}
        >
          <Text style={styles.footerButtonText}>{translate('cancleFavourites')}</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

FavouritesFooter.defaultProps = {
  allChecked: false,
  selectedId: [],
  selectAllChecked: () => null,
  multipleChangeFavourites: () => null,
};

FavouritesFooter.propTypes = {
  allChecked: PropTypes.bool,
  selectedId: PropTypes.array,
  selectAllChecked: PropTypes.func,
  multipleChangeFavourites: PropTypes.func,
};

export default FavouritesFooter;
