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

  const renderText = (_content, index) => {
    const rangeTextIndex = [];
    _content.style.map(s => {
      if (!rangeTextIndex.includes(s.start)) {
        rangeTextIndex.push(s.start)
      }
      if (!rangeTextIndex.includes(s.end)) {
        rangeTextIndex.push(s.end)
      }
    })
    if (!rangeTextIndex.includes(0)) {
      rangeTextIndex.push(0)
    }
    if (!rangeTextIndex.includes(_content.content.length)) {
      rangeTextIndex.push(_content.content.length)
    }
    const sortRangeTextIndex = rangeTextIndex.sort((a, b) => a - b);
    const sortStyle = _content.style.sort((a, b) => (b.end - b.start) - (a.end - a.start))

    const _styles = [];
    sortRangeTextIndex.reduce((p, c) => {
      const _style = {
        start: p,
        end: c,
        style: {}
      }
      for (const item of sortStyle) {
        if (item.start <= p && item.end >= c) {
          _style.style = {
            ..._style.style,
            ...item.style,
          }
        }
      }
      _styles.push(_style)
      return c
    })
    return _styles.map((s, index) => (
      <Text key={index} style={s.style}>{_content.content.slice(s.start, s.end)}</Text>
    ))
  }

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
            {console.log(JSON.parse(content))}
            {JSON.parse(content).map((_content, index) => renderText(_content, index))}
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