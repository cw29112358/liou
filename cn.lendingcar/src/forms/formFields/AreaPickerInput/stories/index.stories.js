import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import AreaPickerInput from '..';

storiesOf('formFields/AreaPickerInput', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('AreaPickerInput', () => (
    <AreaPickerInput />
  ));
