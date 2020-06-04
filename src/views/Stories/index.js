import React, { useState, useEffect } from 'react';
import CustomLayout from 'components/CustomLayout';
import { useNavigation } from '@react-navigation/native';
import { STACK_NAME } from 'consts/configs';
import ListDiaries from 'components/ListDiaries';
import { Text, Layout } from '@ui-kitten/components';

export default (props) => {
  const navigation = useNavigation()
  const [data, setData] = useState([]);

  useEffect(() => {
    _onRefresh()
  }, [])

  const onRefresh = async () => {
    try {
      const notes = await getNewsfeed(data[data.length-1]);
      const _data = data;
      _data.push(
        ...Object.values(
          notes.docs
        )
      )
      setData(_data)
    } catch (error) {
      console.log(error)
    }
  }

  const _onCreateStory = () => {
    navigation.navigate(STACK_NAME.CREATE_NOTE)
  }

  return (
    <CustomLayout
      onButtonPress={_onCreateStory}
    >
      <ListDiaries
        data={data}
        onRefresh={onRefresh}
        header={
          <Text
            category="h4"
            style={{
              paddingBottom: 36,
              paddingTop: 8,
              fontWeight: "bold"
            }}>
            Chia sẻ câu chuyện
          </Text>
        }
      />
    </CustomLayout>
  )
}