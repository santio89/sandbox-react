import { firebaseDb as db, timestamp } from "../../config/firebase"
import { ref, set, push, child, get, remove } from "firebase/database";
import { toast } from "sonner";

export const savePreset = (presets, preset, index, userId = null, callback, isNew = true) => {

    return async dispatch => {
        if (userId) {
            try {

                const customRef = ref(db, 'snippets/' + userId + '/' + preset.id);
                await set(customRef, preset);


                let newPresets = []

                if (isNew) {
                    preset.createdAt = timestamp
                    const newPreset = { ...preset }

                    newPresets = [newPreset, ...presets]
                    /* save index file */
                    dispatch(setPresetsIndex(index, userId, preset.id))
                } else {
                    preset.updatedAt = timestamp
                    const newPreset = { ...preset }

                    const ind = presets.findIndex(oldPreset => oldPreset.id === preset.id);
                    presets[ind] = newPreset
                    newPresets = [...presets]
                }

                dispatch({
                    type: "SET_PRESETS",
                    presets: newPresets
                })
                callback()
                toast.message('Snippets', {
                    description: `Snippet saved: ${preset.name}`,
                })
            } catch (e) {
                callback()
                console.log("error saving to db: ", e)
                toast.error('Error saving snippet')
            }
        } else {
            toast.error('Sign in')
        }
    }
}

export const deletePreset = (presets, name, id, userId = null) => {
    const index = presets.findIndex(preset => preset.id === id);
    presets.splice(index, 1)

    return async dispatch => {

        if (userId) {
            dispatch({
                type: "SET_DELETE_PRESET_LOADER",
                deletePresetLoader: true
            });

            try {
                await remove(ref(db, 'snippets/' + userId + "/" + id))

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
                dispatch({
                    type: "SET_DELETE_PRESET_LOADER",
                    deletePresetLoader: false
                });
                console.log("error saving to db: ", e)
                toast.error('Error deleting snippet')
            }
        } else {
            toast.error('Sign in')
        }
    }
}

export const editPreset = (presets, name, id, newName, userId = null) => {
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
                updatedPreset.updatedAt = timestamp;
                await set(ref(db, 'snippets/' + userId + "/" + id), updatedPreset);

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
                dispatch({
                    type: "SET_RENAME_PRESET_LOADER",
                    renamePresetLoader: false
                });
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
    let index = []

    return async dispatch => {
        dispatch({
            type: "SET_PRESET_LOADER",
            presetLoader: true
        });

        if (userId) {
            /* get presets */
            get(child(ref(db), `snippets/${userId}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const presetsObj = snapshot.val()

                    presets = Object.entries(presetsObj).map((obj) => { return { ...obj[1] } })

                    /* reverse (last added is first shown) */
                    presets.reverse()
                }
            }).catch((e) => {
                console.log("error retrieving from db: ", e);
            })

            /* get index */
            get(child(ref(db), `snippets/index/${userId}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    index = snapshot.val()
                } else {
                    /* generate index */
                    index = presets.map(preset => preset.id)
                }
            }).catch((e) => {
                console.log("error retrieving from db: ", e);
            }).finally(() => {
                /* after fetching, dispatch */
                dispatch({
                    type: "SET_PRESETS",
                    presets
                })
                dispatch({
                    type: "SET_PRESETS_INDEX",
                    presetsIndex: index
                })
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
                defaultPresets = Object.entries(presetsObj).map((obj) => { return { ...obj[1] } })

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

export const setPresetsIndex = (index, userId = null, presetId = null) => {
    return async dispatch => {
        if (userId) {
            let newIndex = [...index]
            if (presetId) {
                newIndex = [...index, presetId]
            }

            try {
                /* dispatch first (instant feedback) */
                dispatch({
                    type: "SET_PRESETS_INDEX",
                    presetsIndex: newIndex
                })
                /* save index file */
                await set(ref(db, 'snippets/index/' + userId), newIndex)
            } catch {
                console.log("error saving index")
            }
        } else {
            toast.error("Sign in")
        }
    }
}