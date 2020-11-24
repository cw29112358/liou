import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import PhoneVerificationForm from '..';

storiesOf('forms/PhoneVerificationForm', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('PhoneVerificationForm', () => (
    <PhoneVerificationForm onSubmit={action('submit signUpEmailForm data')} />
  ));
