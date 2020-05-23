import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import ListNotes from './ListNotes';
import { Layout } from '@ui-kitten/components';

const { Navigator, Screen } = createStackNavigator();

const wrapHomeComponent = (Component) => (props) => (
  <Layout style={{ marginTop: 48, flex: 1 }}>
    <Component {...props} />
  </Layout>
)

export default (props) => (
  <Navigator headerMode="none">
    <Screen name={"List Notes"} component={wrapHomeComponent(ListNotes)} />
  </Navigator>
)