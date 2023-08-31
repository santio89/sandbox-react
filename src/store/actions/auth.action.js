import { firebaseAuth as auth, firebaseGoogleProvider as provider } from "../../config/firebase"
import { signInWithPopup, signOut, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { getPresets } from "./presets.action";
import { setCodeAll } from "./code.action";
import { toast } from 'sonner'

export const authStateAction = () => {

    return async dispatch => {
        onAuthStateChanged(auth, (user) => {
            dispatch({ type: "HTML_CLEAR" })
            dispatch({ type: "CSS_CLEAR" })
            dispatch({ type: "JS_CLEAR" })
            dispatch(getPresets(user?.uid))
        })
    }
}

export const signInGoogle = () => {

    return async dispatch => {
        dispatch({
            type: "SET_AUTH_LOADER",
            authLoader: true
        });
        setPersistence(auth, browserLocalPersistence)
            .then(async () => {

                return signInWithPopup(auth, provider)
                    .then((result) => {
                        const user = result.user;

                        dispatch({ type: "HTML_CLEAR" })
                        dispatch({ type: "CSS_CLEAR" })
                        dispatch({ type: "JS_CLEAR" })

                        dispatch({
                            type: "SIGN_IN",
                            userId: user.uid,
                            email: user.email,
                            displayName: user.displayName,
                            avatar: user.photoURL
                        })
                        toast.message('Auth', {
                            description: `User signed in: ${user.displayName}`,
                        })
                    }).catch((e) => {
                        console.log("error signing in with google: ", e)
                        toast.error('Error signing in')
                    }).finally(() => {
                        dispatch({
                            type: "SET_AUTH_LOADER",
                            authLoader: false
                        });
                    });
            }).catch((error) => {
                console.log("error setting persistance: " + error);
                toast.error('Error signing in')
            }).finally(() => {
                dispatch({
                    type: "SET_AUTH_LOADER",
                    authLoader: false
                });
            });


    }
}

export const signOutUser = () => {

    return async dispatch => {
        dispatch({
            type: "SET_AUTH_LOADER",
            authLoader: true
        });

        signOut(auth).then(() => {
            dispatch(setCodeAll("", "", ""))
            dispatch({ type: "HTML_CLEAR" })
            dispatch({ type: "CSS_CLEAR" })
            dispatch({ type: "JS_CLEAR" })

            dispatch({
                type: "SIGN_OUT",
            })
            toast.message('Auth', {
                description: `User signed out`,
            })
        }).catch((e) => {
            console.log("error signing out: ", e)
            toast.error('Error signing out')
        }).finally(() => {
            dispatch({
                type: "SET_AUTH_LOADER",
                authLoader: false
            });
        });
    }
}