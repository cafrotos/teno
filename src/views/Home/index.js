import React, { useState, useEffect, useContext } from 'react';
import CustomLayout from 'components/CustomLayout';
import { useNavigation } from '@react-navigation/native';
import { STACK_NAME } from 'consts/configs';
import ListDiaries from 'components/ListDiaries';
import { NotesRepository } from 'repositories';
import { requestLocationPermission, getWeather } from 'utils/weather';
import Contexts from 'utils/Contexts';
import moment from 'moment';

export default (props) => {
  const context = useContext(Contexts);
  const navigation = useNavigation()
  const [data, setData] = useState([]);

  const _getWeather = async () => {
    await requestLocationPermission()
    let data = await getWeather()
    context.setGlobalState({
      weather: data
    })
  }

  const _getCurrentDate = () => {
    context.setGlobalState({
      current: moment().format("HH:mm DD/MM/YYYY")
    })
  }

  useEffect(() => {
    NotesRepository.create({
      content: "HAHAHAHAHAHA"
    })
    _onRefresh()
    _getWeather()
    _getCurrentDate()
  }, [])

  const _onRefresh = async () => {
    try {
      const notes = await NotesRepository.get();
      const _data = data;
      _data.push(
        ...Object.values(
          notes
            .sorted('date', true)
            .slice(data.length, data.length + 20)
        )
      )
      setData(_data)
    } catch (error) {
      console.log(error)
    }
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
        onRefresh={_onRefresh}
      />
    </CustomLayout>
  )
}