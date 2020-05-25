import React, { useState } from 'react';
import CustomLayout from 'components/CustomLayout';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { STACK_NAME } from 'consts/configs';
import Diary from 'components/Diary';
import ListDiaries from 'components/ListDiaries';

export default (props) => {
  const navigation = useNavigation()
  const [data, setData] = useState([1, 2, 3]);

  const onRefresh = async () => {
    /**
     * @fixme mockup get data, return boolen value is ended data
     */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setData([...data, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        if (data.length > 100) {
          return resolve(true)
        }
        return resolve(false)
      }, 3000);
    })
  }

  const _onPressCreateNote = () => {
    navigation.navigate(STACK_NAME.CREATE_NOTE)
  }

  return (
    <CustomLayout
      onButtonPress={_onPressCreateNote}
    >
      <ListDiaries
        data={data}
        marginTop={68}
        onRefresh={onRefresh}
      />
    </CustomLayout>
  )
}