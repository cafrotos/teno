import React, { useState, memo } from 'react'
import { FlatList, View } from 'react-native'
import Diary from 'components/Diary'
import { Layout, Spinner } from '@ui-kitten/components'
import moment from 'moment'

/**
 * 
 * @param {Object} props
 * @param {Array} props.data
 * @param {Number} props.marginTop
 * @param {Function} props.onRefresh return value is ended data
 * @param {Function} props.onItemPress
 * @param {React.Component} props.header
 */
const ListDiaries = ({
  data,
  marginTop,
  onRefresh,
  onItemPress,
  header
}) => {
  const [isRefresh, setIsRefresh] = useState(false)
  const [isEndData, setIsEndData] = useState(false)

  const renderItem = ({ item, index }) => {
    return (
      <Diary
        {...item}
        content={item.content}
        topText={moment(item.date).format("hh:mm DD/MM/YYYY")}
        onPress={(event) => onItemPress(item, event)}
      />
    )
  }

  const keyExtractor = (item, index) => index.toString()

  const ListFooterComponent = () => (
    <Layout style={{ width: "100%", display: "flex", alignItems: "center", paddingTop: 16, paddingBottom: 16 }}>
      {
        isRefresh ?
          <Spinner /> :
          null
      }
    </Layout>
  )

  const ListHeaderComponent = () => (
    header || <View style={{ marginTop, backgroundColor: "#ffffff" }} />
  )

  const ItemSeparatorComponent = () => (
    <View style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 0, paddingBottom: 16 }} />
  )

  const onEndReached = async () => {
    if (!isEndData) {
      const loadMore = onRefresh();
      if (loadMore instanceof Promise) {
        setIsRefresh(true)
        const _isEndData = await loadMore;
        setIsRefresh(false)
        if (_isEndData) {
          setIsEndData(true)
        }
      }
    }
    setIsRefresh(false)
  }

  return (
    <FlatList
      data={data}
      style={{
        paddingLeft: 8,
        paddingRight: 8
      }}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      onEndReached={onEndReached}
    />
  )
}

ListDiaries.defaultProps = {
  data: [],
  marginTop: 8,
  onRefresh: () => { },
  onItemPress: () => { }
}

export default memo(ListDiaries)