const initialStateHtml = {
    html: ``,
}
const initialStateCss = {
    css: ``,
}
const initialStateJs = {
    js: ``,
}
const initialStateEditorSettings = {
    lineHighlight: "none",
    minimap: false,
    wordWrap: 'off'
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
export const editorReducer = (state = initialStateEditorSettings, action) => {
    switch (action.type) {
        case 'SET_LINE_HIGHLIGHT':
            return { ...state, lineHighlight: action.lineHighlight }
        case 'SET_MINIMAP':
            return { ...state, minimap: action.minimap }
        case 'SET_WORD_WRAP':
            return { ...state, wordWrap: action.wordWrap }
        default:
            return state
    }
}

