import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import SelectInput from '..';

storiesOf('formFields/SelectInput', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('SelectInput', () => (
    <SelectInput
      input={{
        value: null,
        onChange: action('submit select data'),
      }}
      placeholder="placeholderSelect"
      options={[
        { label: 'text1', value: '1' },
        { label: 'text2', value: '2' },
        { label: 'text3', value: '3' },
        { label: 'text4', value: '4' },
        { label: 'text5', value: '5' },
      ]}
    />
  ));
