import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setThemeReducer } from "../store/actions/theme.action";
import Modal from "./Modal";
import { setCodeAll } from "../store/actions/code.action";
import { setModal, setLoadSnippet, setCreateNew } from "../store/actions/modal.action";
import { useNavigate } from "react-router-dom";

export default function Nav({ rootTheme }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkTheme = useSelector(state => state.theme.darkTheme);
  const modalActive = useSelector(state => state.modal.active)

  const [newProject, setNewProject] = useState(false)

  const startNewProject = () => {
    dispatch(setCodeAll("", "", ""))
    dispatch(setCreateNew(true))
    dispatch(setLoadSnippet(true))
    setNewProject(false)
    if (window.location.pathname !== "/") {
      navigate("/")
    }
  }

  const toggleDarkTheme = () => {
    dispatch(setThemeReducer(!darkTheme))
  }

  const openModal = () => {
    dispatch(setModal(true))
  }

  useEffect(() => {
    rootTheme.current.classList.toggle("light-theme", !darkTheme)
  }, [darkTheme])

  useEffect(() => {
    /* toggle modal on esc */
    const modalShortcut = (e) => {
      if (e.key.toUpperCase() === "ESCAPE") {
        e.preventDefault();
        dispatch(setModal(modalActive ? false : true))
      }
    }

    document.addEventListener("keydown", modalShortcut)

    return () => { document.removeEventListener("keydown", modalShortcut) }
  }, [modalActive])

  return (
    <header className='main__header'>
      <nav>
        <Link className="main__header__site" to={"/"}><h1>SandBox|HTML-CSS-JS</h1></Link>
      </nav>
      <div className="main__header__buttons">
        <div className="snippets-box">
          <button onClick={() => { openModal() }}>
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
        <Modal callbacks={{ setNewProject }} />
      </div>
    </header>
  )
}
