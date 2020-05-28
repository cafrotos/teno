import React from 'react';
import { Input, Icon } from '@ui-kitten/components';

const renderIcon = (props) => (
  <Icon name="person-outline" {...props} />
);

const AlertIcon = (props) => (
  <Icon {...props} name='alert-circle-outline' />
);

export const EmailInput = (props) => {
  return (
    <Input
      value={props.value}
      placeholder='Email'
      accessoryRight={renderIcon}
      onChangeText={nextValue => props.setValue(nextValue)}
      placeholderTextColor="white"
      textStyle={{ color: "white" }}
      onFocus={props.onFocus}
      status={props.showCaption ? 'danger' : 'basic'}
      captionIcon={props.showCaption ? AlertIcon : ""}
      caption={props.showCaption ? 'Vui lòng nhập email' : ''}
      style={{
        fontSize: 20,
        color: "rgb(255,255,255) !important",
        marginTop: "5%",
        backgroundColor: "rgba(255, 255, 255, .2)"
      }}
    />
  );
};

export default EmailInput