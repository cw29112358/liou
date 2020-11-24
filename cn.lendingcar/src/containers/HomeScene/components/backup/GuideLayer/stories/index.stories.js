import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import GuideLayer from '..';

storiesOf('containers/HomeScene/components/GuideLayer', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('GuideLayer', () => (
    <GuideLayer />
  ));
