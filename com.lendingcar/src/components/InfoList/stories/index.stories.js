import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import InfoList from '..';

const data = {
  titleLabel: 'pickUpAndReturnTitle',
  list: [
    {
      keyLabel: 'pickupDate',
      hasRightArrow: true,
      value: {
        valueLabel: '2018/07/21',
      },
    },
    {
      keyLabel: 'months',
      value: {
        valueLabel: '12',
      },
    },
    {
      keyLabel: 'address',
      value: {
        valueLabel: '3555 S EI Camino Real',
      },
    },
    {
      keyLabel: 'city',
      value: {
        valueLabel: 'San Mateo, CA',
      },
    },
  ],
};

storiesOf('components/InfoList', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('hasBorder=true + hasShadow=false InfoList', () => (
    <InfoList {...data} />
  ))
  .add('hasBorder=false + hasShadow=false  InfoList', () => (
    <InfoList {...data} hasBorder={false} />
  ))
  .add('Shadow InfoList', () => (
    <InfoList hasShadow {...data} />
  ));
