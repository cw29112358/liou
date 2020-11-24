import { Platform } from 'react-native';

import variable from '../variables/platform';

export default (variables = variable) => {
  const radioTheme = {
    '.selected': {
      'NativeBase.IconNB': {
        color: Platform.OS === 'ios'
          ? variables.radioColor
          : variables.radioSelectedColorAndroid,
        lineHeight: Platform.OS === 'ios' ? 9 : variables.radioBtnLineHeight,
        height: Platform.OS === 'ios' ? 9 : undefined,
      },
    },
    'NativeBase.IconNB': {
      color: Platform.OS === 'ios' ? 'transparent' : undefined,
      lineHeight: Platform.OS === 'ios'
        ? undefined
        : variables.radioBtnLineHeight,
      fontSize: variables.radioBtnSize,
    },
  };

  return radioTheme;
};
