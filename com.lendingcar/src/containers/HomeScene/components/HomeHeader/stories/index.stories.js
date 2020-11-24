import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import HeaderView from 'storybook/HeaderView';

import HomeHeader from '..';

storiesOf('containers/HomeScene/components/HomeHeader', module)
  .addDecorator((getStory) => <HeaderView>{getStory()}</HeaderView>)
  .add('HomeHeader', () => (
    <HomeHeader />
  ));
