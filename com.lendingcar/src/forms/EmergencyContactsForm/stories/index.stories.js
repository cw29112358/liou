import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import EmergencyContactsForm from '..';

storiesOf('forms/EmergencyContactsForm', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('EmergencyContactsForm', () => (
    <EmergencyContactsForm onSubmit={action('submit emergencyContactForm data')} />
  ));
