import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import DriverForm from '..';

storiesOf('forms/DriverForm', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('DriverForm', () => (
    <DriverForm onSubmit={action('submit driverForm data')} />
  ));
