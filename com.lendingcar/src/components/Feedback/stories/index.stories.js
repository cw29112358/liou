import React from 'react';

import { storiesOf } from '@storybook/react-native';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ContentView from 'storybook/ContentView';

import Feedback from '..';

// data
// const feedbackProps = {
//   title: 'emailHasSend',
//   textArray: [
//     {
//       label: 'changePasswordLineOne',
//     },
//     {
//       label: 'officialEmail',
//       isStress: true,
//     },
//     {
//       label: 'changePasswordLineTwo',
//     },
//   ],
// };

// stories
storiesOf('components/Feedback', module)
  .addDecorator((getStory) => <ContentView>{getStory()}</ContentView>)
  .add('Feedback', () => (
    <Feedback />
  ));
