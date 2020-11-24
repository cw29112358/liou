import variable from '../variables/platform';

export default (variables = variable) => {
  const tabContainerTheme = {
    zIndex: 2,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 0,
    borderColor: variables.topTabBarBorderColor,
    backgroundColor: variables.tabDefaultBg,
    elevation: 3,
    shadowColor: variables.topTabBarShadowColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  };

  return tabContainerTheme;
};
