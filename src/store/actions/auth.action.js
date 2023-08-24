import { firebaseAuth as auth, firebaseGoogleProvider as provider } from "../../config/firebase"
import { signInWithPopup, signOut, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { getPresets } from "./presets.action";
import { setCodeAll } from "./code.action";

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

                        dispatch({
                            type: "SET_AUTH_LOADER",
                            authLoader: false
                        });
                    }).catch((e) => {
                        console.log("error signing in with google: ", e)
                    });
            })
            .catch((error) => {
                console.log("error setting persistance: " + error);
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

            dispatch({
                type: "SET_AUTH_LOADER",
                authLoader: false
            });
        }).catch((e) => {
            console.log("error signing out: ", e)
        });
    }
}