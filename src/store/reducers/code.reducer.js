const initialStateHtml = {
    html: ``,
}
const initialStateCss = {
    css: ``,
}
const initialStateJs = {
    js: ``,
}

export const HtmlReducer = (state = initialStateHtml, action) => {
    switch (action.type) {
        case 'SET_HTML':
            return { ...state, html: action.html }
        default:
            return state
    }
}
export const CssReducer = (state = initialStateCss, action) => {
    switch (action.type) {
        case 'SET_CSS':
            return { ...state, css: action.css }
        default:
            return state
    }
}
export const JsReducer = (state = initialStateJs, action) => {
    switch (action.type) {
        case 'SET_JS':
            return { ...state, js: action.js }
        default:
            return state
    }
}

