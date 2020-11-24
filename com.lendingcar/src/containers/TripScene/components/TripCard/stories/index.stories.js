import React from 'react';
import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import TripCard from '..';

import fakeData from 'apis/fakeData';

const { trips } = fakeData;

storiesOf('containers/TripScene/components/TripCard', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('TripCard', () => (
    <TripCard item={trips[0]} />
  ));
