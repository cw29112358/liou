import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import ChangePasswordCurrentForm from '..';

storiesOf('forms/ChangePasswordCurrentForm', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('ChangePasswordCurrentForm', () => (
    <ChangePasswordCurrentForm onSubmit={action('submit changePasswordCurrentForm data')} />
  ));
