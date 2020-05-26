import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import ListSettings from './ListSettings';

const { Navigator, Screen } = createStackNavigator()

export default (props) => (
  <Navigator headerMode="none">
    <Screen name={"List Notes"} component={ListSettings} />
  </Navigator>
)