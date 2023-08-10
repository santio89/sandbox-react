import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setThemeReducer } from "../store/actions/theme.action";
import { useState, useEffect, useRef } from "react";
import { setCodeAll } from "../store/actions/code.action";
import { savePreset, deletePreset } from "../store/actions/presets.action";

export default function Nav({ rootTheme }) {
  const dispatch = useDispatch();
  const darkTheme = useSelector(state => state.theme.darkTheme);
  const html = useSelector(state => state.code.html)
  const css = useSelector(state => state.code.css)
  const js = useSelector(state => state.code.js)
  const firstRender = useRef(true)
  const modal = useRef()
  const [saveMode, setSaveMode] = useState(false);
  const [savePresetName, setSavePresetName] = useState("")

  const presets = useSelector(state => state.preset.presets)

  const toggleDarkTheme = () => {
    dispatch(setThemeReducer(!darkTheme))
  }

  const toggleModal = () => {
    if (saveMode) {
      setSavePresetName("")
    }
    modal.current.hasAttribute("open") ? modal.current.close() : modal.current.showModal()
  }

  const toggleSave = () => {
    if (saveMode) {
      setSavePresetName("")
    }
    setSaveMode(saveMode => !saveMode)
  }

  const setPreset = (html, css, js) => {
    dispatch(setCodeAll(html, css, js))
  }

  const saveNewPreset = (name, html, css, js) => {
    name = name.trim()
    if (name === "") {
      return
    }
    dispatch(savePreset(presets, { name, html, css, js }))
  }

  useEffect(() => {
    if (firstRender.current === true) {
      firstRender.current = false;
      return
    } else {
      rootTheme.current.classList.toggle("dark-theme", !darkTheme);
    }
  }, [darkTheme])

  return (
    <header className='main__header'>
      <nav>
        <Link to={"/"}>SandBox|HTML-CSS-JS</Link>
      </nav>
      <div className="main__header__buttons">
        <button onClick={() => { toggleModal() }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="diamond-fill" viewBox="0 0 16 16">
            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L4.047 3.339 8 7.293l3.954-3.954L9.049.435zm3.61 3.611L8.708 8l3.954 3.954 2.904-2.905c.58-.58.58-1.519 0-2.098l-2.904-2.905zm-.706 8.614L8 8.708l-3.954 3.954 2.905 2.904c.58.58 1.519.58 2.098 0l2.905-2.904zm-8.614-.706L7.292 8 3.339 4.046.435 6.951c-.58.58-.58 1.519 0 2.098l2.904 2.905z" />
          </svg>
        </button>
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
      </div>

      <dialog className="main__modal" ref={modal}>
        <div className="main__modal__inner">
          <div className="main__modal__header">
            {saveMode ? <p>Save Preset</p> : <p>Choose Preset</p>}
            <div className="main__modal__header__buttons">
              <button onClick={() => { toggleSave() }}>
                {
                  saveMode ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-caret-left-fill" viewBox="0 0 16 16">
                      <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-caret-right-fill" viewBox="0 0 16 16">
                      <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg>
                }

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
                  <input type="text" placeholder="PRESET NAME" value={savePresetName} onChange={e => { setSavePresetName(e.target.value) }} id="save-input" maxLength={25} />
                  <button disabled={savePresetName.trim() === ""} onClick={() => { saveNewPreset(savePresetName, html, css, js) }}>Save</button>
                </div>
              </div> :
              <div className="presets">
                {
                  presets?.map(preset => {
                    return (<button className="presets__option" key={preset.id} onClick={() => { setPreset(preset.html, preset.css, preset.js) }}>
                      <span>{preset.name}</span>
                    </button>)
                  })
                }
              </div>
          }
        </div>
      </dialog>
    </header>
  )
}
