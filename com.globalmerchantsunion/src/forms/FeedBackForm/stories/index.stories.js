import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import FeedBackForm from '..';

storiesOf('forms/FeedBackForm', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('FeedBackForm', () => (
    <FeedBackForm onSubmit={action('submit feedBackForm data')} />
  ));
