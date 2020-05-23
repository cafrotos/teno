import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { STACK_NAME, TAB_SCREEN } from 'consts/configs';
import Contexts from 'utils/Contexts';
import TopTabBar from 'components/TopTabBar';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';

const Stack = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();

const TabsApp = (props) => (
  <Tabs.Navigator {...props} tabBar={TopTabBar}>
    <Tabs.Screen name={TAB_SCREEN.HOME} component={Home} />
    <Tabs.Screen name={TAB_SCREEN.STORIES} component={Home} />
    <Tabs.Screen name={TAB_SCREEN.CALENDAR} component={Home} />
    <Tabs.Screen name={TAB_SCREEN.IMAGES} component={Home} />
    <Tabs.Screen name={TAB_SCREEN.SETTING} component={Home} />
  </Tabs.Navigator>
)

export default () => {
  const context = useContext(Contexts)
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {
          context.globalState.isLogin ?
            <Stack.Screen name={STACK_NAME.TABS} component={TabsApp} /> :
            <>
              <Stack.Screen name={STACK_NAME.LOGIN} component={Login} />
              <Stack.Screen name={STACK_NAME.SIGNUP} component={Signup} />
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}