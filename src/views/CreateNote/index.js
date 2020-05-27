import React, { useEffect } from 'react';
import CustomLayout from 'components/CustomLayout';
import { Text, Input, Layout } from '@ui-kitten/components';
import { View } from 'react-native';
import Icon from 'utils/weather-icon/weatherIcon';
import { getLocation, getData, getWeather } from 'utils/weather';

export default (props) => {

  useEffect(async () => {
    // await getWeather()
    // let data = new getData()
    //console.log(data)
  })

  return (
    <CustomLayout showButton={false}>
      <View style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,.25)" }}>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Layout style={{flex: 1, flexDirection: 'row', padding: 5}}>
            <Icon name="wi-day-sunny" size={40}/>
            
          </Layout>
          <Input
            placeholder="Write your emotion"
            autoFocus={true}
            multiline={true}
            textStyle={{ minHeight: 100 }}
            style={{ width: "100%", borderColor: "transparent" }}
          >
          </Input>
        </View>
      </View>
    </CustomLayout>
  )
}