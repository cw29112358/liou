import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import HeaderView from 'storybook/HeaderView';

import AppHeader from '..';

storiesOf('components/AppHeader', module)
  .addDecorator((getStory) => <HeaderView>{getStory()}</HeaderView>)
  .add('AppHeader', () => (
    <AppHeader title="storybook" leftPress={action('click left')} rightPress={action('click right')} />
  ))
  .add('without left ', () => (
    <AppHeader title="storybook" hasLeft={false} rightPress={action('click right')} />
  ))
  .add('without right ', () => (
    <AppHeader title="storybook" hasRight={false} leftPress={action('click left')} />
  ))
  .add('without right and left ', () => (
    <AppHeader title="storybook" hasRight={false} hasLeft={false} />
  ))
  .add('with leftLabel ', () => (
    <AppHeader title="storybook" leftLabel="back" leftPress={action('click left')} rightPress={action('click right')} />
  ));
