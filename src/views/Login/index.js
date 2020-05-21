import React, { useContext } from 'react';
import { Layout, Button } from '@ui-kitten/components';
import Contexts from 'utils/Contexts'

export default (props) => {
  const context = useContext(Contexts)
  return (
    <Layout>
      <Button onPress={() => context.setGlobalState({ isLogin: true })}>
        Login
      </Button>
    </Layout>
  )
}