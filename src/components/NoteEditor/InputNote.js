import React from 'react';
import { Input } from '@ui-kitten/components';

export default (props) => {
    return (
        <Input
            placeholder="Write your emotion"
            autoFocus={true}
            multiline={true}
            textStyle={{ minHeight: 100, height: "50%" }}
            style={{ width: "100%", borderColor: "transparent", borderBottomWidth: 0 }}
            onChangeText={props.onChangeText}
        />
    )
}