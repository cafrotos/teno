import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import ListNotes from './ListNotes';

const { Navigator, Screen } = createStackNavigator();

export default (props) => (
  <Navigator headerMode="none">
    <Screen name={"List Notes"} component={ListNotes} />
  </Navigator>
)