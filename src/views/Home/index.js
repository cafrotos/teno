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
    _onRefresh()
    _getWeather()
    _getCurrentDate()
  }, [props.route.key])

  const _onRefresh = async () => {
    try {
      const notes = await NotesRepository.get();
      const _data = data;
      const _dataLoadMore = notes
        .sorted('date', true)
        .slice(data.length, data.length + 20)
      _data.push(
        ..._dataLoadMore
      )
      setData(_data)
      if (_dataLoadMore.length === 0)
        return true
      return false
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
        marginTop={48}
        onRefresh={_onRefresh}
      />
    </CustomLayout>
  )
}