import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import FavouritesFooter from '..';

storiesOf('containers/MyFavouritesScene/components/FavouritesFooter', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('FavouritesFooter', () => (
    <FavouritesFooter />
  ));
