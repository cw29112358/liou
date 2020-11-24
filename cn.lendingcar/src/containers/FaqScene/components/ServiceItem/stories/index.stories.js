import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import ServiceItem from '..';

storiesOf('containers/FaqScene/components/ServiceItem', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('ServiceItem', () => (
    <ServiceItem />
  ));
