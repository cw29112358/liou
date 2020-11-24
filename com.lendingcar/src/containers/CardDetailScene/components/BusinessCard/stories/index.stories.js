import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import BusinessCard from '..';

storiesOf('containers/CardDetailScene/components/BusinessCard', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('BusinessCard', () => (
    <BusinessCard />
  ));
