import React from 'react';
import { Layout, Button } from '@ui-kitten/components';
import { View } from 'react-native';

export default (props) => {
    return (
        <View style={{...props.style}}>
            <Layout style={{ flex: 1, flexDirection: 'row', padding: 5 }}>
                <Button onPress={props.onSave}>Lưu</Button>
            </Layout>
        </View>
    )
}