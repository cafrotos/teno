import React from 'react';
import { Text, Layout } from '@ui-kitten/components';
import { View } from 'react-native';

export default (props) => {
    return (
        <View style={{...props.style}}>
            <Layout style={{ flex: 1, flexDirection: 'row', padding: 15, borderBottomColor: "#f2f2f2", borderBottomWidth: 1 }}>
                <Layout style={{ flex: 1, height: "100%", flexDirection: 'row' }}>
                    <Text style={{ height: "100%", textAlignVertical: "center", paddingLeft: 5 }}>I'm Hungry</Text>
                </Layout>
                <Layout style={{ flex: 1, height: "100%", flexDirection: 'row', alignItems: "flex-end", justifyContent: "flex-end" }}>
                    <Text style={{ height: "100%", textAlignVertical: "center", paddingRight: 5 }}>(≖__≖)</Text>
                </Layout>
            </Layout>
        </View>
    )
}