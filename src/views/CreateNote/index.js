import React, { useEffect, useState } from 'react';
import CustomLayout from 'components/CustomLayout';
import { Text, Input, Layout, Button } from '@ui-kitten/components';
import { View, ToastAndroid } from 'react-native';
import Icon from 'utils/weather-icon/weatherIcon';
import { getLocation, getData, getWeather } from 'utils/weather';
import { NotesRepository } from 'repositories'
import { useNavigation } from '@react-navigation/native';
import Editor from 'components/Editor';

export default (props) => {
  const [content, setContent] = useState("");
  const navigation = useNavigation();

  const _onChangeContent = (text) => {
    setContent(text)
  }

  const _onSaveContent = async () => {
    if (content && content !== "") {
      await NotesRepository.create({
        content
      })
      navigation.goBack()
      return
    }
    ToastAndroid.show("Bạn chưa nhập nội dung!", 1000)
  }

  return (
    <CustomLayout showButton={false}>
      {/* <View style={{ width: "100%", height: "100%", backgroundColor: "#ffffff" }}>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Layout style={{ flex: 1, flexDirection: 'row', padding: 5 }}>
            <Icon name="wi-day-sunny" size={40} />
            <Text style={{ height: "100%", textAlignVertical: "center", paddingLeft: 5 }}>25</Text>
            <Text style={{ height: "100%", textAlignVertical: "center", paddingLeft: 5 }}>Hanoi</Text>
          </Layout>
          <Input
            placeholder="Write your emotion"
            autoFocus={true}
            multiline={true}
            textStyle={{ minHeight: 100 }}
            style={{ width: "100%", borderColor: "transparent", borderBottomWidth: 0 }}
            onChangeText={_onChangeContent}
          />
          <Layout style={{ flex: 1, flexDirection: 'row', padding: 5 }}>
            <Button onPress={_onSaveContent}>Lưu</Button>
          </Layout>
        </View>
      </View> */}
      <Editor />
    </CustomLayout>
  )
}