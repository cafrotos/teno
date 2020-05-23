import React, { useReducer, useContext } from 'react';
import { Text, Layout, Input, Button } from '@ui-kitten/components';

import { getIcon, defReduceState } from 'utils';
import Contexts from 'utils/Contexts';
import { REG_EMAIL, REG_PASSWORD } from 'consts/configs';
import { View, Dimensions } from 'react-native';

const width = Dimensions.get("screen").width

export default (props) => {
  const [state, setState] = useReducer(defReduceState({}), {})
  const context = useContext(Contexts);

  const _onChangeInput = (field) => (text) => {
    setState({
      [field]: text,
      [`${field}Err`]: ""
    })
  }

  const _validate = () => {
    const _state = {}
    if (!state.username) {
      _state.usernameErr = `Bạn chưa nhập "Tên đăng nhập"`
    }
    if (!state.email) {
      _state.emailErr = `Bạn chưa nhập "Email"`
    }
    else if (!state.email.match(REG_EMAIL)) {
      _state.emailErr = `Địa chỉ Email không hợp lệ`
    }
    if (!state.password) {
      _state.passwordErr = `Bạn chưa nhập "Mật khẩu"`
    }
    else if (!state.password.match(REG_PASSWORD)) {
      _state.passwordErr = `Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số`
    }
    if (Object.keys(_state).length > 0) {
      setState(_state)
      return false
    }
    return true
  }

  const _onRegister = () => {
    if (!_validate()) {
      return
    }
    context.setGlobalState({
      isLogin: true
    })
  }

  return (
    <Layout style={{ flex: 3, padding: "10%", paddingBottom: 20 }}>
      <Layout style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "flex-end" }}>
        <Text category="h1" style={{ fontWeight: "bold" }}>
          Teno
        </Text>
      </Layout>
      <Layout style={{ flex: 4, justifyContent: "center" }}>
        <Input
          placeholder="Tên đăng nhập"
          accessoryRight={getIcon({ name: "person-outline" })}
          value={state.username}
          caption={state.usernameErr}
          status={state.usernameErr && state.usernameErr !== "" && "danger"}
          onChangeText={_onChangeInput("username")}
          style={{
            marginBottom: 10
          }}
        />
        <Input
          placeholder="Email"
          accessoryRight={getIcon({ name: "email-outline" })}
          value={state.email}
          caption={state.emailErr}
          status={state.emailErr && state.emailErr !== "" && "danger"}
          onChangeText={_onChangeInput("email")}
          keyboardType="email-address"
          style={{
            marginBottom: 10
          }}
        />
        <Input
          placeholder="Mật khẩu"
          accessoryRight={getIcon({ name: "person-outline" })}
          value={state.password}
          caption={(props) => (
            <Text {...props}>{state.passwordErr}</Text>
          )}
          status={state.passwordErr && state.passwordErr !== "" && "danger"}
          onChangeText={_onChangeInput("password")}
          keyboardType="visible-password"
          style={{
            marginBottom: 10
          }}
        />
      </Layout>
      <Layout style={{ flex: 1, justifyContent: "center" }}>
        <Button
          onPress={_onRegister}
        >
          Đăng ký
        </Button>
      </Layout>
      <Layout>
        <Text style={{ textAlign: "center" }}>
          Hoặc đăng ký với tài khoản khác
        </Text>
        <Layout
          style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}
        >
          <Button
            accessoryLeft={getIcon({ name: "facebook" })}
            appearance="ghost"
          />
          <Button
            accessoryLeft={getIcon({ name: "google" })}
            appearance="ghost"
          />
        </Layout>
        <Button
          appearance="ghost"
          status="control"
        >
          Đã có tài khoản? Đăng nhập
        </Button>
      </Layout>
    </Layout>
  )
}