import { CONTENT_TYPE } from 'consts/configs';

import React, { memo, useRef, useState, useEffect } from 'react';
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
  const [note, setNote] = useState(null)
  useEffect(() => {
    try {
      setNote(JSON.parse(content))
    } catch (error) {
    }
  }, [content])
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
            {
              note ?
                renderText(note.filter(n => n.type === CONTENT_TYPE.TEXT).pop()) :
                content
            }
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