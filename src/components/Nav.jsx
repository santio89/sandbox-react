import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setThemeReducer } from "../store/actions/theme.action";
import { setCodeHtml, setCodeCss, setCodeJs } from "../store/actions/code.action";
import { useState, useEffect, useRef } from "react";
import { setCodeAll } from "../store/actions/code.action";
import { savePreset, deletePreset, editPreset } from "../store/actions/presets.action";
import { setModal, setLoadSnippet } from "../store/actions/modal.action";
import { v4 as uuidv4 } from 'uuid';

export default function Nav({ rootTheme }) {
  const dispatch = useDispatch();
  const darkTheme = useSelector(state => state.theme.darkTheme);
  const html = useSelector(state => state.code.html)
  const css = useSelector(state => state.code.css)
  const js = useSelector(state => state.code.js)
  const modal = useRef()
  const [saveMode, setSaveMode] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editIt, setEditId] = useState(null)
  const [selectedId, setSelectedId] = useState(null);
  const [savePresetName, setSavePresetName] = useState("");
  const [saved, setSaved] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [newProject, setNewProject] = useState(false)
  const [editName, setEditName] = useState("")

  const presets = useSelector(state => state.preset.presets)

  const toggleDarkTheme = () => {
    dispatch(setThemeReducer(!darkTheme))
  }

  const startNewProject = () => {
    dispatch(setCodeHtml(""))
    dispatch(setCodeCss(""))
    dispatch(setCodeJs(""))
    dispatch(setLoadSnippet(true))
    setLoaded(true)
    setNewProject(false)
  }

  const toggleModal = () => {
    if (saveMode) {
      setSavePresetName("")
    }
    if (modal.current.hasAttribute("open")) {
      dispatch(setModal(false))
      modal.current.close()
      setSaveMode(false)
    } else {
      dispatch(setModal(true))
      setSelectedId(null)
      setDeleteId(null)
      setEditId(null)
      modal.current.showModal()
    }
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

  useEffect(() => {
    rootTheme.current.classList.toggle("light-theme", !darkTheme)
  }, [darkTheme])

  return (
    <header className='main__header'>
      <nav>
        <Link className="main__header__site" to={"/"}><h1>SandBox|HTML-CSS-JS</h1></Link>
      </nav>
      <div className="main__header__buttons">
        <div className="snippets-box">
          <button onClick={() => { toggleModal() }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="diamond-fill" viewBox="0 0 16 16">
              <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L4.047 3.339 8 7.293l3.954-3.954L9.049.435zm3.61 3.611L8.708 8l3.954 3.954 2.904-2.905c.58-.58.58-1.519 0-2.098l-2.904-2.905zm-.706 8.614L8 8.708l-3.954 3.954 2.905 2.904c.58.58 1.519.58 2.098 0l2.905-2.904zm-8.614-.706L7.292 8 3.339 4.046.435 6.951c-.58.58-.58 1.519 0 2.098l2.904 2.905z" />
            </svg>
          </button>
        </div>
        <div className='theme-mode'>
          {!darkTheme ?
            <button onClick={() => toggleDarkTheme()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="sun-fill" viewBox="0 0 16 16">
                <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
              </svg>
            </button> :
            <button onClick={() => toggleDarkTheme()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="moon-fill" viewBox="0 0 16 16">
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
              </svg>
            </button>
          }
        </div>
        <div className="new-project">
          {
            newProject ?
              <span className="new-project-confirm">
                <span>New snippet?</span>
                <span className="new-project-confirm-btns">
                  <button onClick={() => { startNewProject() }}>Yes</button>
                  <button onClick={() => { setNewProject(false) }}>No</button>
                </span>
              </span>
              :
              <button className="create-new" onClick={() => { setNewProject(true); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi-plus-lg" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                </svg>
              </button>
          }
        </div>

      </div>

      <dialog className="main__modal" ref={modal}>
        <div className="main__modal__inner">
          <div className="main__modal__header">
            {saveMode ? <p>Save snippet</p> : <p>Snippets</p>}
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
              <button onClick={() => { toggleModal() }}>
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
                  <input type="text" placeholder="SNIPPET NAME" value={savePresetName} onChange={e => { setSavePresetName(e.target.value) }} id="save-input" maxLength={30} onSubmit={() => { saveNewPreset(savePresetName, html, css, js) }} />
                  <button disabled={savePresetName.trim() === ""} onClick={() => { saveNewPreset(savePresetName, html, css, js) }} data-saved={saved ? 'saved!' : ''}>Save</button>
                </div>
              </div> :
              <div className="presets">
                {
                  presets.length > 0 ?
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
                              editIt === preset.id ?
                                (
                                  <span className="presets__option__confirm" onClick={e => e.stopPropagation()}>
                                    <span>Edit name?</span>
                                    <input type="text" value={editName} onChange={e => setEditName(e.target.value)} placeholder="NEW NAME" />
                                    <span className="presets__option__confirm__buttons">
                                      <span onClick={(e) => { e.stopPropagation(); editSelectedPreset(preset.id, editName) }}>Yes</span>
                                      <span onClick={(e) => { e.stopPropagation(); setEditId(null) }}>No</span>
                                    </span>
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
                  })):
                  <div className="presets__noSnippet">No snippets saved</div>
                }
              </div>
          }
        </div>
      </dialog>
    </header>
  )
}
