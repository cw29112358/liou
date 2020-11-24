import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import BorrowerInformationForm from '..';

storiesOf('forms/BorrowerInformationForm', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('BorrowerInformationForm', () => (
    <BorrowerInformationForm onSubmit={action('submit borrowerInformationForm data')} />
  ));
