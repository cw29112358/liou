import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import fakeData from 'apis/fakeData';

import CarInfo from '..';

const { inventories } = fakeData;

storiesOf('components/CarInfo', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('CarInfo', () => (
    <CarInfo carInfo={inventories[0]} />
  ));
