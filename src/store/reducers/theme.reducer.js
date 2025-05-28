const initialState = {
    darkTheme: true,
    currentSnippet: null
}

const ThemeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_THEME':
            return { ...state, darkTheme: action.darkTheme }
        case 'SET_CURRENT_SNIPPET':
            return { ...state, currentSnippet: { ...action.currentSnippet } }
        default:
            return state
    }
}

export default ThemeReducer
