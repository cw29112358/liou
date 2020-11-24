import React from 'react';
import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import TripList from '..';

import fakeData from 'apis/fakeData';

const { trips } = fakeData;

storiesOf('containers/TripScene/components/TripList', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('TripList empty', () => (
    <TripList />
  ))
  .add('TripList', () => (
    <TripList list={trips} />
  ));
