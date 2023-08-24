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
            type: "SET_AUTH_LOADER",
            presetLoader
        })
    }
}