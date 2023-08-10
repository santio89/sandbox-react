const initialState = {
    html: ``,
    css: ``,
    js: ``,
}

const CodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HTML':
            return { ...state, html: action.html }
        case 'SET_CSS':
            return { ...state, css: action.css }
        case 'SET_JS':
            return { ...state, js: action.js }
        case 'SET_CODE':
            return { ...state, html: action.html, css: action.css, js: action.js }
        default:
            return state
    }
}

export default CodeReducer
