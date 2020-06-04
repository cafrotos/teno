import React, { useState, useEffect, memo } from 'react';
import CustomLayout from 'components/CustomLayout';
import { Calendar } from '@ui-kitten/components';
import moment from 'moment'

import ListDiaries from 'components/ListDiaries';
import { NotesRepository } from 'repositories';
import { useNavigation } from '@react-navigation/native';
import { STACK_NAME } from 'consts/configs';

export default memo((props) => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([])

  const navigation = useNavigation()

  useEffect(() => {
    _getNewNotesByDate(date)
  }, [date])

  const _onChangeDate = (_date) => {
    setDate(_date)
  }

  const _getNewNotesByDate = async (_date) => {
    const notes = await NotesRepository.get();
    const _dataLoadMore = notes
      .sorted('date', true)
      .filtered("date >= $0 && date <= $1", moment(_date).startOf('day').toDate(), moment(_date).endOf('day').toDate())
      .slice(data.length, data.length + 20)

    setData(_dataLoadMore)
  }

  const _onRefresh = async () => {
    const notes = await NotesRepository.get();
    const _data = data;
    const _dataLoadMore = notes
      .sorted('date', true)
      .filtered("date >= $0 && date <= $1", moment(date).startOf('day').toDate(), moment(date).endOf('day').toDate())
      .slice(data.length, data.length + 20)
    _data.push(
      ..._dataLoadMore
    )
    setData(_data)
    if (_dataLoadMore.length === 0) {
      return true;
    }
    return false
  }

  const _onCreateNote = () => navigation.navigate(STACK_NAME.CREATE_NOTE)

  return (
    <CustomLayout onButtonPress={_onCreateNote}>
      <ListDiaries
        data={data}
        onRefresh={_onRefresh}
        header={
          <Calendar
            date={date}
            onSelect={_onChangeDate}
            style={{
              width: "100%",
              marginBottom: 8
            }}
          />
        }
      />
    </CustomLayout>
  )
})