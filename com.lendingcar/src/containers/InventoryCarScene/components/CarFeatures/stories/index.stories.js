import React from 'react';
import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import CarFeatures from '..';

storiesOf('containers/InventoryCarScene/components/CarFeatures', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('CarFeatures', () => (
    <CarFeatures />
  ));
