import React, { useState, useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { TabBar, Tab, Text, Button } from '@ui-kitten/components';

import { getIcon } from 'utils';

let i = 0;

const TopTabBar = ({ navigation, state, onSearch }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [isMoveIndexTab, setIsMoveIndexTab] = useState(false)
  const animateTopBarRef = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (state.index !== tabIndex) {
      if (tabIndex === 0 || state.index === 0) {
        setIsMoveIndexTab(true)
      }
      else {
        setIsMoveIndexTab(false)
      }
      setTabIndex(state.index)
    }
  }, [state.index])

  useEffect(() => {
    if (isMoveIndexTab) {
      if (tabIndex !== 0) {
        animateTopBarRef.setValue(0)
      }
    }
    Animated.timing(animateTopBarRef, {
      toValue: tabIndex !== 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: true
    }).start()
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

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: animateTopBarRef.interpolate({
              inputRange: [0, 1],
              outputRange: [48, 0]
            })
          }
        ],
        zIndex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#d0d0d0",
        backgroundColor: "#ffffff"
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
          height: 50,
          borderWidth: 0
        }}
      >
        <Tab icon={getIcon({ name: "home-outline" })} />
        <Tab icon={getIcon({ name: "book-open-outline" })} />
        <Tab icon={getIcon({ name: "calendar-outline" })} />
        {/* <Tab icon={getIcon({ name: "image-outline" })} /> */}
        <Tab icon={getIcon({ name: "settings-outline" })} />
      </TabBar>
    </Animated.View>
  );
}

export default (props) => <TopTabBar {...props} />