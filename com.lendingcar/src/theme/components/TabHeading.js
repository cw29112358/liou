import variable from '../variables/platform';

export default (variables = variable) => {
  const { platform } = variables;

  const tabHeadingTheme = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: variables.tabDefaultBg,
    '.scrollable': {
      paddingHorizontal: 20,
      flex: platform === 'android' ? 0 : 1,
      minWidth: platform === 'android' ? undefined : 60,
    },
    'NativeBase.Text': {
      color: variables.topTabBarTextColor,
    },
    'NativeBase.Icon': {
      color: variables.topTabBarTextColor,
      fontSize: platform === 'ios' ? 26 : undefined,
    },
    '.active': {
      'NativeBase.Text': {
        color: variables.topTabBarActiveTextColor,
        fontWeight: '600',
      },
      'NativeBase.Icon': {
        color: variables.topTabBarActiveTextColor,
      },
    },
  };

  return tabHeadingTheme;
};
