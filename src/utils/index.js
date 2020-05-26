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