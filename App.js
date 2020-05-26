import 'react-native-gesture-handler';

import React, { useReducer } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import Views from 'views';
import Contexts from './src/utils/Contexts';
import { defReduceState } from './src/utils';

const initialState = {
  isLogin: false,
  theme: eva.dark
}

export default () => {
  const [globalState, setGlobalState] = useReducer(defReduceState(initialState), initialState)

  return (
    <Contexts.Provider
      value={{
        globalState,
        setGlobalState
      }}
    >
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={globalState.theme}>
        <Views />
      </ApplicationProvider>
    </Contexts.Provider>
  );
}