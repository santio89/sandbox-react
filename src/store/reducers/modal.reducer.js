const initialState = {
    active: false,
    loadSnippet: false,
}

const CodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MODAL':
            return { ...state, active: action.active }
        case 'SET_SNIPPET':
            return { ...state, loadSnippet: action.loadSnippet }
        default:
            return state
    }
}

export default CodeReducer
