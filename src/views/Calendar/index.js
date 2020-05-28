import React, { useState } from 'react';
import CustomLayout from 'components/CustomLayout';
import { Text, Calendar } from '@ui-kitten/components';
import ListDiaries from 'components/ListDiaries';

const RenderCalendar = ({
  onChangeDate,
}) => {
  const [date, setDate] = useState(new Date());

  const _onChangeDate = (_date) => {
    setDate(_date)
    if (typeof onChangeDate === 'function') {
      onChangeDate(_date)
    }
  }

  return (
    <Calendar
      date={date}
      onSelect={_onChangeDate}
      style={{
        width: "100%"
      }}
    />
  )
}

export default (props) => {
  const [date, setDate] = useState(new Date());

  const _onChangeDate = (_date) => setDate(_date)

  return (
    <CustomLayout showButton={false}>
      <ListDiaries
        data={[]}
        header={
          <RenderCalendar onChangeDate={_onChangeDate} />
        }
      />
    </CustomLayout>
  )
}