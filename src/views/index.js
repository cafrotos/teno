import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { STACK_NAME } from 'consts/configs';
import Home from './Home';
import Login from './Login';
import Signin from './Signin';
import Contexts from 'utils/Contexts';

const Stack = createStackNavigator();

export default () => {
  const context = useContext(Contexts)
  return (
    <NavigationContainer>
      {
        context.globalState.isLogin ?
          <Stack.Navigator>
            <Stack.Screen name={STACK_NAME.HOME} component={Home} />
          </Stack.Navigator> :
          <Stack.Navigator headerMode="none">
            <Stack.Screen name={STACK_NAME.LOGIN} component={Login} />
            <Stack.Screen name={STACK_NAME.SIGNIN} component={Signin} />
          </Stack.Navigator>
      }
    </NavigationContainer>
  );
}