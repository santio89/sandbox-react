import { firebaseAuth as auth, firebaseGoogleProvider as provider } from "../../config/firebase"
import { signInWithPopup, signOut, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { getPresets } from "./presets.action";
import { setCodeAll } from "./code.action";
import { toast } from 'sonner'

export const authStateAction = () => {

    return async dispatch => {
        onAuthStateChanged(auth, (user) => {
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

                        dispatch({
                            type: "SIGN_IN",
                            userId: user.uid,
                            email: user.email,
                            displayName: user.displayName,
                            avatar: user.photoURL
                        })
                        toast.message('Auth', {
                            description: `User logged in: ${user.displayName}`,
                        })
                    }).catch((e) => {
                        console.log("error signing in with google: ", e)
                    });
            }).catch((error) => {
                console.log("error setting persistance: " + error);
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

            dispatch({
                type: "SIGN_OUT",
            })
        }).catch((e) => {
            console.log("error signing out: ", e)
        }).finally(() => {
            dispatch({
                type: "SET_AUTH_LOADER",
                authLoader: false
            });
            toast.message('Auth', {
                description: `User logged out`,
            })
        });
    }
}