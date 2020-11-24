import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import DollarText from '..';

storiesOf('components/DollarText', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('DollarText', () => (
    <DollarText />
  ));
