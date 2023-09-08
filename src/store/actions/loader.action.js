export const setAuthLoader = (authLoader) => {

    return async dispatch => {
        dispatch({
            type: "SET_AUTH_LOADER",
            authLoader
        })
    }
}

export const setPresetLoader = (presetLoader) => {

    return async dispatch => {
        dispatch({
            type: "SET_PRESET_LOADER",
            presetLoader
        })
    }
}

export const setDefaultPresetLoader = (defaultPresetLoader) => {

    return async dispatch => {
        dispatch({
            type: "SET_DEFAULT_PRESET_LOADER",
            defaultPresetLoader
        })
    }
}