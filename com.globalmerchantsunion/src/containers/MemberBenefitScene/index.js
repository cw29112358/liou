/**
 *
 * MemberBenefitScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { connect } from 'react-redux';

import { MEMBER_TEL } from 'utils/constants';
import { openURLByLinking } from 'utils/helpers';

import {
  selectAuthUserMembership,
} from 'containers/AppRouter/selectors';

import FullScreenScene from 'components/FullScreenScene';
import TranslateText from 'components/TranslateText';
import Button from 'components/Button';
import AnimatedCard from 'components/AnimatedCard';

import BenefitCard from './components/BenefitCard';
import styles from './styles';

export class MemberBenefitScene extends React.Component { // eslint-disable-line

  callHotline = () => {
    const {
      membership: { isMembership },
    } = this.props;
    if (isMembership) {
      openURLByLinking(`tel:${MEMBER_TEL.match(/\d/g).join('')}`, 'notSupportPhoneUrl');
    } else {
      Actions.push('memberPayment');
    }
  };

  renderButton = (isMembership) => {
    const textLabel = isMembership ? 'memberTel' : 'memberPurchase';
    return (
      <Button
        transparent
        {...styles.linearProps}
        onPress={this.callHotline}
        shadowStyle={[styles.brandShadow, styles.submitPosition]}
        style={styles.linearButton}
        textLabel={textLabel}
        textStyle={styles.linearButtonText}
        textOtherProps={{
          rightChildren: isMembership ? MEMBER_TEL : '',
        }}
      />
    );
  }

  render() {
    const {
      points, benefits, index,
      membership: { isMembership },
    } = this.props;

    return (
      <FullScreenScene
        headerTitle="memberBenefit"
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}
      >
        <TranslateText
          label="myPoints"
          style={styles.subTitle}
          rightChildren={<TranslateText label={translate(points, 'number')} style={styles.subTitleGold} isTranslate={false} />}
        />
        <AnimatedCard
          list={benefits}
          index={index}
          card={BenefitCard}
        />
        { this.renderButton(isMembership) }
      </FullScreenScene>
    );
  }
}

MemberBenefitScene.defaultProps = {
  points: 0,
  benefits: [],
  index: 0,
};

MemberBenefitScene.propTypes = {
  membership: PropTypes.object.isRequired,
  points: PropTypes.number,
  benefits: PropTypes.array,
  index: PropTypes.number,
};

const mapStateToProps = createPropsSelector({
  membership: selectAuthUserMembership,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(MemberBenefitScene);
