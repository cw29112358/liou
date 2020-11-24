/**
 *
 * BonusScene Stateless Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  View,
} from 'native-base';

import {
  selectIsDone,
  selectAuthUserMembership,
} from 'containers/AppRouter/selectors';
import { updateMembershipAction } from 'containers/AppRouter/actions';

import FullScreenScene from 'components/FullScreenScene';
import TranslateText from 'components/TranslateText';

import styles from './styles';

class BonusScene extends React.Component {
  loadLoadMembership = () => {
    const { updateMembership } = this.props;
    updateMembership();
  }
  renderBonus = (dividend) => (
    <View style={[styles.blackShadow, styles.bonusView]}>
      <TranslateText label="currentBonus" style={styles.bonusTitle} />
      <TranslateText label={translate(dividend, 'number')} isTranslate={false} style={styles.bonusValue} />
    </View>
  );

  render() {
    const { done, membership: { dividend } } = this.props;

    return (
      <FullScreenScene
        headerTitle="myBonus"
        hasRefresh
        refreshing={!done}
        onRefresh={this.loadLoadMembership}
      >
        { this.renderBonus(dividend) }
      </FullScreenScene>
    );
  }
}

BonusScene.defaultProps = {
};

BonusScene.propTypes = {
  done: PropTypes.bool.isRequired,
  membership: PropTypes.object.isRequired,
  updateMembership: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  done: selectIsDone,
  membership: selectAuthUserMembership,
});

const mapDispatchToProps = (dispatch) => ({
  updateMembership: () => dispatch(updateMembershipAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(BonusScene);
