import React, { memo, useState, useRef, useEffect } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Layout, Text, Input, Button, Spinner } from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ImagePicker from 'react-native-image-picker'
import Image from 'react-native-image-progress'

import { CONTENT_TYPE, DEFAULT_STYLE } from 'consts/configs';
import { uploadImage } from 'utils/firebase';

const ScreenWidth = Dimensions.get("screen").width - 16 // do padding

const Editor = ({
  onEdit
}) => {
  const [contents, setContents] = useState([
    {
      content: "",
      style: [],
      type: CONTENT_TYPE.TEXT,
      align: "left"
    }
  ])
  const [point, setPoint] = useState({
    indexContent: 0,
    start: 0,
    end: 0
  })
  const [styles, setStyles] = useState([]);
  const [asyncUploadImage, setAsyncUploadImage] = useState([])

  useEffect(() => {
    const _mappingStyle = [];

    _mappingStyle.push("format-align-" + contents[point.indexContent].align)

    if (point.start !== point.end) {
      const _styles = contents[point.indexContent].style.filter(s => s.start <= point.start && s.end >= point.end)
      if (_styles.length > 0) {
        _styles.map(_style => {
          if (_style.style.fontWeight === "bold" && !_mappingStyle.includes(DEFAULT_STYLE.BOLD.value)) {
            _mappingStyle.push(DEFAULT_STYLE.BOLD.value);
          }
          if (_style.style.fontStyle === "italic" && !_mappingStyle.includes(DEFAULT_STYLE.ITALIC.value)) {
            _mappingStyle.push(DEFAULT_STYLE.ITALIC.value);
          }
          if (_style.style.textDecorationLine === "underline" && !_mappingStyle.includes(DEFAULT_STYLE.UNDERLINE.value)) {
            _mappingStyle.push(DEFAULT_STYLE.UNDERLINE.value);
          }
        })
      }
    }
    setStyles(_mappingStyle)
  }, [point])

  useEffect(() => {
    if (asyncUploadImage.length) {
      _handlePushImageToContent()
    }
  }, [asyncUploadImage])

  useEffect(() => {
    if (typeof onEdit === 'function') {
      onEdit(JSON.stringify(contents))
    }
  }, [contents])

  const _setAlignContent = (index, align) => {
    const _contents = [...contents]
    _contents[index].align = align;
    setContents(_contents)
  }

  const _onSelectionText = (index) => (event) => setPoint({ indexContent: index, ...event.nativeEvent.selection })

  const _handleStyleFontSize = (event, fontSize) => {
    if (event === "up") {
      if (!fontSize)
        return 16;
      return fontSize + 1
    }
    if (event === "down") {
      if (!fontSize)
        return 14;
      if (fontSize === 8) {
        return 8
      }
      return fontSize - 1
    }
    return fontSize
  }

  const _setStyleText = (_style) => {
    const _contents = JSON.parse(JSON.stringify(contents));
    const start = point.start;
    const end = point.end;
    const index = point.indexContent;

    if (start === end) {
      if (_contents[index].style.length === 0) {
        _contents[index].style.push({
          start: 0,
          end: _contents[index].content.length,
          style: {
            ..._style,
            fontSize: _handleStyleFontSize(_style.fontSize, null)
          }
        })
      }
      else {
        _contents[index].style = _contents[index].style.map(s => ({
          ...s,
          style: {
            ...s.style,
            ..._style,
            fontSize: _handleStyleFontSize(_style.fontSize, s.style.fontSize)
          },
          end: _contents[index].content.length
        }))
      }
    }
    else {
      if (_contents[index].style.length === 0) {
        _contents[index].style.push({
          start,
          end,
          style: {
            ..._style,
            fontSize: _handleStyleFontSize(_style.fontSize, null)
          }
        })
      }
      else {
        let isChangeStyle = false;
        _contents[index].style = _contents[index].style.map(s => {
          if (s.start === start && s.end === end) {
            s.style = {
              ...s.style,
              ..._style,
              fontSize: _handleStyleFontSize(_style.fontSize, s.style.fontSize)
            }
            isChangeStyle = true;
          }
          return s;
        })

        if (!isChangeStyle) {
          _contents[index].style.push({
            start,
            end,
            style: {
              ..._style,
              fontSize: _handleStyleFontSize(_style.fontSize, null)
            }
          })
        }
      }
    }
    setContents(_contents)
  }

  const _onSelectStyle = (_style) => () => {
    const _styles = [...styles]
    if (_style.value.includes("align")) {
      _setAlignContent(point.indexContent, _style.style.textAlign);
      _styles.splice(_styles.indexOf(DEFAULT_STYLE.ALIGN_LEFT.value), 1)
      _styles.splice(_styles.indexOf(DEFAULT_STYLE.ALIGN_CENTER.value), 1)
      _styles.splice(_styles.indexOf(DEFAULT_STYLE.ALIGN_RIGHT.value), 1)
      _styles.push(_style.value)
    }
    else if (!_styles.includes(_style.value)) {
      _styles.push(_style.value)
      _setStyleText(_style.style)
    }
    else {
      _styles.splice(_styles.indexOf(_style.value), 1)
      _setStyleText(_style.revertStyle)
    }
    setStyles(_styles)
  }

  const _onChangeTextContent = (index) => (text) => {
    const _contents = JSON.parse(JSON.stringify(contents));
    _contents[index].content = text
    if (point.start === point.end && point.start !== contents[index].content.length) {
      _contents[index].style = []
    }
    if (text === "") {
      _contents[index].style = []
    }
    setContents(_contents)
  }

  const _onChangeParagrapth = (index) => (event) => {
    const _contents = JSON.parse(JSON.stringify(contents));
    if (event.nativeEvent.key === "Backspace" && contents[index].content.trim() === "" && contents.filter(c => c.type === CONTENT_TYPE.TEXT).length > 1) {
      _contents.splice(index, 1);
    }

    if (event.nativeEvent.key === "Enter" && contents[index].content[contents[index].content.length - 1] === "\n" && contents[index].content[contents[index].content.length - 2] === "\n") {
      _contents[index].content = _contents[index].content.trim()
      _contents.push({
        content: "",
        style: [],
        type: CONTENT_TYPE.TEXT,
        align: "left"
      });
    }
    setContents(_contents)
  }

  const _handlePushImageToContent = () => {
    const _asyncUploadImage = [...asyncUploadImage];
    const { data, index } = _asyncUploadImage.pop();

    const _contents = contents.map((c, i) => {
      if (i === index) {
        c.data = data;
        c.loading = false;
      }
      return c
    })
    setContents(_contents)
    setAsyncUploadImage(_asyncUploadImage)
  }

  const _handleImagePicked = async ({ error, height, width, isVertical, path }) => {
    if (error) {
      alert(error)
      return;
    }
    if (path) {
      const _contents = JSON.parse(JSON.stringify(contents));
      const indexImage = _contents.length;
      const _height = isVertical ? height * ScreenWidth / width : width * ScreenWidth / height
      _contents.push({
        type: CONTENT_TYPE.PHOTO,
        align: "left",
        loading: true,
        style: {
          height: _height,
          width: ScreenWidth,
          flex: 1
        }
      })
      setContents(_contents)
      try {
        const data = await uploadImage(path);
        const _asyncUploadImage = [...asyncUploadImage];
        _asyncUploadImage.push({
          data,
          index: indexImage
        });
        setAsyncUploadImage(_asyncUploadImage)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const _onPressImagePicker = () => {
    const options = {
      title: "Chọn ảnh",
      cancelButtonTitle: "Hủy",
      takePhotoButtonTitle: "Chụp ảnh từ camera",
      chooseFromLibraryButtonTitle: "Chọn ảnh từ thư viện ảnh",
    };
    ImagePicker.showImagePicker(options, _handleImagePicked)
  }

  const _onPlusFontSize = () => {
    _setStyleText({
      fontSize: "up"
    })
  }

  const _onMinusFontSize = () => {
    _setStyleText({
      fontSize: "down"
    })
  }

  const renderText = (_content) => {
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

  const renderTextInput = (_content, index) => (
    <Input
      autoFocus
      multiline
      style={{
        borderWidth: 0,
        backgroundColor: "#ffffff",
        shadowColor: "#ffffff",
        borderColor: "#ffffff",
      }}
      textAlign={_content.align}
      placeholder="Hãy viết gì đó..."
      key={index}
      onChangeText={_onChangeTextContent(index)}
      onSelectionChange={_onSelectionText(index)}
      onKeyPress={_onChangeParagrapth(index)}
    >
      <>
        {
          renderText(_content)
        }
      </>
    </Input>
  )

  const renderPhoto = (_content, index) => {
    if (_content.loading) {
      return (
        <Layout
          style={{
            padding: 24,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          key={index}
        >
          <Spinner />
        </Layout>
      )
    }
    return (
      <Image
        source={{
          uri: _content.data
        }}
        indicator={Spinner}
        style={_content.style}
      />
    )
  }

  const renderContent = (_content, index) => {
    switch (_content.type) {
      case CONTENT_TYPE.TEXT: return renderTextInput(_content, index)
      case CONTENT_TYPE.PHOTO: return renderPhoto(_content, index)
    }
  }

  return (
    <Layout
      style={{
        flex: 1,
      }}
    >
      <Layout
        style={{
          flex: 1
        }}
      >
        <ScrollView
          style={{
            paddingHorizontal: 8
          }}
        >
          {
            contents.map(renderContent)
          }
        </ScrollView>
      </Layout>
      <Layout
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
        }}
      >
        <ScrollView
          horizontal
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}
        >
          <Button
            appearance="ghost"
            status="basic"
            size="tiny"
            onPress={_onPressImagePicker}
          >
            <MaterialCommunityIcons name={"image-plus"} size={30} />
          </Button>
          {
            Object.values(DEFAULT_STYLE).map((item, index) => (
              <Button
                appearance="ghost"
                status={styles.includes(item.value) ? "primary" : "basic"}
                size="tiny"
                key={index}
                onPress={_onSelectStyle(item)}
              >
                <MaterialCommunityIcons name={item.value} size={30} />
              </Button>
            ))
          }
          <Button
            appearance="ghost"
            status="basic"
            size="tiny"
            onPress={_onPlusFontSize}
          >
            <MaterialCommunityIcons name={"format-font-size-increase"} size={30} />
          </Button>
          <Button
            appearance="ghost"
            status="basic"
            size="tiny"
            onPress={_onMinusFontSize}
          >
            <MaterialCommunityIcons name={"format-font-size-decrease"} size={30} />
          </Button>
        </ScrollView>
      </Layout>
    </Layout>
  )
}

export default memo(Editor)