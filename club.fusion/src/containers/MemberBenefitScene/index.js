/**
 *
 * MemberBenefitScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { MEMBER_TEL } from 'utils/constants';
import { openURLByLinking } from 'utils/helpers';

import FullScreenScene from 'components/FullScreenScene';
import TranslateText from 'components/TranslateText';
import Button from 'components/Button';
import AnimatedCard from 'components/AnimatedCard';

import BenefitCard from './components/BenefitCard';
import styles from './styles';

export class MemberBenefitScene extends React.Component { // eslint-disable-line

  callHotline = () => {
    openURLByLinking(`tel:${MEMBER_TEL.match(/\d/g).join('')}`, 'notSupportPhoneUrl');
  };

  renderButton = () => (
    <Button
      transparent
      {...styles.linearProps}
      onPress={this.callHotline}
      shadowStyle={[styles.brandShadow, styles.submitPosition]}
      style={styles.linearButton}
      textLabel="memberTel"
      textStyle={styles.linearButtonText}
      textOtherProps={{
        rightChildren: MEMBER_TEL,
      }}
    />
  );

  render() {
    const { points, benefits, index } = this.props;

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
        { this.renderButton() }
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
  points: PropTypes.number,
  benefits: PropTypes.array,
  index: PropTypes.number,
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(MemberBenefitScene);
