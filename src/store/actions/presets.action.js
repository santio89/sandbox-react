import { firebaseDb as db } from "../../config/firebase"
import { ref, set, push, child, get, remove } from "firebase/database";
import { toast } from "sonner";

export const savePreset = (presets, preset, userId = null, callback) => {

    return async dispatch => {
        if (userId) {
            try {
                const doc = await push(ref(db, 'presets/' + userId), preset);
                const newPreset = { docId: doc.key, ...preset }
                const newPresets = [...presets, newPreset]

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
                toast.error('Error saving snippet')
            }
        } else {
            toast.error('Sign in')
        }
    }
}

export const deletePreset = (presets, name, docId, id, userId = null) => {
    const index = presets.findIndex(preset => preset.id === id);
    presets.splice(index, 1)

    return async dispatch => {

        if (userId) {
            try {
                await remove(ref(db, 'presets/' + userId + "/" + docId))

                dispatch({
                    type: "SET_PRESETS",
                    presets
                })
                toast.message('Snippets', {
                    description: `Snippet deleted: ${name}`,
                })
            } catch (e) {
                console.log("error saving to db: ", e)
                toast.error('Error deleting snippet')
            }
        } else {
            toast.error('Sign in')
        }
    }
}

export const editPreset = (presets, name, docId, id, newName, userId = null) => {
    const index = presets.findIndex(preset => preset.id === id);
    presets[index].name = newName
    const updatedPreset = presets[index]

    return async dispatch => {
        if (userId) {
            try {
                await set(ref(db, 'presets/' + userId + "/" + docId), updatedPreset);

                dispatch({
                    type: "SET_PRESETS",
                    presets
                })
                toast.message('Snippets', {
                    description: `Snippet renamed: ${name} ➔ ${newName}`,
                })
            } catch (e) {
                console.log("error saving to db: ", e)
                toast.error('Error renaming snippet')
            }
        } else {
            toast.error('Sign in')
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
                    const presetsObj = snapshot.val()
                    presets = Object.entries(presetsObj).map((obj) => { return { docId: obj[0], ...obj[1] } })

                    dispatch({
                        type: "SET_PRESETS",
                        presets
                    })
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