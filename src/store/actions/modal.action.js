export const setModal = (active) => {

    return async dispatch => {
        dispatch({
            type: "SET_MODAL",
            active
        })
    }
}

export const setLoadSnippet = (loadSnippet) => {

    return async dispatch => {
        dispatch({
            type: "SET_SNIPPET",
            loadSnippet
        })
    }
}

export const setCreateNew = (createNew) => {

    return async dispatch => {
        dispatch({
            type: "SET_NEW",
            createNew
        })
    }
}