import React, { useContext } from 'react';
import { Layout, Button, Text, Icon } from '@ui-kitten/components';
import Contexts from 'utils/Contexts';
import { PasswordInput, UsernameInput } from 'components';
import { View, Dimensions, ImageBackground, TouchableNativeFeedback } from 'react-native';

export default (props) => {
  const context = useContext(Contexts)
  let screenHeight = Dimensions.get("window").height;
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [focusInput, setFocusInput] = React.useState(true);
  const validate = () => {
    setFocusInput(false)
    return username.length !== 0 && password.length !== 0
  }
  const FacebookIcon = (props) => (
    <Icon {...props} name='facebook' />
  );
  const GoogleIcon = (props) => (
    <Icon {...props} name='google' />
  );
  const image = { uri: "https://sudospaces.com/mobilecity-vn/images/2018/04/hinh-nen-cho-xiaomi-redmi-5-plus-788.jpg" }
  return (
    <Layout>
      <View style={{ height: screenHeight }}>
        <ImageBackground source={image} style={{ flex: 1, resizeMode: "cover", justifyContent: "center", width: "100%", height: "100%" }}>
          <View style={{
            position: "relative",
            paddingLeft: "10%",
            paddingRight: "10%",
            height: screenHeight,
            backgroundColor: "rgba(0,0,0,.5)",
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ textAlign: "center", marginBottom: "5%", color: "white" }} category='h2'>Teno</Text>
            <Text style={{ textAlign: "center", marginBottom: "10%", color: "white" }}>Đăng nhập vào tài khoản</Text>
            <UsernameInput setValue={setUsername} value={username} showCaption={!focusInput && username.length === 0} onFocus={() => setFocusInput(true)} />
            <PasswordInput setValue={setPassword} value={password} showCaption={!focusInput && password.length === 0} onFocus={() => setFocusInput(true)} />
            <TouchableNativeFeedback>
              <Text style={{ textAlign: "right", marginTop: "4%", color: "white" }}>Quên mật khẩu? </Text>
            </TouchableNativeFeedback>
            <Button onPress={() => { (validate() ? context.setGlobalState({ isLogin: true }) : "") }} style={{ fontSize: 40, marginTop: "15%", width: "100%" }}>
              ĐĂNG NHẬP
            </Button>
            <Text style={{ width: "100%", textAlign: "center", marginTop: "5%", color: "white" }}> Hoặc Đăng nhập sử dụng </Text>
            <Layout style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: "transparent", marginTop: "5%", width: "100%" }} level='1'>
              <Button accessoryLeft={FacebookIcon} style={{ backgroundColor: "transparent", width: "12.5%", borderColor: "transparent", marginLeft: "35%" }}>
              </Button>
              <Button accessoryLeft={GoogleIcon} style={{ backgroundColor: "transparent", width: "12.5%", marginLeft: "5%", borderColor: "transparent" }}>
              </Button>
            </Layout>
            <Text style={{ textAlign: "center", marginTop: "4%", color: "white" }}> Không có tài khoản?
            <TouchableNativeFeedback>
                <Text style={{ textAlign: "center", color: "white" }}> Đăng ký </Text>
              </TouchableNativeFeedback>
            </Text>
          </View>
        </ImageBackground>
      </View>
    </Layout>
  )
}