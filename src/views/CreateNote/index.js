import React, { useState } from 'react';
import CustomLayout from 'components/CustomLayout';
import { View, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { NotesRepository } from 'repositories'
import { useNavigation } from '@react-navigation/native';
import EditorBot from 'components/NoteEditor/EditorBot';
import WeatherView from 'components/NoteEditor/WeatherView';
import InputNote from 'components/NoteEditor/InputNote';
import ToolBar from 'components/NoteEditor/ToolBar';
import { Layout } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
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
      <Layout
        style={{
          flex: 1
        }}
      >
        <View style={{ width: "100%" }}>
          <ScrollView>
            <WeatherView style={{ width: "100%" }} />
          </ScrollView>
        </View>
        <Editor onEdit={_onChangeContent} />
      </Layout>
    </CustomLayout>
  )
}