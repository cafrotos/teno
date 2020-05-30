import React, { memo, useRef, useState } from 'react';
import { Card, Text, Layout, Avatar, Button } from '@ui-kitten/components';
import { View, ScrollView, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { getIcon } from 'utils';

const width = Dimensions.get("screen").width

const Diary = ({
  topText,
  avatar,
  username,
  content,
  numberOfLines,
  onPress
}) => {
  const scrollRef = useRef()

  const [isScrollable, setIsScrollable] = useState(false)

  const _onLongPress = () => {
    if (scrollRef.current && (!username || username === "")) {
      setIsScrollable(true)
      scrollRef.current.scrollToEnd({ animated: true })
    }
  }

  const _onDisableScrollable = (event) => {
    if (event.nativeEvent.contentOffset.x === 0) {
      setIsScrollable(false)
    }
  }

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      scrollEnabled={isScrollable}
      onScroll={_onDisableScrollable}
    >
      <Layout
        style={{
          width: width - 16,
          paddingTop: 23,
        }}
      >
        {
          topText && topText !== "" &&
          <Layout
            style={{
              position: "absolute",
              top: 13,
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
              top: 0,
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
          onLongPress={_onLongPress}
        >
          <Text
            numberOfLines={numberOfLines}
          >
            {content}
          </Text>
        </Card>
      </Layout>
      <Layout
        style={{
          paddingTop: 23,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: 120,
        }}
      >
        <Button
          accessoryLeft={getIcon({ name: "edit-2-outline" })}
          style={{
            height: 30,
            width: 30,
            borderRadius: 30
          }}
        />
        <Button
          status="danger"
          accessoryLeft={getIcon({ name: "trash-2-outline" })}
          style={{
            height: 30,
            width: 30,
            borderRadius: 30
          }}
        />
      </Layout>
    </ScrollView>
  )
}

Diary.defaultProps = {
  numberOfLines: 5,
  onPress: () => { }
}

export default memo(Diary)