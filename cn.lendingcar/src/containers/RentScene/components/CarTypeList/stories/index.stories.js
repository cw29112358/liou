import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import CarTypeList from '..';

storiesOf('containers/HomeScene/components/CarTypeList', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('CarTypeList', () => (
    <CarTypeList />
  ));
