const initialState = {
  presets: [],
  defaultPresets: [
  ]
}

const PresetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRESETS':
      return { ...state, presets: action.presets }
    case 'SET_DEFAULT_PRESETS':
      return { ...state, defaultPresets: action.defaultPresets }
    default:
      return state
  }
}

export default PresetReducer
