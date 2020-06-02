import React, { memo, useState, useRef, useEffect } from 'react';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { CONTENT_TYPE, DEFAULT_STYLE } from '../../constants/configs';
import { insertIntoIndex } from 'utils';

const Editor = ({

}) => {
  const inputRef = useRef();

  const [contents, setContents] = useState([
    {
      content: "",
      style: [],
      type: CONTENT_TYPE.TEXT,
      align: "left"
    }
  ])
  const [notes, setNotes] = useState([
    {
      contents: [],
      type: CONTENT_TYPE.TEXT,
      align: "left"
    }
  ])
  const [point, setPoint] = useState({
    indexContent: 0,
    start: 0,
    end: 0
  })
  const [prevEndCursor, setPrevEndCursor] = useState(0)
  const [styles, setStyles] = useState([]);

  const _onChangeNotesText = (index) => (event) => {
    console.log(point)
    const _notes = JSON.parse(JSON.stringify(notes))
    const _charater = event.nativeEvent.key
    const _charaterStyle = {};
    const _endCursor = point.end

    if (_endCursor !== prevEndCursor) {
      setPrevEndCursor(_endCursor)
    }
    else {
      _notes[index].contents.splice(_endCursor - 1, 1)
    }

    if (_charater === "Backspace") {
      _notes[index].contents.splice(_endCursor - 1, 1)
      setNotes(_notes)
      return
    }

    if (_charater === "Enter") {
      if (_notes[index].contents[_notes[index].contents.length - 1].char !== "\n") {
        _notes[index].contents.push({
          char: "\n",
          style: {}
        })
      }
      else {
        _notes.push({
          contents: [],
          type: CONTENT_TYPE.TEXT,
          align: "left"
        })
      }
      setNotes(_notes)
      return
    }

    Object.assign(
      _charaterStyle,
      ...Object
        .values(DEFAULT_STYLE)
        .filter(s => styles.includes(s.value))
        .map(s => s.style)
    )

    _notes[index].contents = insertIntoIndex(_notes[index].contents, { char: _charater, style: _charaterStyle }, _endCursor - 1);
    setNotes(_notes)
  }

  const _setAlignContent = (index, align) => {
    const _notes = [...notes]
    _notes[index].align = align;
    setNotes(_notes)
  }

  const _onSelectionText = (index) => (event) => setPoint({ indexContent: index, ...event.nativeEvent.selection })

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
    }
    else {
      _styles.splice(_styles.indexOf(_style.value), 1)
    }
    setStyles(_styles)
  }

  const _focusInput = () => inputRef.current.focus()

  const renderText = (_content) => (
    _content.contents.map((item, index) => (
      <Text style={item.style} key={index}>{item.char}</Text>
    ))
  )

  const renderTextInput = (_content, index) => (
    <Input
      // ref={index === contents.length - 1 && inputRef}
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
      onChangeText={(text) => console.log(text.split(" ").pop())}
      onSelectionChange={_onSelectionText(index)}
      onKeyPress={_onChangeNotesText(index)}
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
      <TouchableWithoutFeedback
        // onPress={_focusInput}
      >
        <Layout
          style={{
            flex: 1
          }}
        >
          {
            notes.map(renderContent)
          }
        </Layout>
      </TouchableWithoutFeedback>
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

export default Editor