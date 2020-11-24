import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import PasswordForm from '..';

storiesOf('forms/PasswordForm', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('PasswordForm', () => (
    <PasswordForm onSubmit={action('submit sinUpPasswordForm data')} />
  ));
