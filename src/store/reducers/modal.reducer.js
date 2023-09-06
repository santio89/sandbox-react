const initialState = {
    active: false,
    loadSnippet: false,
    createNew: false,
}

const CodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MODAL':
            return { ...state, active: action.active }
        case 'SET_SNIPPET':
            return { ...state, loadSnippet: action.loadSnippet }
        case 'SET_NEW':
            return { ...state, createNew: action.createNew }
        default:
            return state
    }
}

export default CodeReducer
