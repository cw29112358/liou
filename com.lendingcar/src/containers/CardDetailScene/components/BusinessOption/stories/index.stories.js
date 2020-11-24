import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import BusinessOption from '..';

storiesOf('containers/CardDetailScene/components/BusinessOption', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('BusinessOption', () => (
    <BusinessOption />
  ));
