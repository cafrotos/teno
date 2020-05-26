import React from 'react';
import CustomLayout from 'components/CustomLayout';
import { Text, Calendar } from '@ui-kitten/components';

export default (props) => {
  return (
    <CustomLayout showButton={false}>
      <Calendar 
        style={{
          width: "100%"
        }}
      />
    </CustomLayout>
  )
}