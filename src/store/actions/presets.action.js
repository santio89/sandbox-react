export const savePreset = (presets, preset) => {
    const newId = presets.at(-1).id + 1;
    const newPresets = [...presets, { id: newId, ...preset }]
   
    return async dispatch => {  
        dispatch({
            type: "SET_PRESETS",
            presets: newPresets
        })
    }
}


export const deletePreset = (presets, id) => {
    const index = presets.findIndex(preset => preset.id === id);
    const newPresets = [...presets.slice(0, index), ...presets.slice(index + 1)]

    return async dispatch => {
        dispatch({
            type: "SET_PRESETS",
            newPresets
        })
    }
}