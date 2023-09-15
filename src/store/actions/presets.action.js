import { firebaseDb as db, timestamp } from "../../config/firebase"
import { ref, set, push, child, get, remove } from "firebase/database";
import { toast } from "sonner";

export const savePreset = (presets, preset, userId = null, callback) => {

    return async dispatch => {
        if (userId) {
            try {
                /* check duplicated name */
                let exists = false;
                let existsMany = 0;
                do {
                    exists = presets.some(obj => obj.name === preset.name);
                    if (!exists) continue
                    exists && existsMany++

                    if (existsMany === 1) {
                        preset.name += `(${existsMany})`
                    } else if (existsMany > 1) {
                        preset.name = preset.name.slice(0, -3) + `(${existsMany})`
                    }
                } while (exists)
                /* end check duplicated name */

                preset.createdAt = timestamp

                const doc = await push(ref(db, 'snippets/' + userId), preset);
                const newPreset = { docId: doc.key, ...preset }
                const newPresets = [newPreset, ...presets]

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
            dispatch({
                type: "SET_DELETE_PRESET_LOADER",
                deletePresetLoader: true
            });

            try {
                await remove(ref(db, 'snippets/' + userId + "/" + docId))

                dispatch({
                    type: "SET_PRESETS",
                    presets
                })

                dispatch({
                    type: "SET_DELETE_PRESET_LOADER",
                    deletePresetLoader: false
                });

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
            dispatch({
                type: "SET_RENAME_PRESET_LOADER",
                renamePresetLoader: true
            });

            try {
                await set(ref(db, 'snippets/' + userId + "/" + docId), updatedPreset);

                dispatch({
                    type: "SET_PRESETS",
                    presets
                })

                dispatch({
                    type: "SET_RENAME_PRESET_LOADER",
                    renamePresetLoader: false
                });

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
            get(child(ref(db), `snippets//${userId}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const presetsObj = snapshot.val()
                    presets = Object.entries(presetsObj).map((obj) => { return { docId: obj[0], ...obj[1] } })

                    /* reverse (last added is first shown) */
                    presets.reverse()

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

export const getDefaultPresets = () => {
    let defaultPresets = []

    return async dispatch => {
        dispatch({
            type: "SET_DEFAULT_PRESET_LOADER",
            defaultPresetLoader: true
        });

        get(child(ref(db), `snippets/featured`)).then((snapshot) => {
            if (snapshot.exists()) {
                const presetsObj = snapshot.val()
                defaultPresets = Object.entries(presetsObj).map((obj) => { return { docId: obj[0], ...obj[1] } })

                /* reverse (last added is first shown) */
                defaultPresets.reverse()

                dispatch({
                    type: "SET_DEFAULT_PRESETS",
                    defaultPresets
                })
            }
        }).catch((e) => {
            console.log("error retrieving from db: ", e);
        }).finally(() => {
            dispatch({
                type: "SET_DEFAULT_PRESET_LOADER",
                defaultPresetLoader: false
            });
        });

    }
}