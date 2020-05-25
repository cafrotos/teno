import React from 'react';
import { Card, Text, Layout } from '@ui-kitten/components';
import { View } from 'react-native';

const Diary = ({
  topText,
  numberOfLines,
  onPress
}) => {
  return (
    <Layout>
      {

        topText && topText !== "" &&
        <>
          <Text
            style={{
              position: "absolute",
              top: -10,
              zIndex: 1,
              paddingLeft: 10,
              paddingRight: 10,
              right: 10,
            }}
          >
            {topText}
          </Text>
          <View
            style={{
              height: 1,
              width: 145,
              position: "absolute",
              top: 0,
              right: 10,
              backgroundColor: "#ffffff"
            }}
          />
        </>
      }
      <Card
        style={{
          zIndex: -1
        }}
        onPress={onPress}
      >
        <Text
          numberOfLines={numberOfLines}
        >
          sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj sdfhjsdkfhj
        </Text>
      </Card>
    </Layout>
  )
}

Diary.defaultProps = {
  numberOfLines: 5,
  onPress: () => { }
}

export default Diary