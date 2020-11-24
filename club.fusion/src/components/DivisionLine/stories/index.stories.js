import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import DivisionLine from '..';

storiesOf('components/DivisionLine', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('DivisionLine', () => (
    <DivisionLine viewStyle={{ marginHorizontal: 12 }} />
  ));
