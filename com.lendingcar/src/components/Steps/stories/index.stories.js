import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import Steps from '..';

storiesOf('components/Steps', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('Steps', () => (
    <Steps current={0} length={2} />
  ));
