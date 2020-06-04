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