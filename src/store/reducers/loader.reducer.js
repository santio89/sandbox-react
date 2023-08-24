const initialState = {
    authLoader: false,
    presetLoader: true,
}


const LoaderReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET_AUTH_LOADER":
            return {
                ...state,
                authLoader: action.authLoader,
            }
        case "SET_PRESET_LOADER":
            return {
                ...state,
                presetLoader: action.presetLoader,
            }
        default:
            return state
    }
}

export default LoaderReducer