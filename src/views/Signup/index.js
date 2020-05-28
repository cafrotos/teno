import React, { useReducer, useContext, useState } from 'react';
import { Text, Input, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback, ImageBackground, View } from 'react-native';

import { getIcon, defReduceState } from 'utils';
import Contexts from 'utils/Contexts';
import { REG_EMAIL, REG_PASSWORD, STACK_NAME } from 'consts/configs';
import { onSignUpButtonPress } from 'utils/firebase'

export default (props) => {
  const [state, setState] = useReducer(defReduceState({}), {})
  const [isSecure, setIsSecure] = useState(true)
  const context = useContext(Contexts);
  const navigation = useNavigation()

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

  const _onRegister = async () => {
    if (!_validate()) {
      return
    }
    const status = await onSignUpButtonPress({
      email: state.email,
      password: state.password
    })
    if (status) {
      context.setGlobalState({
        isLogin: true
      })
    }
  }

  const _onPressSignin = () => {
    navigation.navigate(STACK_NAME.LOGIN)
  }

  const Icon = getIcon({ name: isSecure ? "eye-off-outline" : "eye-outline" })

  const renderIcon = (props) => (
    <TouchableWithoutFeedback
      onPress={() => setIsSecure(!isSecure)}
      style={{
        padding: 5
      }}
    >
      <Icon {...props} />
    </TouchableWithoutFeedback>
  )

  return (
    <ImageBackground
      source={{
        uri: "https://sudospaces.com/mobilecity-vn/images/2018/04/hinh-nen-cho-xiaomi-redmi-5-plus-788.jpg"
      }}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: "100%",
        height: "100%"
      }}
    >
      <View
        style={{
          flex: 3,
          padding: "10%",
          paddingBottom: 20,
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-end",
          }}>
          <Text category="h1" style={{ fontWeight: "bold" }}>
            Teno
          </Text>
          <Text>
            Đăng ký tài khoản mới
          </Text>
        </View>
        <View style={{ flex: 3, justifyContent: "center", paddingTop: 10 }}>
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
            accessoryRight={renderIcon}
            value={state.password}
            caption={(props) => (
              <Text {...props}>{state.passwordErr}</Text>
            )}
            status={state.passwordErr && state.passwordErr !== "" && "danger"}
            onChangeText={_onChangeInput("password")}
            secureTextEntry={isSecure}
            style={{
              marginBottom: 10
            }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button
            onPress={_onRegister}
          >
            Đăng ký
        </Button>
        </View>
        <View>
          <Text style={{ textAlign: "center" }}>
            Hoặc đăng ký với tài khoản khác
        </Text>
          <View
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
          </View>
          <Button
            appearance="ghost"
            status="control"
            onPress={_onPressSignin}
          >
            Đã có tài khoản? Đăng nhập
        </Button>
        </View>
      </View>
    </ImageBackground>
  )
}