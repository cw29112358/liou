import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import ReleaseForm from '..';

storiesOf('forms/ReleaseForm', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('ReleaseForm', () => (
    <ReleaseForm onSubmit={action('submit releaseForm data')} />
  ));
