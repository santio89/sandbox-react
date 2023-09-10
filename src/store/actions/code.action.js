export const setCodeHtml = (html) => {
    return async dispatch => {
        dispatch({
            type: "SET_HTML",
            html
        })
    }
}

export const setCodeCss = (css) => {
    return async dispatch => {
        dispatch({
            type: "SET_CSS",
            css
        })
    }
}

export const setCodeJs = (js) => {
    return async dispatch => {
        dispatch({
            type: "SET_JS",
            js
        })
    }
}

export const setCodeAll = (html, css, js) => {
    return async dispatch => {
        dispatch({
            type: "SET_HTML",
            html
        })
        dispatch({
            type: "SET_CSS",
            css
        })
        dispatch({
            type: "SET_JS",
            js
        })
    }
}

export const setLineHighlight = (lineHighlight) => {
    return async dispatch => {
        dispatch({
            type: "SET_LINE_HIGHLIGHT",
            lineHighlight: lineHighlight
        })
    }
}
export const setMinimap = (a) => {
    return async dispatch => {
        dispatch({
            type: "SET_MINIMAP",
            minimap: a
        })
    }
}
export const setWordWrap = (wordWrap) => {
    return async dispatch => {
        dispatch({
            type: "SET_WORD_WRAP",
            wordWrap: wordWrap
        })
    }
}