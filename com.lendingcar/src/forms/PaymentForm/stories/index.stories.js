import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import PaymentForm from '..';

storiesOf('forms/PaymentForm', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('PaymentForm', () => (
    <PaymentForm onSubmit={action('submit paymentForm data')} />
  ));
