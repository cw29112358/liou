import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import AppointmentForm from '..';

storiesOf('forms/AppointmentForm', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('AppointmentForm', () => (
    <AppointmentForm onSubmit={action('submit appointmentForm data')} />
  ));
