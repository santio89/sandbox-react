import { firebaseDb as db } from "../../config/firebase"
import { ref, set, child, get } from "firebase/database";

export const savePreset = (presets, preset, userId = null) => {
    const newPresets = [...presets, preset]

    return async dispatch => {
        if (userId) {
            try {
                await set(ref(db, 'presets/' + userId), {
                    presets: newPresets
                });

                dispatch({
                    type: "SET_PRESETS",
                    presets: newPresets
                })
            } catch (e) {
                console.log("error saving to db: ", e)
            }
        } else {
            dispatch({
                type: "SET_PRESETS",
                presets: newPresets
            })
        }
    }
}

export const deletePreset = (presets, id, userId = null) => {
    const index = presets.findIndex(preset => preset.id === id);
    presets.splice(index, 1)

    return async dispatch => {

        if (userId) {
            try {
                await set(ref(db, 'presets/' + userId), {
                    presets
                });

                dispatch({
                    type: "SET_PRESETS",
                    presets
                })
            } catch (e) {
                console.log("error saving to db: ", e)
            }
        } else {
            dispatch({
                type: "SET_PRESETS",
                presets
            })
        }
    }
}

export const editPreset = (presets, id, newName, userId = null) => {
    const index = presets.findIndex(preset => preset.id === id);
    presets[index].name = newName

    return async dispatch => {
        if (userId) {
            try {
                await set(ref(db, 'presets/' + userId), {
                    presets
                });

                dispatch({
                    type: "SET_PRESETS",
                    presets
                })
            } catch (e) {
                console.log("error saving to db: ", e)
            }
        } else {
            dispatch({
                type: "SET_PRESETS",
                presets
            })
        }
    }
}

export const getPresets = (userId = null) => {
    const presets = []

    return async dispatch => {

        if (userId) {
            get(child(ref(db), `users/${userId}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((e) => {
                console.log("error retrieving from db: ", e);
            });

        } else {
            dispatch({
                type: "SET_PRESETS",
                presets
            })
        }
    }
}