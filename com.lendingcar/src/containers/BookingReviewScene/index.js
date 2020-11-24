/**
 *
 * BookingReviewScene Stateless Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Image,
} from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Button,
} from 'native-base';

// utils => ... => containers => components => form
import AppHeader from 'components/AppHeader';

// ./
import reviewImage from './assets/review.png';
import styles from './styles';

function BookingReviewScene(props) {
  const { carInfo, privilege } = props;
  const goToMember = () => {
    Actions.popTo('member');
  };
  const replaceForm = () => {
    Actions.pop();
  };
  return (
    <Container>
      <AppHeader
        title="bookingReview"
        leftPress={goToMember}
      />

      <Content
        contentContainerStyle={styles.contentContainer}
        style={styles.content}
        scrollEnabled={false}
      >
        <Image source={reviewImage} style={styles.review} />
        <Text style={styles.firstParagraph}>{translate('your')}
          {translate(privilege.type)} —— {carInfo.name}{'\n'}
          {translate('suffixReviewMessage')}
        </Text>

        <Text style={styles.secondParagraph}>
          {translate('promptsMessage')}
          <Text style={styles.strongText}>{translate('focusPromptsMessage')}</Text>
        </Text>

        <View style={styles.buttonGroup}>
          <Button style={[styles.button, styles.modifyButton]} onPress={replaceForm}>
            <Text style={styles.modifyButtonText}>{translate('modifyForm')}</Text>
          </Button>
          <Button style={[styles.button, styles.jumpButton]} onPress={goToMember}>
            <Text style={styles.jumpButtonText}>{translate('toMember')}</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
}

BookingReviewScene.defaultProps = {
  carInfo: null,
  privilege: null,
};

BookingReviewScene.propTypes = {
  carInfo: PropTypes.object,
  privilege: PropTypes.object,
};

const mapStateToProps = createPropsSelector({
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(BookingReviewScene);
