import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import './styles/css/prism.css'
import './styles/css/styles.css'
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStateAction } from "./store/actions/auth.action";
import { Toaster } from 'sonner'
import { setModal } from "./store/actions/modal.action";


function App() {
  const dispatch = useDispatch();
  const rootTheme = useRef();
  const modalActive = useSelector(state => state.modal.active)

  const Layout = () => (
    <>
      <Nav rootTheme={rootTheme} />
      <div className="mainContainer">
        <Outlet />
      </div>
    </>
  );

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

  useEffect(() => {
    let ignore = false;
    !ignore && dispatch(authStateAction())

    return () => { ignore = true };
  }, [])

  return (
    <>
      <div ref={rootTheme} className={`root-theme`}>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
