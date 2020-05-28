import React from 'react';
import { Card, Text, Layout, Avatar } from '@ui-kitten/components';
import { View } from 'react-native';

const Diary = ({
  topText,
  avatar,
  username,
  content,
  numberOfLines,
  onPress
}) => {
  return (
    <Layout>
      {

        topText && topText !== "" &&
        <Layout
          style={{
            position: "absolute",
            top: -10,
            zIndex: 1,
            right: 10,
            backgroundColor: "transparent"
          }}
        >
          <Text
            category="label"
            style={{
              zIndex: 1,
              paddingLeft: 6,
              paddingRight: 6,
            }}
          >
            {topText}
          </Text>
          <View
            style={{
              height: 2,
              width: "100%",
              position: "absolute",
              top: 9,
              backgroundColor: "#ffffff"
            }}
          />
        </Layout>
      }
      {

        avatar && avatar !== "" &&
        <Layout
          style={{
            position: "absolute",
            top: -23,
            zIndex: 1,
            left: 10,
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Layout
            style={{
              paddingLeft: 6,
              paddingRight: 3,
              backgroundColor: "transparent",
              zIndex: 1
            }}
          >
            <Avatar
              source={{
                uri: avatar
              }}
            />
          </Layout>
          <Text
            style={{
              zIndex: 1,
              paddingLeft: 3,
              paddingRight: 6,
              fontWeight: "bold",
            }}
          >
            {username}
          </Text>
          <View
            style={{
              height: 2,
              width: "100%",
              position: "absolute",
              top: 23,
              backgroundColor: "#ffffff"
            }}
          />
        </Layout>
      }
      <Card
        style={{
          zIndex: -1,
          paddingTop: avatar && avatar !== "" ? 16 : 0,
        }}
        onPress={onPress}
      >
        <Text
          numberOfLines={numberOfLines}
        >
          {content}
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