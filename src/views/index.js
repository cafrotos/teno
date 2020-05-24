import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import * as eva from '@eva-design/eva';

import { STACK_NAME, TAB_SCREEN } from 'consts/configs';
import Contexts from 'utils/Contexts';
import TopTabBar from 'components/TopTabBar';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Stories from './Stories';
import Calendar from './Calendar';
import Images from './Images';
import Setting from './Setting';
import CreateNote from './CreateNote';
import { View } from 'react-native';

const Stack = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();

const TabsApp = (props) => {
  const context = useContext(Contexts);
  useEffect(() => {
    context.setGlobalState({
      theme: eva.light
    })
  }, [])
  return (
    <Tabs.Navigator {...props} tabBar={TopTabBar} style={{ backgroundColor: "#ffffff" }}>
      <Tabs.Screen name={TAB_SCREEN.HOME} component={Home} />
      <Tabs.Screen name={TAB_SCREEN.STORIES} component={Stories} />
      <Tabs.Screen name={TAB_SCREEN.CALENDAR} component={Calendar} />
      <Tabs.Screen name={TAB_SCREEN.IMAGES} component={Images} />
      <Tabs.Screen name={TAB_SCREEN.SETTING} component={Setting} />
    </Tabs.Navigator>
  )
}

const renderTabsApp = (props) => <TabsApp {...props} />
const BlankHeader = () => <View />

export default () => {
  const context = useContext(Contexts)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          context.globalState.isLogin ?
            <>
              <Stack.Screen name={STACK_NAME.TABS} options={{ header: BlankHeader }} component={renderTabsApp} />
              <Stack.Screen name={STACK_NAME.CREATE_NOTE} component={CreateNote} />
            </> :
            <>
              <Stack.Screen name={STACK_NAME.LOGIN} options={{ header: BlankHeader }} component={Login} />
              <Stack.Screen name={STACK_NAME.SIGNUP} options={{ header: BlankHeader }} component={Signup} />
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}