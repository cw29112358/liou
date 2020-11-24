import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import RefIdForm from '..';

storiesOf('forms/RefIdForm', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('RefIdForm', () => (
    <RefIdForm onSubmit={action('submit refIdForm data')} />
  ));
