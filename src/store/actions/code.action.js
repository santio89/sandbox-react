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