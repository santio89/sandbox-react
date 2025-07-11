import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModal, setLoadSnippet, setCreateNew } from "../store/actions/modal.action";
import { signInGoogle, signOutUser, updateDisplayName, updateAvatar } from "../store/actions/auth.action";
import { setCodeAll } from "../store/actions/code.action";
import { savePreset, deletePreset, editPreset, setPresetsIndex } from "../store/actions/presets.action";
import { setCurrentSnippet } from "../store/actions/theme.action";
import { toast } from "sonner";
import AnimWrapper from "./AnimWrapper";
import NoAnimWrapper from "./NoAnimWrapper";
import { useNavigate } from "react-router-dom";
import Draggable from "react-draggable";
import { objectEquality } from "../utils/objectEquality"
import { use } from "react";
import Dropdown from "./Dropdown";

export default function Modal({ callbacks }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const html = useSelector(state => state.html.present.html)
    const css = useSelector(state => state.css.present.css)
    const js = useSelector(state => state.js.present.js)
    const defaultPresets = useSelector(state => state.preset.defaultPresets)
    const presets = useSelector(state => state.preset.presets)
    const index = useSelector(state => state.preset.presetsIndex)
    const modalActive = useSelector(state => state.modal.active)
    const loadSnippet = useSelector(state => state.modal.loadSnippet)
    const createNew = useSelector(state => state.modal.createNew)
    const user = useSelector(state => state.auth)
    const authLoader = useSelector(state => state.loader.authLoader)
    const presetLoader = useSelector(state => state.loader.presetLoader)
    const defaultPresetLoader = useSelector(state => state.loader.defaultPresetLoader)
    const renamePresetLoader = useSelector(state => state.loader.renamePresetLoader)
    const deletePresetLoader = useSelector(state => state.loader.deletePresetLoader)
    const displayNameLoader = useSelector(state => state.loader.updateDisplayNameLoader)
    const updateAvatarLoader = useSelector(state => state.loader.updateAvatarLoader)
    const [displayNameMode, setDisplayNameMode] = useState(false)
    const [newDisplayName, setNewDisplayName] = useState(user?.displayName || "")
    const [picUpload, setPicUpload] = useState(null)

    const currentSnippet = useSelector(state => state.theme.currentSnippet)

    const [saveTab, setSaveTab] = useState(currentSnippet ? "current" : "new")

    const [dropdownOpen, setDropdownOpen] = useState(false)

    const { setNewProject } = callbacks;

    const modal = useRef(null)
    const modalDrag = useRef(null)

    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null)
    const [selectedId, setSelectedId] = useState(null);
    const [shareId, setShareId] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [shared, setShared] = useState(false)

    const [savePresetName, setSavePresetName] = useState("");
    const [saved, setSaved] = useState(false)
    const [editName, setEditName] = useState("")
    const [snippetTab, setSnippetTab] = useState(user.userId ? "mySnippets" : "featuredSnippets")
    const [modalOption, setModalOption] = useState("snippets")

    const [dragItem, setDragItem] = useState(null)
    const [dragId, setDragId] = useState(null)

    const exchangeItems = (id1, id2) => {
        const newIndex = [...index]
        const ind1 = newIndex.findIndex(id => id === id1)
        const ind2 = newIndex.findIndex(id => id === id2)
        newIndex[ind1] = id2;
        newIndex[ind2] = id1

        dispatch(setPresetsIndex(newIndex, user.userId))
    }

    // Drag start event handler
    const handleDragStart = (e, id) => {
        setDragItem(e.target)
        setDragId(id)
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', id);
        e.target.style.opacity = '0.5';
    }

    // Drag over event handler
    const handleDragOver = e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        const targetItem = e.target;
        if (targetItem !== dragItem && targetItem.classList.contains('presets__option')) {
            targetItem.style.outline = '2px dashed var(--main-purple)'
        }
    }

    const handleDragLeave = e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const targetItem = e.target;
        if (targetItem !== dragItem && targetItem.classList.contains('presets__option')) {
            targetItem.style.outline = 'none'
        }
    }

    // Drop event handler
    const handleDrop = (e, id) => {
        e.preventDefault();
        const targetItem = e.target;
        if (id !== dragId && targetItem.classList.contains('presets__option')) {
            exchangeItems(id, dragId)
        }

        dragItem.style.opacity = '1'
        targetItem.style.outline = 'none'
        setDragItem(null)
        setDragId(null)
    }

    const handleDragEnd = e => {
        e.preventDefault();
        e.target.style.opacity = '1'
        e.target.style.outline = 'none'
        setDragItem(null);
        setDragId(null)
    }

    const signInWithGoogle = () => {
        dispatch(signInGoogle())
    }

    const signOutCurrentUser = () => {
        dispatch(signOutUser())
    }

    const closeModal = () => {
        dispatch(setModal(false))
    }

    const sendUpdateDisplayName = (newDisplayName) => {
        dispatch(updateDisplayName(user.displayName, newDisplayName))
    }

    const setPreset = (preset) => {
        dispatch(setCodeAll(preset.html, preset.css, preset.js))
        dispatch(setLoadSnippet(true))
        setNewProject(false)
        setLoaded(true)
        dispatch(setCurrentSnippet(preset))

        if (window.location.pathname !== "/") {
            navigate("/")
        }

        toast.message('Snippets', {
            description: `Snippet loaded: ${preset.name}`,
        })
    }

    const deleteSelectedPreset = (name, id) => {
        dispatch(deletePreset(presets, name, id, user.userId))

        if (currentSnippet && currentSnippet.id === id) {
            dispatch(setCurrentSnippet(null))
        }
    }

    const editSelectedPreset = (name, id, newName) => {
        newName = String(newName).trim()
        if (name === newName || newName === "") {
            return
        }

        /* check duplicated name */
        let exists = false;
        let existsMany = 0;
        do {
            exists = presets.some(obj => obj.name === newName);
            if (!exists) continue
            exists && existsMany++

            if (existsMany === 1) {
                newName += `(${existsMany})`
            } else if (existsMany > 1) {
                newName = newName.slice(0, -3) + `(${existsMany})`
            }
        } while (exists)
        /* end check duplicated name */

        dispatch(editPreset(presets, name, id, newName, user.userId))
        if (currentSnippet.id === id) {
            dispatch(setCurrentSnippet({ ...currentSnippet, name: newName }))
        }
    }

    const shareSnippet = (userId, snippetId) => {
        navigator.clipboard.writeText(`https://sandbox--code.vercel.app/shared/${userId}/${snippetId}`);
        setShared(true)
    }

    const noSave = () => {
        setSaved(false)
    }

    const saveNewPreset = (name, html, css, js) => {
        setSaved(true)

        name = String(name).trim()
        if (name === "") {
            return
        }
        const id = window.crypto.randomUUID();

        let trimHtml = html;
        let trimCss = css;
        let trimJs = js;

        /*    while (trimHtml && trimHtml[trimHtml.length - 1] === "\n") {
               trimHtml = trimHtml.slice(0, -1);
           }
           while (trimCss && trimCss[trimCss.length - 1] === "\n") {
               trimCss = trimCss.slice(0, -1);
           }
           while (trimJs && trimJs[trimJs.length - 1] === "\n") {
               trimJs = trimJs.slice(0, -1);
           } */

        /* check duplicated name */
        let exists = false;
        let existsMany = 0;
        do {
            exists = presets.some(obj => obj.name === name);
            if (!exists) continue
            exists && existsMany++

            if (existsMany === 1) {
                name += `(${existsMany})`
            } else if (existsMany > 1) {
                name = name.slice(0, -3) + `(${existsMany})`
            }
        } while (exists)
        /* end check duplicated name */

        const newPreset = { id, userId: user.userId, name, html: trimHtml, css: trimCss, js: trimJs }

        dispatch(savePreset(presets, newPreset, index, user.userId, noSave, true))
        dispatch(setCurrentSnippet(newPreset))
    }

    const saveCurrentPreset = (preset, html, css, js) => {
        let trimHtml = html;
        let trimCss = css;
        let trimJs = js;

        /*      while (trimHtml && trimHtml[trimHtml.length - 1] === "\n") {
                 trimHtml = trimHtml.slice(0, -1);
             }
             while (trimCss && trimCss[trimCss.length - 1] === "\n") {
                 trimCss = trimCss.slice(0, -1);
             }
             while (trimJs && trimJs[trimJs.length - 1] === "\n") {
                 trimJs = trimJs.slice(0, -1);
             } */

        const newPreset = { id: preset.id, userId: preset.userId, name: preset.name, html: trimHtml, css: trimCss, js: trimJs }

        if (objectEquality(preset, newPreset)) {
            return
        } else {
            setSaved(true)
            dispatch(savePreset(presets, newPreset, index, user.userId, noSave, false))
            dispatch(setCurrentSnippet(newPreset))
        }
    }

    const modalTitle = () => {
        switch (modalOption) {
            case "profile":
                return "Profile"
            case "snippets":
                return "Snippets"
            case "saveSnippet":
                return "Save snippet"
            default:
                return "Snippets"
        }
    }

    const modalContent = () => {
        switch (modalOption) {
            case "profile":
                return <>
                    <div className="presets__profile">
                        {user.userId ?
                            <div className="presets__profile__userInfo">
                                <div className="presets__profile__userInfo__data">
                                    <div className="presets__profile__userInfo__data__img">
                                        <input type="file" id="picUpload" name="picUpload" accept="image/png, image/jpeg"
                                            onChange={(e) => {
                                                setPicUpload(e.currentTarget.files[0]);
                                            }} />
                                        <label className="presets__profile__userInfo__data__img__uploadImgLabel" htmlFor="picUpload" title="Upload avatar"><img src={user.avatar} alt="profile image" /></label>
                                        {
                                            updateAvatarLoader ?
                                                <div className="loader"></div>
                                                :
                                                <label htmlFor="picUpload" className="presets__profile__userInfo__data__img__upload" title="Upload avatar">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-upload" viewBox="0 0 16 16">
                                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                                                    </svg>
                                                </label>
                                        }

                                    </div>
                                    <div className="presets__profile__userInfo__data__text">
                                        <div className="presets__profile__userInfo__data__text__line">
                                            <span>• </span>
                                            {displayNameMode ?
                                                <form id="updateDisplayName" onSubmit={(e) => {
                                                    e.preventDefault();
                                                    newDisplayName.trim() !== user.displayName && newDisplayName.trim() !== "" && sendUpdateDisplayName(newDisplayName.trim())
                                                }}>
                                                    <input spellCheck="false" maxLength={56} value={newDisplayName} type="text" onChange={(e) => setNewDisplayName(e.target.value)} />
                                                </form>
                                                :
                                                <span>{user.displayName}</span>
                                            }
                                            <span className="presets__profile__userInfo__data__text__line__btnContainer">
                                                {displayNameMode && !displayNameLoader ?
                                                    (
                                                        <>
                                                            <button onClick={() => { setDisplayNameMode(false), setNewDisplayName("") }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-x-lg" viewBox="0 0 16 16">
                                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                                                </svg>
                                                            </button>
                                                            <button form="updateDisplayName" disabled={newDisplayName.trim() === user.displayName || newDisplayName.trim() === ""}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-check-lg" viewBox="0 0 16 16">
                                                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                                                </svg>
                                                            </button>
                                                        </>
                                                    )
                                                    :
                                                    (displayNameLoader ? <div className="loader">Loading...</div>
                                                        : <button title="Rename user" className="editName" onClick={() => setDisplayNameMode(true)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi-pencil-fill" viewBox="0 0 16 16">
                                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                            </svg>
                                                        </button>
                                                    )
                                                }

                                            </span>
                                        </div>
                                        <div className="presets__profile__userInfo__data__text__line">
                                            <span>• </span><span>{user.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="presets__tabs">
                                    <button className={`presets__tabs__btn `} onClick={() => { signOutCurrentUser() }}>Sign out</button>
                                </div>
                            </div>
                            :
                            (authLoader ?
                                <div className="loader">Loading...</div>
                                :
                                <div className="presets__profile__googleSignIn">
                                    <button className="presets__profile__googleBtn" onClick={() => { signInWithGoogle() }}>
                                        <span>Sign in with Google</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi-google" viewBox="0 0 16 16">
                                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                        </svg>
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </>
            case "snippets":
                switch (snippetTab) {
                    case 'mySnippets':
                        return <AnimWrapper>
                            {
                                (user.userId ?
                                    (presetLoader ? <div className="loader">Loading...</div>
                                        :
                                        (presets?.length > 0 ?
                                            (presets?.map(preset => {
                                                return (
                                                    <div draggable onDragStart={(e) => handleDragStart(e, preset.id)} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, preset.id)} onDragEnd={handleDragEnd} className={`presets__option ${dragItem && "dragged"}`} key={preset.id} >
                                                        {
                                                            dropdownOpen === preset.id &&
                                                            <Dropdown dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} direction="column" anchor="right">
                                                                <button className="dropdownBtn presets__option__main__share" onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setShareId(preset.id);
                                                                    shareSnippet(user.userId, preset.id);
                                                                    setDropdownOpen(false);
                                                                }} title="Share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi-share-fill" viewBox="0 0 16 16">
                                                                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                                                                    </svg>
                                                                </button>
                                                                <button className="dropdownBtn presets__option__main__edit" onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setEditId(preset.id);
                                                                    setEditName("");
                                                                    setDeleteId(null);
                                                                    setSelectedId(null);
                                                                    setShareId(null);
                                                                    setDropdownOpen(false);
                                                                }} title="Rename snippet">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi-pencil-fill" viewBox="0 0 16 16">
                                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                                    </svg>
                                                                </button>
                                                                <button className="dropdownBtn presets__option__main__del" onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setDeleteId(preset.id);
                                                                    setEditId(null);
                                                                    setSelectedId(null);
                                                                    setEditName("");
                                                                    setShareId(null);
                                                                    setDropdownOpen(false);
                                                                }} title="Delete snippet">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-trash-fill" viewBox="0 0 16 16">
                                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                                    </svg>
                                                                </button>
                                                            </Dropdown>
                                                        }
                                                        {
                                                            selectedId === preset.id && !loaded ?
                                                                <span className="presets__option__confirm" onClick={e => e.stopPropagation()}>
                                                                    <span>Load snippet?</span>
                                                                    <span className="presets__option__confirm__buttons">
                                                                        <button onClick={(e) => { e.stopPropagation(); setPreset(preset) }}>Yes</button>
                                                                        <button onClick={(e) => { e.stopPropagation(); setSelectedId(null) }}>No</button>
                                                                    </span>
                                                                </span>
                                                                :
                                                                (selectedId === preset.id && loaded ?
                                                                    <span className="presets__option__confirm" onClick={e => e.stopPropagation()}>
                                                                        <span>Snippet loaded!</span>
                                                                    </span>
                                                                    :
                                                                    editId === preset.id && !renamePresetLoader ?
                                                                        (
                                                                            <span className="presets__option__confirm" onClick={e => e.stopPropagation()}>
                                                                                <span>Rename?</span>
                                                                                <form onSubmit={(e) => { e.preventDefault(); editSelectedPreset(preset.name, preset.id, editName) }}>
                                                                                    <input spellCheck={false} type="text" value={editName} onChange={e => { setEditName(e.target.value) }} maxLength={28} placeholder="NEW NAME" />
                                                                                    <span className="presets__option__confirm__buttons">
                                                                                        <button onClick={(e) => { e.stopPropagation(); editSelectedPreset(preset.name, preset.id, editName) }}>Yes</button>
                                                                                        <button onClick={(e) => { e.stopPropagation(); setEditId(null) }}>No</button>
                                                                                    </span>
                                                                                </form>
                                                                            </span>
                                                                        ) :
                                                                        (editId === preset.id && renamePresetLoader ?
                                                                            <div className="loader">Loading...</div> :
                                                                            (deleteId === preset.id && !deletePresetLoader ?
                                                                                <span className="presets__option__confirm" onClick={e => e.stopPropagation()}>
                                                                                    <span>Delete?</span>
                                                                                    <span className="presets__option__confirm__buttons">
                                                                                        <button onClick={(e) => { e.stopPropagation(); deleteSelectedPreset(preset.name, preset.id) }}>Yes</button>
                                                                                        <button onClick={(e) => { e.stopPropagation(); setDeleteId(null) }}>No</button>
                                                                                    </span>
                                                                                </span> :
                                                                                (deleteId === preset.id && deletePresetLoader ?
                                                                                    <div className="loader">Loading...</div> :
                                                                                    (shareId === preset.id && shared ?
                                                                                        <span className="presets__option__confirm" onClick={e => e.stopPropagation()}>
                                                                                            <span>Share link copied to clipboard!</span>
                                                                                        </span>
                                                                                        :
                                                                                        < span className="presets__option__main">
                                                                                            <span className="presets__option__main__buttons topRight">
                                                                                                <button className={`dropdownBtn presets__option__main__open ${dropdownOpen === preset.id && "active"}`} onClick={() => {
                                                                                                    setDropdownOpen(preset.id);
                                                                                                    setSelectedId(null);
                                                                                                    setEditId(null);
                                                                                                    setDeleteId(null);
                                                                                                }} title="Open dropdown">
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                                                                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                                                                                    </svg>
                                                                                                </button>
                                                                                            </span>
                                                                                            <span className="presets__option__main__name" tabIndex={0} role="button" disabled={loaded || saved} onClick={() => {
                                                                                                setEditName("");
                                                                                                setEditId(null);
                                                                                                setDeleteId(null);
                                                                                                setSelectedId(preset.id)
                                                                                            }} onKeyDown={(e) => {
                                                                                                if (e.key.toUpperCase() === "ENTER" || e.key === " ") {
                                                                                                    setEditName("");
                                                                                                    setEditId(null);
                                                                                                    setDeleteId(null);
                                                                                                    setSelectedId(preset.id)
                                                                                                }
                                                                                            }} title="Load snippet"><span>{preset.name}</span></span>
                                                                                        </span>
                                                                                    )
                                                                                )
                                                                            )
                                                                        )
                                                                )
                                                        }
                                                    </div>
                                                )
                                            })) :
                                            <div className="presets__noSnippet">No snippets saved</div>)

                                    ) :
                                    <div className="presets__noSnippet" role="button" onClick={() => setModalOption("profile")}>Sign in to see your snippets</div>
                                )
                            }
                        </AnimWrapper >
                    case 'featuredSnippets':
                        return <AnimWrapper>
                            {
                                defaultPresetLoader ? <div className="loader">Loading...</div> :
                                    (defaultPresets?.length > 0 ?
                                        (defaultPresets?.map(preset => {
                                            return (
                                                <div className="presets__option" key={preset.id}>
                                                    {
                                                        selectedId === preset.id && !loaded ?
                                                            <span className="presets__option__confirm" onClick={e => e.stopPropagation()}>
                                                                <span>Load snippet?</span>
                                                                <span className="presets__option__confirm__buttons">
                                                                    <button onClick={(e) => { e.stopPropagation(); setPreset(preset) }}>Yes</button>
                                                                    <button onClick={(e) => { e.stopPropagation(); setSelectedId(null) }}>No</button>
                                                                </span>
                                                            </span>
                                                            :
                                                            (selectedId === preset.id && loaded ?
                                                                <span className="presets__option__confirm" onClick={e => e.stopPropagation()}>
                                                                    <span>Snippet loaded!</span>
                                                                </span>
                                                                :
                                                                (shareId === preset.id && shared ?
                                                                    <span className="presets__option__confirm" onClick={e => e.stopPropagation()}>
                                                                        <span>Share link copied to clipboard!</span>
                                                                    </span> :
                                                                    <span className="presets__option__main">
                                                                        <span className="presets__option__main__buttons">
                                                                            <button className="presets__option__main__share" onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setShareId(preset.id);
                                                                                shareSnippet("featured", preset.id)
                                                                            }} title="Share">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi-share-fill" viewBox="0 0 16 16">
                                                                                    <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                                                                                </svg>
                                                                            </button>
                                                                            <span className="presets__option__main__feat" title={`Featured: ${preset.featName}`}>ft. {preset.featName}</span>
                                                                        </span>
                                                                        <span className="presets__option__main__name" tabIndex={0} role="button" disabled={loaded || renamePresetLoader || shared || saved || deletePresetLoader} onClick={() => {
                                                                            setEditName("");
                                                                            setEditId(null);
                                                                            setDeleteId(null);
                                                                            setSelectedId(preset.id);
                                                                        }} onKeyDown={(e) => {
                                                                            if (e.key.toUpperCase() === "ENTER" || e.key === " ") {
                                                                                setEditName("");
                                                                                setEditId(null);
                                                                                setDeleteId(null);
                                                                                setSelectedId(preset.id)
                                                                            }
                                                                        }} title="Load snippet">
                                                                            <span>{preset.name}</span>
                                                                        </span>
                                                                    </span>
                                                                )
                                                            )
                                                    }
                                                </div>
                                            )
                                        })) :
                                        <div className="presets__noSnippet">No featured snippets saved</div>)
                            }
                        </AnimWrapper>
                }
                break;
            case "saveSnippet":
                return <NoAnimWrapper>
                    <div className="presets__save">
                        {user.userId ?
                            <>
                                <div className="save-tabs">
                                    <button onClick={() => setSaveTab("current")} data-active={saveTab === "current"} disabled={!currentSnippet?.id}>Current</button>
                                    <button onClick={() => setSaveTab("new")} data-active={saveTab === "new"}>New</button>
                                </div>
                                {
                                    saveTab === "current" ?
                                        <form onSubmit={(e) => { e.preventDefault(); saveCurrentPreset(currentSnippet, html, css, js) }}>
                                            <input spellCheck="false" type="text" placeholder="SNIPPET NAME" value={currentSnippet?.name} disabled />
                                            <button disabled={!currentSnippet?.id || currentSnippet?.userId != user.userId || defaultPresets.some((defaultPreset) => defaultPreset.id === currentSnippet?.id)} data-saved={saved ? 'saving...' : ''}>Save current</button>
                                        </form> :
                                        <form onSubmit={(e) => { e.preventDefault(); saveNewPreset(savePresetName, html, css, js) }}>
                                            <input spellCheck="false" type="text" placeholder="SNIPPET NAME" value={savePresetName} onChange={e => { setSavePresetName(e.target.value) }} maxLength={28} />
                                            <button disabled={savePresetName.trim() === ""} data-saved={saved ? 'saving...' : ''}>Save new</button>
                                        </form>
                                }
                            </>

                            :
                            <div role="button" onClick={() => setModalOption("profile")} className="presets__noSnippet">Sign in to save your snippets</div>}
                    </div>
                </NoAnimWrapper>
        }
    }

    useEffect(() => {
        const closeModalClick = (e) => {
            if (modalActive && e.target.className == "main__modal") {
                e.preventDefault();
                closeModal()
            }
        }

        if (modalActive) {
            setModalOption("snippets")
            setSnippetTab(user.userId ? "mySnippets" : "featuredSnippets")
            setSaveTab(currentSnippet?.id ? "current" : "new")
            setSelectedId(null)
            setDeleteId(null)
            setEditId(null)
            setSavePresetName("")
            setDragItem(null)
            setDragId(null)

            try {
                document.startViewTransition(() => {
                    modal.current.show()
                });
            } catch {
                modal.current.show()
            }

            document.body.addEventListener("click", closeModalClick)
        } else {
            try {
                document.startViewTransition(() => {
                    modal.current.close()
                });
            } catch {
                modal.current.close()
            }

            document.body.removeEventListener("click", closeModalClick)
        }

        return () => { document.body.removeEventListener("click", closeModalClick) }

    }, [modalActive])

    useEffect(() => {
        setDropdownOpen(false)
        setSelectedId(null)
        setDeleteId(null)
        setEditId(null)
        setDragItem(null)
        setDragId(null)
    }, [snippetTab])

    useEffect(() => {
        savePresetName !== "" && setSavePresetName("")
    }, [saveTab])

    useEffect(() => {
        let timeout = null;
        if (loaded) {
            timeout = setTimeout(() => {
                setLoaded(false)
                setSelectedId(null)
            }, 1000)
        }

        return () => { clearTimeout(timeout) }
    }, [loaded])

    useEffect(() => {
        !renamePresetLoader && setEditId(null)
    }, [renamePresetLoader])

    useEffect(() => {
        !deletePresetLoader && setDeleteId(null)
    }, [deletePresetLoader])

    useEffect(() => {
        let timeout = null;
        if (shared) {
            timeout = setTimeout(() => {
                setShared(false)
                setShareId(null)
            }, 1000)
        }

        return () => { clearTimeout(timeout) }
    }, [shared])

    useEffect(() => {
        setDropdownOpen(false)
        setSelectedId(null)
        setDeleteId(null)
        setEditId(null)
        setDisplayNameMode(false)
        setPicUpload(null)
        setSavePresetName("")
        setSaveTab(currentSnippet?.id ? "current" : "new")
        setDragItem(null)
        setDragId(null)

        if (modalOption === "saveSnippet") {
            setSaveTab(currentSnippet?.id ? "current" : "new")
        }
    }, [modalOption])

    useEffect(() => {
        currentSnippet && setSaveTab(currentSnippet?.id ? "current" : "new")
    }, [currentSnippet])

    useEffect(() => {
        loadSnippet && dispatch(setLoadSnippet(false))
    }, [loadSnippet])

    useEffect(() => {
        createNew && dispatch(setCurrentSnippet(null))
        createNew && dispatch(setCreateNew(false))
    }, [createNew])

    useEffect(() => {
        displayNameMode && setNewDisplayName(user?.displayName || "")
        !displayNameMode && setNewDisplayName("");
    }, [displayNameMode])

    useEffect(() => {
        !displayNameLoader && setDisplayNameMode(false)
    }, [displayNameLoader])

    useEffect(() => {
        !picUpload && setPicUpload(null)
    }, [updateAvatarLoader])

    useEffect(() => {
        picUpload && dispatch(updateAvatar(user.userId, picUpload))
    }, [picUpload])

    useEffect(() => {
        function mapOrder(presets, order, key) {
            const array = [...presets]
            array.sort(function (a, b) {
                const A = a[key]
                const B = b[key];

                if (order.indexOf(A) > order.indexOf(B)) {
                    return 1;
                } else {
                    return -1;
                }

            });

            return array;
        }

        const orderedPresets = mapOrder(presets, index, 'id');
        dispatch({
            type: "SET_PRESETS",
            presets: orderedPresets
        })

    }, [index])


    return (
        <dialog className="main__modal" ref={modal}>
            <Draggable nodeRef={modalDrag} handle=".main__modal__header" bounds={"parent"} cancel="button">
                <div ref={modalDrag} className="main__modal__inner">
                    <div className="main__modal__header">
                        <span>{modalTitle()}</span>
                        <div className="main__modal__header__buttons">
                            <button className={`${modalOption === "snippets" && "modalOptionActive"}`} onClick={() => { setModalOption("snippets") }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-stickies-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5A1.5 1.5 0 0 0 0 1.5z" />
                                    <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177V10.5z" />
                                </svg>
                            </button>
                            <button className={`${modalOption === "saveSnippet" && "modalOptionActive"}`} onClick={() => { setModalOption("saveSnippet") }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-floppy-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
                                    <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
                                </svg>
                            </button>
                            <button className={`${modalOption === "profile" && "modalOptionActive"}`} onClick={() => { setModalOption("profile") }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                </svg>
                            </button>
                            <button className="modalClose" onClick={() => { closeModal() }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="main__modal__content">
                        <div className="main__modal__content__innerWrapper">
                            {modalOption === "snippets" &&
                                <>
                                    <div className="presets__tabs">
                                        <button className={`presets__tabs__btn ${snippetTab === "mySnippets" && "presets__tabs__btn--active"}`} onClick={() => { setSnippetTab("mySnippets") }}>My snippets</button>
                                        <button className={`presets__tabs__btn ${snippetTab === "featuredSnippets" && "presets__tabs__btn--active"}`} onClick={() => { setSnippetTab("featuredSnippets") }}>Featured snippets</button>
                                    </div>
                                </>
                            }
                            {modalContent()}
                        </div>
                    </div>
                </div>
            </Draggable>
        </dialog>
    )
}
