import React, { useState, useEffect } from 'react';
import { View, Animated } from 'react-native';
import { TabBar, Tab, Text, Button } from '@ui-kitten/components';

import { getIcon } from 'utils';

const TopTabBar = ({ navigation, state, onSearch }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [isMoveIndexTab, setIsMoveIndexTab] = useState(false)
  const [height, setHeight] = useState(50)
  const animate = new Animated.Value(1)

  useEffect(() => {
    if (state.index !== tabIndex) {
      _selectTab(state.index)
    }
  }, [state.index])

  useEffect(() => {
    if (isMoveIndexTab) {
      if (tabIndex !== 0) {
        animate.setValue(0)
      }
      Animated.timing(animate, {
        toValue: tabIndex !== 0 ? 1 : 0,
        duration: 200,
        useNativeDriver: true
      }).start()
    }
  }, [tabIndex, isMoveIndexTab])

  const _selectTab = (index) => {
    if (tabIndex === 0 || index === 0) {
      setIsMoveIndexTab(true)
    }
    else {
      setIsMoveIndexTab(false)
    }
    setTabIndex(index)
    navigation.navigate(state.routeNames[index])
  }

  const _getAnimation = () => {
    if (!isMoveIndexTab && tabIndex === 0) {
      return 48
    }
    return animate.interpolate({
      inputRange: [0, 1],
      outputRange: [48, 0]
    })
  }

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: _getAnimation()
          }
        ],
        zIndex: 100
      }}
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          position: "absolute",
          height: 50,
          top: -50,
          padding: 10,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Text
          category="h1"
          status="primary"
          style={{ fontWeight: "bold" }}
        >
          Teno
        </Text>
        <Button
          accessoryLeft={getIcon({ name: "search-outline" })}
          style={{
            height: 30,
            width: 30,
            borderRadius: 30
          }}
          appearance="ghost"
          onPress={onSearch}
        />
      </View>
      <TabBar
        selectedIndex={state.index}
        onSelect={_selectTab}
        style={{
          borderWidth: 0
        }}
      >
        <Tab icon={getIcon({ name: "home-outline" })} />
        <Tab icon={getIcon({ name: "book-open-outline" })} />
        <Tab icon={getIcon({ name: "calendar-outline" })} />
        <Tab icon={getIcon({ name: "image-outline" })} />
        <Tab icon={getIcon({ name: "settings-outline" })} />
      </TabBar>
    </Animated.View>
  );
}

export default (props) => <TopTabBar {...props} />