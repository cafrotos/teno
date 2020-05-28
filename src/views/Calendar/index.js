import React, { useState, useEffect } from 'react';
import CustomLayout from 'components/CustomLayout';
import { Calendar } from '@ui-kitten/components';
import moment from 'moment'

import ListDiaries from 'components/ListDiaries';
import { NotesRepository } from 'repositories';

export default (props) => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([])

  useEffect(() => {
    _onRefresh()
  }, [date])

  const _onChangeDate = (_date) => setDate(_date)

  const _onRefresh = async () => {
    const notes = await NotesRepository.get();
    const _data = data;
    _data.push(
      ...Object.values(
        notes
          .sorted('date', true)
          // .filtered(`date >= ${moment(date).format("YYYY-MM-DD")}@0:0 && date <= ${moment(date).format("YYYY-MM-DD")}@23:59`)
          .slice(data.length, data.length + 20)
      )
    )
    setData(_data)
  }

  return (
    <CustomLayout showButton={false}>
      <ListDiaries
        data={data}
        onRefresh={_onRefresh}
        header={
          <Calendar
            date={date}
            onSelect={_onChangeDate}
            style={{
              width: "100%",
              marginBottom: 24
            }}
          />
        }
      />
    </CustomLayout>
  )
}