import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import {
  Icon,
} from 'native-base';

import ContentView from 'storybook/ContentView';

import InfoListItem from '..';

const item1 = {
  keyLabel: 'pickupDate',
  value: {
    valueLabel: '2018/07/21',
  },
};

storiesOf('components/InfoListItem', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('hasRightArrow=false, isTranslate=false （default)', () => (
    <InfoListItem {...item1} />
  ))
  .add('hasRightArrow=true', () => (
    <InfoListItem {...item1} hasRightArrow />
  ))
  .add('rightChildren', () => (
    <InfoListItem {...item1} rightChildren={<Icon name="ios-add-circle" />} />
  ));
