import React, { memo, useState, useRef, useEffect } from 'react';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView } from 'react-native';
import { CONTENT_TYPE, DEFAULT_STYLE } from '../../constants/configs';

const Editor = ({

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

  useEffect(() => {
    const _mappingStyle = [];

    _mappingStyle.push("format-align-" + contents[point.indexContent].align)

    if (point.start !== point.end) {
      const _style = contents[point.indexContent].style.filter(s => s.start === point.start && s.end === point.end).pop()
      if (_style) {
        if (_style.style.fontWeight === "bold") {
          _mappingStyle.push(DEFAULT_STYLE.BOLD.value);
        }
        if (_style.style.fontStyle === "italic") {
          _mappingStyle.push(DEFAULT_STYLE.ITALIC.value);
        }
        if (_style.style.textDecorationLine === "underline") {
          _mappingStyle.push(DEFAULT_STYLE.UNDERLINE.value);
        }
      }
    }
    setStyles(_mappingStyle)
  }, [point])

  const _setAlignContent = (index, align) => {
    const _contents = [...contents]
    _contents[index].align = align;
    setContents(_contents)
  }

  const _onSelectionText = (index) => (event) => setPoint({ indexContent: index, ...event.nativeEvent.selection })

  const _setStyleText = (_style) => {
    const _contents = JSON.parse(JSON.stringify(contents));
    const start = point.start;
    const end = point.end;
    const index = point.indexContent;

    if (start === end) {
      if (_contents[index].style.length === 0) {
        _contents[index].style.push({
          start: 0,
          end: _contents[index].length,
          style: _style
        })
      }
      else {
        _contents[index].style = _contents[index].style.map(s => ({ ...s, ..._style }))
      }
    }
    else {
      if (_contents[index].style.length === 0) {
        _contents[index].style.push({
          start,
          end,
          style: _style
        })
      }
      else {
        let isChangeStyle = false;
        _contents[index].style = _contents[index].style.map(s => {
          if (s.start === start && s.end === end) {
            s.style = {
              ...s.style,
              ..._style
            }
            isChangeStyle = true;
          }
          return s;
        })

        if (!isChangeStyle) {
          _contents[index].style.push({
            start,
            end,
            style: _style
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
    setContents(_contents)
  }

  const _onChangeParagrapth = (index) => (event) => {
    const _contents = JSON.parse(JSON.stringify(contents));
    if (event.nativeEvent.key === "Backspace" && contents[index].content.trim() === "" && contents.length > 1) {
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

    const _styles = [];
    sortRangeTextIndex.reduce((p, c) => {
      const _style = {
        start: p,
        end: c,
        style: {}
      }
      for (const item of _content.style) {
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

  const renderPhoto = () => (
    <Layout />
  )

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
      {
        contents.map(renderContent)
      }
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
        >
          <Button
            appearance="ghost"
            status="basic"
            size="tiny"
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
          >
            <MaterialCommunityIcons name={"format-font-size-increase"} size={30} />
          </Button>
          <Button
            appearance="ghost"
            status="basic"
            size="tiny"
          >
            <MaterialCommunityIcons name={"format-font-size-decrease"} size={30} />
          </Button>
        </ScrollView>
      </Layout>
    </Layout>
  )
}

export default memo(Editor)