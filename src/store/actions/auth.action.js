import { firebaseAuth as auth, firebaseGoogleProvider as provider } from "../../config/firebase"
import { signInWithPopup, signOut } from "firebase/auth";

export const signUpEmail = (email, password) => {

    return async dispatch => {

    }
}

export const signInGoogle = () => {

    return async dispatch => {

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;

                dispatch({
                    type: "SIGN_IN",
                    userId: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    avatar: user.photoURL
                })
            }).catch((e) => {
                console.log("error signing in with google: ", e)
            });
    }
}

export const signOutUser = () => {

    return async dispatch => {
        
        signOut(auth).then(() => {

            dispatch({
                type: "SIGN_OUT",
            })
        }).catch((e) => {
            console.log("error signing out: ", e)
        });
    }
}