import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModal, setLoadSnippet } from "../store/actions/modal.action";
import { signInGoogle, signOutUser } from "../store/actions/auth.action";
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
    const user = useSelector(state => state.auth)
    const authLoader = useSelector(state => state.loader.authLoader)
    const presetLoader = useSelector(state => state.loader.presetLoader)

    const { setNewProject } = callbacks;

    const modal = useRef()

    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null)
    const [selectedId, setSelectedId] = useState(null);
    const [loaded, setLoaded] = useState(false)

    const [savePresetName, setSavePresetName] = useState("");
    const [saved, setSaved] = useState(false)
    const [editName, setEditName] = useState("")
    const [snippetTab, setSnippetTab] = useState(user.userId ? "mySnippets" : "featuredSnippets")
    const [modalOption, setModalOption] = useState("snippets")

    const signInWithGoogle = () => {
        dispatch(signInGoogle())
    }

    const signOutCurrentUser = () => {
        dispatch(signOutUser())
    }

    const closeModal = () => {
        dispatch(setModal(false))
    }

    const setPreset = (html, css, js) => {
        dispatch(setCodeAll(html, css, js))
        dispatch(setLoadSnippet(true))
        setLoaded(true)
        setNewProject(false)
    }

    const deleteSelectedPreset = (id) => {
        dispatch(deletePreset(presets, id, user.userId))
        setDeleteId(null)
    }

    const editSelectedPreset = (id, newName) => {
        const trimNewName = String(newName).trim()
        if (trimNewName === "") return
        dispatch(editPreset(presets, id, newName, user.userId))
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

        dispatch(savePreset(presets, { id, name, html: trimHtml, css: trimCss, js: trimJs }, user.userId))
        setSavePresetName("")
        setSaved(true)
    }

    const modalTitle = () => {
        switch (modalOption) {
            case "profile":
                return "Profile"
            case "snippets":
                return "Snippets"
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
                                        <img src={user.avatar} alt="profile image" />
                                    </div>
                                    <div className="presets__profile__userInfo__data__text">
                                        <div className="presets__profile__userInfo__data__text__line">
                                            <span>• </span><span>{user.displayName}</span>
                                        </div>
                                        <div className="presets__profile__userInfo__data__text__line">
                                            <span>• </span><span>{user.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="presets__profile__userInfo__data presets__profile__userInfo__data__signOut" onClick={() => { signOutCurrentUser() }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-box-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                    </svg>
                                    <span>Sign out</span>
                                </button>
                            </div>
                            :
                            (authLoader ?
                                <div className="loader">Loading...</div>
                                :
                                <button className="presets__profile__googleBtn" onClick={() => { signInWithGoogle() }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi-google" viewBox="0 0 16 16">
                                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                    </svg>
                                    <span>Sign in with Google</span>
                                </button>
                            )
                        }

                    </div>
                </>
            case "snippets":
                switch (snippetTab) {
                    case 'mySnippets':
                        return <>
                            {
                                (user.userId ?
                                    (presetLoader ? <div className="loader">Loading...</div>
                                        :
                                        (presets?.length > 0 ?
                                            (presets?.map(preset => {
                                                return (
                                                    <button disabled={loaded || saved} className="presets__option" key={preset.id} onClick={() => {
                                                        setEditName("");
                                                        setEditId(null);
                                                        setDeleteId(null);
                                                        setSelectedId(preset.id);
                                                        setSelectedId(preset.id)
                                                    }} >
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
                                                                                    <input type="text" value={editName} onChange={e => { setEditName(e.target.value) }} onKeyUp={(e) => e.stopPropagation()} placeholder="NEW NAME" />
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
                                                                                    setEditId(preset.id);
                                                                                    setEditName("");
                                                                                    setDeleteId(null);
                                                                                    setSelectedId(null)
                                                                                }}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi-pencil-fill" viewBox="0 0 16 16">
                                                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                                                    </svg>
                                                                                </span>
                                                                                <span className="presets__option__main__del" onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    setDeleteId(preset.id);
                                                                                    setEditId(null);
                                                                                    setSelectedId(null);
                                                                                    setEditName("")
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
                                            <div className="presets__noSnippet">No snippets saved</div>)

                                    ) :
                                    <div className="presets__noSnippet" role="button" onClick={() => setModalOption("profile")}>Sign in to see your snippets</div>
                                )
                            }
                        </>
                    case 'featuredSnippets':
                        return <>
                            {
                                (defaultPresets?.length > 0 ?
                                    (defaultPresets?.map(preset => {
                                        return (
                                            <button disabled={loaded || saved} className="presets__option" key={preset.id} onClick={() => {
                                                setEditName("");
                                                setEditId(null);
                                                setDeleteId(null);
                                                setSelectedId(preset.id)
                                            }} >
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
                        </>
                    case 'saveSnippet':
                        return <>
                            <div className="presets__save">
                                {user.userId ?
                                    <form onSubmit={(e) => { e.preventDefault(); saveNewPreset(savePresetName, html, css, js) }}>
                                        <input type="text" placeholder="SNIPPET NAME" value={savePresetName} onChange={e => { setSavePresetName(e.target.value) }} maxLength={30} />
                                        <button disabled={savePresetName.trim() === ""} data-saved={saved ? 'saved!' : ''}>Save</button>
                                    </form>
                                    :
                                    <div role="button" onClick={() => setModalOption("profile")} className="presets__noSnippet">Sign in to save your snippets</div>}
                            </div>
                        </>
                }
        }
    }

    useEffect(() => {
        setModalOption("snippets")
        setSnippetTab(user.userId ? "mySnippets" : "featuredSnippets")
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
        setSelectedId(null)
        setDeleteId(null)
        setEditId(null)
        setSavePresetName("")
    }, [snippetTab])

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
        setSavePresetName("")
    }, [modalOption])

    return (
        <dialog className="main__modal" ref={modal}>
            <div className="main__modal__inner">
                <div className="main__modal__header">
                    <span>{modalTitle()}</span>
                    <div className="main__modal__header__buttons">
                        <button className={`${modalOption === "snippets" && "modalOptionActive"}`} onClick={() => { setSnippetTab(user.userId ? "mySnippets" : "featuredSnippets"); setModalOption("snippets") }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-stickies-fill" viewBox="0 0 16 16">
                                <path d="M0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5A1.5 1.5 0 0 0 0 1.5z" />
                                <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177V10.5z" />
                            </svg>
                        </button>
                        <button className={`${modalOption === "profile" && "modalOptionActive"}`} onClick={() => { setModalOption("profile") }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            </svg>
                        </button>
                        <button className="modalClose" onClick={() => { closeModal() }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="presets">
                    {modalContent()}
                    {modalOption === "snippets" &&
                        <>
                            <div className="presets__tabs">
                                <button className={`presets__tabs__btn ${snippetTab === "mySnippets" && "presets__tabs__btn--active"}`} onClick={() => { setSnippetTab("mySnippets") }}>My snippets</button>
                                <button className={`presets__tabs__btn ${snippetTab === "saveSnippet" && "presets__tabs__btn--active"}`} onClick={() => { setSnippetTab("saveSnippet") }}>Save snippet</button>
                            </div>
                            <div className="presets__tabs presets__tabs--saveTab">
                                <button className={`presets__tabs__btn ${snippetTab === "featuredSnippets" && "presets__tabs__btn--active"}`} onClick={() => { setSnippetTab("featuredSnippets") }}>Featured{`\n`}snippets</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </dialog>
    )
}
