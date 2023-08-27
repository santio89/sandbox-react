import { firebaseDb as db } from "../../config/firebase"
import { ref, set, child, get } from "firebase/database";
import { toast } from "sonner";

export const savePreset = (presets, preset, userId = null, callback) => {
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
                callback()
                toast.message('Snippets', {
                    description: `Snippet saved: ${preset.name}`,
                })
            } catch (e) {
                console.log("error saving to db: ", e)
            }
        }
    }
}

export const deletePreset = (presets, name, id, userId = null) => {
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
                toast.message('Snippets', {
                    description: `Snippet deleted: ${name}`,
                })
            } catch (e) {
                console.log("error saving to db: ", e)
            }
        }
    }
}

export const editPreset = (presets, name, id, newName, userId = null) => {
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
                toast.message('Snippets', {
                    description: `Snippet renamed: ${name} ➔ ${newName}`,
                })
            } catch (e) {
                console.log("error saving to db: ", e)
            }
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
            }).catch((e) => {
                console.log("error retrieving from db: ", e);
            }).finally(() => {
                dispatch({
                    type: "SET_PRESET_LOADER",
                    presetLoader: false
                });
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