export const defReduceState = (initialState) => (state, newState) => {
  if (typeof newState === "object") {
    if (Object.keys(newState).length > 0) {
      return { ...state, ...newState }
    }
    return state
  }
  return initialState
}