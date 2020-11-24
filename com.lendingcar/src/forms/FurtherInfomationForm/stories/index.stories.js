import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import FurtherInfomationForm from '..';

storiesOf('forms/FurtherInfomationForm', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('FurtherInfomationForm', () => (
    <FurtherInfomationForm onSubmit={action('submit furtherInfomationForm data')} />
  ));
