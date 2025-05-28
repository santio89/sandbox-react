export const setThemeReducer = (darkTheme) => {

    return async dispatch => {
        dispatch({
            type: "SET_THEME",
            darkTheme
        })
    }
}

export const setCurrentSnippet = (currentSnippet) => {
    return async dispatch => {
        dispatch({
            type: "SET_CURRENT_SNIPPET",
            currentSnippet: currentSnippet
        })
    }
}