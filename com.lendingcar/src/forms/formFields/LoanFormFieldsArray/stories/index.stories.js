import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import LoanFormFieldsArray from '..';

storiesOf('forms/LoanFormFieldsArray', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('LoanFormFieldsArray', () => (
    <LoanFormFieldsArray onSubmit={action('submit LoanFormFieldsArray data')} />
  ));
