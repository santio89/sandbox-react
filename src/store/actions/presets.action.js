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
    let presets = []
  
    return async dispatch => {
        dispatch({
            type: "SET_PRESET_LOADER",
            presetLoader: true
        });
        if (userId) {
            get(child(ref(db), `presets/${userId}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    presets = snapshot.val().presets
                    dispatch({
                        type: "SET_PRESETS",
                        presets
                    })
                } else {
                    console.log("No data available");
                }
                dispatch({
                    type: "SET_PRESET_LOADER",
                    presetLoader: false
                });
            }).catch((e) => {
                console.log("error retrieving from db: ", e);
            });
        } else {
            dispatch({
                type: "SET_PRESETS",
                presets
            })
            dispatch({
                type: "SET_PRESET_LOADER",
                presetLoader: false
            });
        }
    }
}