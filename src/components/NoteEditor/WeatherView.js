import React, { useContext } from 'react';
import { Text, Layout } from '@ui-kitten/components';
import Icon from 'utils/weather-icon/weatherIcon';
import Contexts from 'utils/Contexts';
import { View } from 'react-native';
import { WEATHER_ICON } from 'consts/configs';

export default (props) => {
    const context = useContext(Contexts);
    return(
        <View style={{...props.style}}>
            <Layout style={{ flex: 1, flexDirection: 'row', padding: 5, borderBottomColor: "#f2f2f2", borderBottomWidth: 1 }}>
                <Layout style={{ flex: 1, height: "100%", flexDirection: 'row' }}>
                    <Text style={{ height: "100%", textAlignVertical: "center", paddingLeft: 5 }}>{Math.floor( context.globalState.weather.main.temp - 273.15 )}°C</Text>
                    <Icon name={"wi-" + WEATHER_ICON["wi-owm-" + context.globalState.weather.weather[0].id]} size={40} style={{ paddingLeft: 5, height: "100%", textAlignVertical: "center"}} />
                    <Text style={{ height: "100%", textAlignVertical: "center", paddingLeft: 5 }}>{context.globalState.weather.name}</Text>
                </Layout>
                <Layout style={{ flex: 1, height: "100%", flexDirection: 'row', alignItems: "flex-end", justifyContent: "flex-end" }}>
                    <Text style={{ height: "100%", textAlignVertical: "center", paddingRight: 5 }}>{context.globalState.current}</Text>
                </Layout>
            </Layout>
        </View>
    )
}