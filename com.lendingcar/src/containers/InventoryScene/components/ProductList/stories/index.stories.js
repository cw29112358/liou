import React from 'react';
import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import ProductList from '..';

storiesOf('containers/InventoryScene/components/ProductList', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('ProductList', () => (
    <ProductList />
  ));
