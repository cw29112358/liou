/**
 *
 * MemberScene Stateless Container
 *
 */

import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  View,
} from 'native-base';
import {
  ImageBackground,
} from 'react-native';

import FullScreenScene from 'components/FullScreenScene';
import TranslateText from 'components/TranslateText';
import Button from 'components/Button';

import bgImage from './assets/bg.png';
import styles from './styles';

function MemberScene() {
  const renderText = (label, style, key) => (
    <TranslateText key={key} label={label} style={style} />
  );
  const renderTextArray = (textArray, style) => (
    textArray.map((label) => renderText(label, style, label))
  );

  // middle
  // const renderEnjoy = () => (
  //   <View style={styles.enjoyCircleView}>
  //     {
  //       ['enjoy1', 'enjoy2', 'enjoy3'].map((label) => (
  //         <View key={label} style={styles.enjoyCircle}>
  //           { renderText(label, styles.enjoyText) }
  //         </View>
  //       ))
  //     }
  //   </View>
  // );
  // const renderCard = () => (
  //   <View style={[styles.cardView, styles.brandShadow]}>
  //     { renderText('membershipBonus', styles.enjoyText) }
  //     <View style={styles.lineGlod} />
  //     { renderText('membershipWelfare', styles.enjoyText) }
  //   </View>
  // );

  // bottom
  const linkToMemberPayment = () => {
    Actions.push('memberPayment');
  };
  const renderButton = () => (
    <View style={styles.submitPosition}>
      <Button
        transparent
        {...styles.linearProps}
        onPress={linkToMemberPayment}
        style={styles.linearButton}
        textLabel="memberPurchase"
        textStyle={styles.linearButtonText}
      />
    </View>
  );

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      <FullScreenScene
        headerProps={{
          headerSettings: {
            transparent: true,
          },
        }}
        headerTitle="becomeAMember"
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
      >
        { renderTextArray(['memberTitle1', 'memberTitle2'], styles.titleText) }

        {/* { renderEnjoy() } */}
        {/* { renderCard() } */}
        <View style={styles.lineBlack} />
        { renderTextArray(['memberTip1', 'memberTip2', 'memberTip3'], styles.tipText) }

        { renderButton() }
      </FullScreenScene>
    </ImageBackground>
  );
}

MemberScene.defaultProps = {
};

MemberScene.propTypes = {
};

export default MemberScene;
