export const savePreset = (presets, preset) => {
    const newPresets = [...presets, preset]

    return async dispatch => {
        dispatch({
            type: "SET_PRESETS",
            presets: newPresets
        })
    }
}


export const deletePreset = (presets, id) => {
    const index = presets.findIndex(preset => preset.id === id);
    presets.splice(index, 1)
    
    return async dispatch => {
        dispatch({
            type: "SET_PRESETS",
            presets
        })
    }
}