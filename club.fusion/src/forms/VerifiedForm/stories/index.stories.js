import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import VerifiedForm from '..';

storiesOf('forms/VerifiedForm', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('VerifiedForm', () => (
    <VerifiedForm onSubmit={action('submit verifiedForm data')} />
  ));
