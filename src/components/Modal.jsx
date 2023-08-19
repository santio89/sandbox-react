import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModal, setLoadSnippet } from "../store/actions/modal.action";
import { setCodeAll } from "../store/actions/code.action";
import { savePreset, deletePreset, editPreset } from "../store/actions/presets.action";
import { v4 as uuidv4 } from 'uuid';

export default function Modal({ callbacks }) {
    const dispatch = useDispatch();
    const html = useSelector(state => state.html.present.html)
    const css = useSelector(state => state.css.present.css)
    const js = useSelector(state => state.js.present.js)
    const presets = useSelector(state => state.preset.presets)
    const defaultPresets = useSelector(state => state.preset.defaultPresets)
    const modalActive = useSelector(state => state.modal.active)

    const { setNewProject } = callbacks;

    const modal = useRef()

    const [saveMode, setSaveMode] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null)
    const [selectedId, setSelectedId] = useState(null);
    const [loaded, setLoaded] = useState(false)

    const [savePresetName, setSavePresetName] = useState("");
    const [saved, setSaved] = useState(false)
    const [editName, setEditName] = useState("")
    const [snippetTab, setSnippetTab] = useState(true)

    const closeModal = () => {
        dispatch(setModal(false))
    }

    const toggleSave = () => {
        if (saveMode) {
            setSavePresetName("");
        }
        setSaveMode(saveMode => !saveMode)
    }

    const setPreset = (html, css, js) => {
        dispatch(setCodeAll(html, css, js))
        dispatch(setLoadSnippet(true))
        setLoaded(true)
        setNewProject(false)
    }

    const deleteSelectedPreset = (id) => {
        dispatch(deletePreset(presets, id))
        setDeleteId(null)
    }

    const editSelectedPreset = (id, newName) => {
        dispatch(editPreset(presets, id, newName))
        setEditId(null)
    }

    const saveNewPreset = (name, html, css, js) => {
        name = name.trim()
        if (name === "") {
            return
        }
        const id = uuidv4();

        let trimHtml = html;
        let trimCss = css;
        let trimJs = js;

        while (trimHtml && trimHtml[trimHtml.length - 1] === "\n") {
            trimHtml = trimHtml.slice(0, -1);
        }
        while (trimCss && trimCss[trimCss.length - 1] === "\n") {
            trimCss = trimCss.slice(0, -1);
        }
        while (trimJs && trimJs[trimJs.length - 1] === "\n") {
            trimJs = trimJs.slice(0, -1);
        }

        dispatch(savePreset(presets, { id, name, html: trimHtml, css: trimCss, js: trimJs }))
        setSavePresetName("")
        setSaved(true)
    }

    useEffect(() => {
        setSaveMode(false)
        setSnippetTab(true)
        setSelectedId(null)
        setDeleteId(null)
        setEditId(null)
        setSavePresetName("")

        const closeModalEsc = (e) => {
            if (e.key.toUpperCase() === "ESCAPE") {
                e.preventDefault();
                closeModal()
            }
        }

        const closeModalClick = (e) => {
            if (modalActive && e.target.className == "main__modal") {
                e.preventDefault();
                closeModal()
            }
        }

        if (modalActive) {
            modal.current.showModal()
            document.body.addEventListener("keydown", closeModalEsc)
            document.body.addEventListener("click", closeModalClick)
        } else {
            modal.current.close()
            document.body.removeEventListener("keydown", closeModalEsc)
            document.body.removeEventListener("click", closeModalClick)
        }

        return () => { document.body.removeEventListener("keydown", closeModalEsc); document.body.removeEventListener("click", closeModalClick) }

    }, [modalActive])

    useEffect(() => {
        if (editId === null) {
            setEditName("")
        }
    }, [editId])

    useEffect(() => {
        let timeout = null;
        if (saved) {
            timeout = setTimeout(() => {
                setSaved(false)
            }, 1000)
        }

        return () => { clearTimeout(timeout) }

    }, [saved])

    useEffect(() => {
        let timeout = null;
        if (loaded) {
            timeout = setTimeout(() => {
                setLoaded(false)
                setSelectedId(null)
            }, 1000)
        } else {
            dispatch(setLoadSnippet(false))
        }

        return () => { clearTimeout(timeout) }

    }, [loaded])

    useEffect(() => {
        setSelectedId(null)
        setDeleteId(null)
        setEditId(null)
    }, [saveMode])


    return (
        <dialog className="main__modal" ref={modal}>
            <div className="main__modal__inner">
                <div className="main__modal__header">
                    {saveMode ? <span>Save snippet</span> : <span>Snippets</span>}
                    <div className="main__modal__header__buttons">
                        <button onClick={() => { toggleSave() }} disabled={!saveMode}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-caret-left-fill" viewBox="0 0 16 16">
                                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                            </svg>

                        </button>
                        <button onClick={() => { toggleSave() }} disabled={saveMode}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-caret-right-fill" viewBox="0 0 16 16">
                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                            </svg>
                        </button>
                        <button onClick={() => { closeModal() }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {
                    saveMode ?
                        <div className="presets">
                            <div className="presets__save">
                                <form onSubmit={(e) => { e.preventDefault(); saveNewPreset(savePresetName, html, css, js) }}>
                                    <input type="text" placeholder="SNIPPET NAME" value={savePresetName} onChange={e => { setSavePresetName(e.target.value) }} maxLength={30} />
                                    <button disabled={savePresetName.trim() === ""} data-saved={saved ? 'saved!' : ''}>Save</button>
                                </form>
                            </div>
                        </div> :
                        <div className="presets">
                            {
                                snippetTab === true ?
                                    (presets?.length > 0 ?
                                        (presets?.map(preset => {
                                            return (
                                                <button disabled={loaded || saved} className="presets__option" key={preset.id} onClick={() => { setSelectedId(preset.id) }} >
                                                    {
                                                        selectedId === preset.id && !loaded ?
                                                            <span className="presets__option__confirm" onClick={e => e.stopPropagation()}>
                                                                <span>Load snippet?</span>
                                                                <span className="presets__option__confirm__buttons">
                                                                    <span onClick={(e) => { e.stopPropagation(); setPreset(preset.html, preset.css, preset.js) }}>Yes</span>
                                                                    <span onClick={(e) => { e.stopPropagation(); setSelectedId(null) }}>No</span>
                                                                </span>
                                                            </span>
                                                            :
                                                            (selectedId === preset.id && loaded ?
                                                                <span className="presets__option__confirm" onClick={e => e.stopPropagation()}>
                                                                    <span>Snippet loaded!</span>
                                                                </span>
                                                                :
                                                                editId === preset.id ?
                                                                    (
                                                                        <span className="presets__option__confirm" onClick={e => e.stopPropagation()}>
                                                                            <span>Rename snippet?</span>
                                                                            <form onSubmit={(e) => { e.preventDefault(); editSelectedPreset(preset.id, editName) }}>
                                                                                <input type="text" value={editName} onChange={e => setEditName(e.target.value)} placeholder="NEW NAME" />
                                                                                <span className="presets__option__confirm__buttons">
                                                                                    <span onClick={(e) => { e.stopPropagation(); editSelectedPreset(preset.id, editName) }}>Yes</span>
                                                                                    <span onClick={(e) => { e.stopPropagation(); setEditId(null) }}>No</span>
                                                                                </span>
                                                                            </form>
                                                                        </span>
                                                                    ) :
                                                                    (deleteId === preset.id ?
                                                                        <span className="presets__option__confirm" onClick={e => e.stopPropagation()}>
                                                                            <span>Delete snippet?</span>
                                                                            <span className="presets__option__confirm__buttons">
                                                                                <span onClick={(e) => { e.stopPropagation(); deleteSelectedPreset(preset.id) }}>Yes</span>
                                                                                <span onClick={(e) => { e.stopPropagation(); setDeleteId(null) }}>No</span>
                                                                            </span>
                                                                        </span> :
                                                                        <span className="presets__option__main">
                                                                            <span className="presets__option__main__name">{preset.name}</span>
                                                                            <span className="presets__option__main__edit" onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setEditId(preset.id)
                                                                            }}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi-pencil-fill" viewBox="0 0 16 16">
                                                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                                                </svg>
                                                                            </span>
                                                                            <span className="presets__option__main__del" onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setDeleteId(preset.id)
                                                                            }}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi-trash-fill" viewBox="0 0 16 16">
                                                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                                                </svg>
                                                                            </span>
                                                                        </span>
                                                                    )
                                                            )
                                                    }
                                                </button>
                                            )
                                        })) :
                                        <div className="presets__noSnippet">No snippets saved</div>) :
                                    (defaultPresets?.length > 0 ?
                                        (defaultPresets?.map(preset => {
                                            return (
                                                <button disabled={loaded || saved} className="presets__option" key={preset.id} onClick={() => { setSelectedId(preset.id) }} >
                                                    {
                                                        selectedId === preset.id && !loaded ?
                                                            <span className="presets__option__confirm" onClick={e => e.stopPropagation()}>
                                                                <span>Load snippet?</span>
                                                                <span className="presets__option__confirm__buttons">
                                                                    <span onClick={(e) => { e.stopPropagation(); setPreset(preset.html, preset.css, preset.js) }}>Yes</span>
                                                                    <span onClick={(e) => { e.stopPropagation(); setSelectedId(null) }}>No</span>
                                                                </span>
                                                            </span>
                                                            :
                                                            (selectedId === preset.id && loaded ?
                                                                <span className="presets__option__confirm" onClick={e => e.stopPropagation()}>
                                                                    <span>Snippet loaded!</span>
                                                                </span>
                                                                :
                                                                <span className="presets__option__main">
                                                                    <span className="presets__option__main__name">{preset.name}</span>
                                                                </span>
                                                            )
                                                    }
                                                </button>
                                            )
                                        })) :
                                        <div className="presets__noSnippet">No featured snippets saved</div>)

                            }
                            <div className="presets__tabs">
                                <button className={`presets__tabs__btn ${snippetTab === true && "presets__tabs__btn--active"}`} onClick={() => { setSnippetTab(true) }}>My snippets</button>
                                <button className={`presets__tabs__btn ${snippetTab === false && "presets__tabs__btn--active"}`} onClick={() => { setSnippetTab(false) }}>Featured snippets</button>
                            </div>
                        </div>
                }
            </div>
        </dialog>
    )
}
