const initialState = {
    userId: null,
    email: "",
    displayName: "",
    avatar: "",
}


const AuthReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SIGN_UP":
            return {
                ...state,
                userId: action.userId,
                email: action.email,
                displayName: action.displayName,
                avatar: action.avatar,
            }
        case "SIGN_IN":
            return {
                ...state,
                userId: action.userId,
                email: action.email,
                displayName: action.displayName,
                avatar: action.avatar,
            }
        case "SIGN_OUT":
            return {
                ...state,
                userId: null,
                email: "",
                displayName: "",
                avatar: ""
            }
        default:
            return state
    }
}

export default AuthReducer