/**
 *
 * FreeCarScene Stateless Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { ImageBackground, Image } from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
} from 'native-base';

// utils => ... => containers => components => form
import LuxuryCarBgImage from 'assets/luxuryCar.png';
import membershipImage from 'assets/membership.png';
import AppHeader from 'components/AppHeader';
import LinearGradientButton from 'components/LinearGradientButton';

// ./
import freeCarImage from './assets/freeCar.png';
import { MEMBERSHIP_RULES } from './constants';
import styles from './styles';

function FreeCarScene(props) {
  const { memberCardInfo, isMembership } = props;

  const buttonLink = () => isMembership ? Actions.reset('home') : Actions.push('memberPayment', { memberCardInfo });
  const renderMembershipTitle = () => (
    <View style={styles.membershipView}>
      <Text style={styles.membershipText}>{ translate('prefixInviteMessage') }</Text>
      <View style={styles.memberText}>
        <Image source={membershipImage} style={styles.membershipImage} />
        <Text style={styles.membershipText}>{translate('membershipKey')}</Text>
      </View>
      <Text style={styles.membershipText}>{ translate('suffixInviteMessage') }</Text>
    </View>
  );
  const renderMembershipService = () => (
    <Text style={styles.freeMessageText}>
      {translate('prefixFreeMessage')}
      <Text style={styles.freeText}>{translate('freeMessage')}</Text>
      {translate('suffixFreeMessage')}
    </Text>
  );
  const renderMemberPropaganda = () => (
    <View style={styles.membershipPropaganda}>
      {renderMembershipTitle()}
      {renderMembershipService()}
      <Image source={freeCarImage} style={styles.carImage} />
      <Text style={[styles.decsribeText, styles.carTotalText]}>
        <Text style={styles.carTotalNumber}>{translate('carTotalNumber')}</Text>
        {translate('suffixTotalCar')}
      </Text>
      <Text style={[styles.decsribeText, styles.carNoteText]}>
        {translate('prefixNote')}
        {translate('centerNote')}
        <Text style={styles.carTotalNumber}>{translate('suffixNote')}</Text>
      </Text>
      <Text style={styles.serviceText}>{translate('serviceCity')}</Text>
    </View>
  );
  const renderMemberButton = () => {
    const buttonLabel = isMembership ? 'pickCar' : 'buyMemberShipText';
    return (
      <LinearGradientButton
        buttonLabel={buttonLabel}
        onButtonPress={buttonLink}
      />
    );
  };
  const renderList = (list, title, isShowHr) => {
    // 后两个参数为 *注意事项* 做样式，暂先保留
    const listTitleLineStyles = [styles.listTitleLine];
    const listTitleStyles = [styles.listTitle];
    if (!isShowHr) {
      listTitleLineStyles.push(styles.listTitleLineWithoutHr);
      listTitleStyles.push(styles.listTitleWithoutHr);
    }
    return (
      <View style={styles.list}>
        <View style={listTitleLineStyles}>
          {isShowHr && <View style={styles.hr} />}
          <Text style={listTitleStyles}>{translate(title)}</Text>
          {isShowHr && <View style={styles.hr} />}
        </View>
        {list.map((item) => (
          <View style={styles.listItem} key={item}>
            <Text style={styles.prefixText}>• </Text>
            <Text style={styles.itemText}>{translate(item)}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <Container>
      <AppHeader title="freeCarTitle" />

      <Content
        contentContainerStyle={styles.contentContainer}
        style={styles.content}
      >
        <ImageBackground source={LuxuryCarBgImage} style={styles.bgImage}>
          <View style={styles.contentView}>
            { renderMemberPropaganda() }
            { renderMemberButton() }
            { renderList(MEMBERSHIP_RULES, 'membershipRules', true) }
          </View>
        </ImageBackground>

      </Content>
    </Container>
  );
}

FreeCarScene.defaultProps = {
  memberCardInfo: null,
  isMembership: false,
};

FreeCarScene.propTypes = {
  memberCardInfo: PropTypes.object,
  isMembership: PropTypes.bool,
};

const mapStateToProps = createPropsSelector({
  // test: selectTest,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(FreeCarScene);
