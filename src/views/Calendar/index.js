import React, { useState } from 'react';
import CustomLayout from 'components/CustomLayout';
import { Calendar } from '@ui-kitten/components';
import ListDiaries from 'components/ListDiaries';

export default (props) => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([])

  const _onChangeDate = (_date) => setDate(_date)

  const _onRefresh = async () => {
    const notes = await NotesRepository.get();
    const _data = data;
    _data.push(
      ...notes
        .sorted('date', true)
        .filtered(`date === ${moment(date).format("YYYY-MM-DD")}`)
        .slice(data.length, data.length + 20)
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
              width: "100%"
            }}
          />
        }
      />
    </CustomLayout>
  )
}