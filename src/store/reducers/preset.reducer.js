const initialState = {
  presets: [],
  defaultPresets: [
  ],
  presetsIndex: []
}

const PresetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRESETS':
      return { ...state, presets: action.presets }
    case 'SET_DEFAULT_PRESETS':
      return { ...state, defaultPresets: action.defaultPresets }
    case 'SET_PRESETS_INDEX':
      return { ...state, presetsIndex: action.presetsIndex }
    default:
      return state
  }
}

export default PresetReducer
