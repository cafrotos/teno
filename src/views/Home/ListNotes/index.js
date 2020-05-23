import React from 'react';
import CustomLayout from 'components/CustomLayout';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default (props) => {
  return (
    <CustomLayout>
      <ScrollView>
        <View style={{ height: 1000, backgroundColor: "green", marginTop: 48, }}>

        </View>
      </ScrollView>
    </CustomLayout>
  )
}