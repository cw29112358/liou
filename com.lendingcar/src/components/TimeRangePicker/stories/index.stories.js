import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import TimeRangePicker from '..';

storiesOf('components/TimeRangePicker', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('TimeRangePicker', () => (
    <TimeRangePicker />
  ));
