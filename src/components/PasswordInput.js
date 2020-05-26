import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon, Input } from '@ui-kitten/components';

export const PasswordInput = (props) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
  );

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Input
      value={props.value}
      placeholder="Mật khẩu"
      accessoryRight={renderIcon}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="white"
      textStyle={{ color: "white" }}
      onChangeText={nextValue => props.setValue(nextValue)}
      onFocus={props.onFocus}
      status={props.showCaption ? 'danger' : 'basic'}
      captionIcon={props.showCaption ? AlertIcon : ""}
      caption={props.showCaption ? 'Vui lòng nhập mật khẩu' : ''}
      style={{
        fontSize: 20,
        marginTop: "5%",
        backgroundColor: "rgba(255, 255, 255, .2)",
        color: "rgb(255,255,255) !importance",
      }}
    />
  );
};

export default PasswordInput