import React from 'react'
import { Icon } from '@ui-kitten/components'

export const defReduceState = (initialState) => (state, newState) => {
  if (typeof newState === "object") {
    if (Object.keys(newState).length > 0) {
      return { ...state, ...newState }
    }
    return state
  }
  return initialState
}

export const getIcon = (config = {}) => (props = {}) => {
  return (
    <Icon
      {...props}
      {...config}
    />
  )
}

/**
 * 
 * @param {Array} array 
 * @param {any} item 
 * @param {Number} index 
 */
export const insertIntoIndex = (array, item, index) => {
  const _index = Number(index) !== NaN ? index : array.length
  return [
    ...array.slice(0, _index),
    item,
    ...array.slice(_index)
  ]
}

export const checkDublicateCharacterUnikey = (latin, unikey) => {
  const unikeyToLatin = unikey.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    .replace(/ì|í|ị|ỉ|ĩ/g, "i")
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    .replace(/đ/g, "d")
    .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
    .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
    .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
    .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
    .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
    .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
    .replace(/Đ/g, "D")
  return latin === unikeyToLatin
}