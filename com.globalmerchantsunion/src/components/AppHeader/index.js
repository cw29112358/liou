/**
*
* AppHeader Stateless Component
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ImageBackground,
} from 'react-native';
import {
  Header,
  Left,
  Body,
  Right,
  Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Button from 'components/Button';
import AppStatusBar from 'components/AppStatusBar';

import bgImage from './assets/bg.png';
import styles from './styles';

const AppHeader = (props) => {
  const {
    hasStatusBar, hasLeft, hasTitle, hasRight,
    headerSettings, isTranslate, headerStyle,
    leftFieldStyle, leftImage, leftIconName, leftLable, leftPress,
    leftButtonStyle, leftIconStyle, leftButtonOtherProps,

    bodyFieldStyle, rightImage, rightIconName, rightLable, rightPress, rightButton,
    rightButtonStyle, rightIconStyle, rightButtonOtherProps,

    rightFieldStyle, title, titleStyle, middleButton, milldeButtonOtherProps,
    ...otherProps
  } = props;
  const { transparent } = headerSettings;

  const renderLeftIcon = (image, iconName, style) => {
    if (image) return <Image source={image} style={style} />;
    if (iconName) {
      const iconStyle = [styles.iconNormal];
      if (transparent) iconStyle.push(styles.colorBlack);
      if (style) iconStyle.push(style);

      return <Icon name={iconName} style={iconStyle} />;
    }
    return undefined;
  };
  const renderButton = (buttonProps) => {
    const {
      buttonStyle, image, iconName, iconStyle,
    } = buttonProps;

    return (
      <Button
        style={[styles.button, buttonStyle]}
        leftChildren={renderLeftIcon(image, iconName, iconStyle)}
        textTranslate={isTranslate}
        {...buttonProps}
      />
    );
  };
  const renderField = (item, index) => {
    const {
      field: Field, hasChildren, childrenProps, children, fieldStyle,
    } = item;
    let realChildren;
    if (hasChildren) {
      realChildren = children || renderButton(childrenProps);
    }
    const key = `field${index}`;

    return (
      <Field key={key} style={fieldStyle}>{ realChildren }</Field>
    );
  };
  const fields = [
    {
      field: Left,
      hasChildren: hasLeft,
      fieldStyle: leftFieldStyle,
      childrenProps: {
        image: leftImage,
        iconName: leftIconName,
        iconStyle: leftIconStyle,
        buttonStyle: leftButtonStyle,
        onPress: leftPress,
        textLabel: leftLable,
        ...leftButtonOtherProps,
      },
    },
    {
      field: Body,
      hasChildren: hasTitle,
      fieldStyle: bodyFieldStyle,
      childrenProps: {
        textLabel: title,
        textStyle: [styles.title, transparent ? styles.colorBlack : undefined, titleStyle],
        disabled: true,
        ...milldeButtonOtherProps,
      },
      children: middleButton,
    },
    {
      field: Right,
      hasChildren: hasRight,
      fieldStyle: rightFieldStyle,
      childrenProps: {
        image: rightImage,
        iconName: rightIconName,
        iconStyle: rightIconStyle,
        buttonStyle: rightButtonStyle,
        onPress: rightPress,
        textLabel: rightLable,
        ...rightButtonOtherProps,
      },
      children: rightButton,
    },
  ];
  const header = (
    <Header {...otherProps} style={[styles.headerStyle, headerStyle]}>
      { hasStatusBar && <AppStatusBar transparent={transparent} /> }
      { fields.map((item, index) => renderField(item, index))}
    </Header>
  );

  if (transparent) {
    return header;
  }

  return (
    <ImageBackground source={bgImage} style={styles.bgImage}>
      { header }
    </ImageBackground>
  );
};

AppHeader.defaultProps = {
  hasStatusBar: true,
  hasLeft: true,
  hasTitle: true,
  hasRight: false,
  headerSettings: {},
  isTranslate: true,
  headerStyle: undefined,
  leftImage: undefined,
  leftIconName: 'ios-arrow-back',
  leftLable: undefined,
  leftPress: () => Actions.pop(),
  leftButtonStyle: undefined,
  leftIconStyle: undefined,
  leftButtonOtherProps: {},
  leftFieldStyle: {},
  rightImage: undefined,
  rightIconName: undefined,
  rightLable: undefined,
  rightPress: undefined,
  rightButton: undefined,
  rightButtonStyle: undefined,
  rightIconStyle: undefined,
  rightButtonOtherProps: {},
  rightFieldStyle: {},
  title: '',
  titleStyle: undefined,
  middleButton: undefined,
  milldeButtonOtherProps: {},
  bodyFieldStyle: {},
};

AppHeader.propTypes = {
  hasStatusBar: PropTypes.bool,
  hasLeft: PropTypes.bool,
  hasTitle: PropTypes.bool,
  hasRight: PropTypes.bool,
  headerSettings: PropTypes.object,
  isTranslate: PropTypes.bool,
  headerStyle: PropTypes.object,
  leftImage: PropTypes.any,
  leftIconName: PropTypes.string,
  leftLable: PropTypes.string,
  leftPress: PropTypes.func,
  leftButtonStyle: PropTypes.object,
  leftIconStyle: PropTypes.object,
  leftButtonOtherProps: PropTypes.object,
  leftFieldStyle: PropTypes.object,
  rightImage: PropTypes.any,
  rightIconName: PropTypes.string,
  rightLable: PropTypes.string,
  rightPress: PropTypes.func,
  rightButton: PropTypes.any,
  rightButtonStyle: PropTypes.object,
  rightIconStyle: PropTypes.object,
  rightButtonOtherProps: PropTypes.object,
  rightFieldStyle: PropTypes.object,
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  middleButton: PropTypes.any,
  milldeButtonOtherProps: PropTypes.object,
  bodyFieldStyle: PropTypes.object,
};

export default AppHeader;
