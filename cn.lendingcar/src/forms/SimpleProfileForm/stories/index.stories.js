import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import SimpleProfileForm from '..';

storiesOf('forms/SimpleProfileForm', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('SimpleProfileForm', () => (
    <SimpleProfileForm onSubmit={action('submit simpleProfileForm data')} />
  ));
