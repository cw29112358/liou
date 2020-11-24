import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import ShareInviteForm from '..';

storiesOf('forms/ShareInviteForm', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('ShareInviteForm', () => (
    <ShareInviteForm onSubmit={action('submit shareInviteForm data')} />
  ));
