import React, { useState } from 'react';
import CustomLayout from 'components/CustomLayout';
import { Text, Calendar } from '@ui-kitten/components';
import ListDiaries from 'components/ListDiaries';

export default (props) => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([])

  const _onChangeDate = (_date) => setDate(_date)

  return (
    <CustomLayout showButton={false}>
      <ListDiaries
        data={[]}
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