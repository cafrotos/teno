import React, { useEffect } from 'react';
import CustomLayout from 'components/CustomLayout';
import { Text, Input, Layout, Button } from '@ui-kitten/components';
import { View } from 'react-native';
import Icon from 'utils/weather-icon/weatherIcon';
import { getLocation, getData } from 'utils/weather';

export default (props) => {

  useEffect(async () => {
    getLocation()
    let data = new getData()
    console.log(data)
  })

  return (
    <CustomLayout showButton={false}>
      <View style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,.25)" }}>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Layout style={{flex: 1, flexDirection: 'row', padding: 5}}>
            <Icon name="wi-day-sunny" size={40}/>
            <Text style={{height: "100%", textAlignVertical: "center", paddingLeft: 5}}>25</Text>
            <Text style={{height: "100%", textAlignVertical: "center", paddingLeft: 5}}>Hanoi</Text>
          </Layout>
          <Input
            placeholder="Write your emotion"
            autoFocus={true}
            multiline={true}
            textStyle={{ minHeight: 100 }}
            style={{ width: "100%", borderColor: "transparent", borderBottomWidth: 0}}
          >
          </Input>
          <Layout style={{flex: 1, flexDirection: 'row', padding: 5}}>
            <Button>Lưu</Button>
          </Layout>
        </View>
      </View>
    </CustomLayout>
  )
}