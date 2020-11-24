import variable from '../variables/platform';

export default (variables = variable) => {
  const { platform } = variables;

  const toastTheme = {
    '.danger': {
      backgroundColor: variables.brandDanger,
    },
    '.warning': {
      backgroundColor: variables.brandWarning,
    },
    '.success': {
      backgroundColor: variables.brandSuccess,
    },
    zIndex: 9999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{
      translateY: variables.deviceHeight / 2 - 44,
    }],
    'NativeBase.Text': {
      fontSize: 15,
      color: '#fff',
      width: 0,
    },
    'NativeBase.Button': {
      borderRadius: platform === 'ios' ? 6 : 0,
      backgroundColor: 'rgba(0,0,0,0.80)',
      paddingHorizontal: 19,
      minHeight: 44,
      elevation: 0,
      'NativeBase.Text': {
        fontSize: 15,
        color: '#fff',
      },
    },
  };

  return toastTheme;
};
