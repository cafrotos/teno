import React from 'react';
import CustomLayout from 'components/CustomLayout';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { STACK_NAME } from 'consts/configs';

export default (props) => {
  const navigation = useNavigation()

  const _onPressCreateNote = () => {
    navigation.navigate(STACK_NAME.CREATE_NOTE)
  }

  return (
    <CustomLayout onButtonPress={_onPressCreateNote}>
      <ScrollView>
        <View style={{ height: 1000, backgroundColor: "green", marginTop: 48, }}>

        </View>
      </ScrollView>
    </CustomLayout>
  )
}