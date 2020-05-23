import React from 'react';
import CustomLayout from 'components/CustomLayout';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default (props) => {
  return (
    <CustomLayout>
      <ScrollView
        style={{ marginTop: 48, flex: 1 }}
      >
        <View style={{ height: 1000, backgroundColor: "green" }}>

        </View>
      </ScrollView>
    </CustomLayout>
  )
}