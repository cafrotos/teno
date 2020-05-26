import React, { useState } from 'react';
import CustomLayout from 'components/CustomLayout';
import { useNavigation } from '@react-navigation/native';
import { STACK_NAME } from 'consts/configs';
import ListDiaries from 'components/ListDiaries';

export default (props) => {
  const navigation = useNavigation()
  const [data, setData] = useState([
    {
      note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
      date: new Date()
    },
    {
      note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
      date: new Date()
    },
    {
      note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
      date: new Date()
    }
  ]);

  const onRefresh = async () => {
    /**
     * @fixme mockup get data, return boolen value is ended data
     */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setData([
          ...data,
          {
            note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
            date: new Date()
          },
          {
            note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
            date: new Date()
          },
          {
            note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
            date: new Date()
          },
          {
            note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
            date: new Date()
          },
          {
            note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
            date: new Date()
          },
          {
            note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
            date: new Date()
          }
        ])
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